import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AdminGuard } from '@/components/AdminGuard';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Search, BarChart3, Sparkles, Layers } from 'lucide-react';
import { Project } from '@/data/mockProjects';

type AdminProject = Project & {
  createdAt?: Timestamp | Date | null;
  updatedAt?: Timestamp | Date | null;
};

const AdminProjects = () => {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [toolFilter, setToolFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      })) as AdminProject[];
      
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive',
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteDoc(doc(db, 'projects', id));
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      });
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'projects', id), {
        published: !currentStatus,
        updatedAt: new Date(),
      });
      toast({
        title: 'Success',
        description: `Project ${!currentStatus ? 'published' : 'unpublished'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project',
        variant: 'destructive',
      });
    }
  };

  const publishedCount = useMemo(
    () => projects.filter((project) => project.published).length,
    [projects]
  );

  const draftCount = useMemo(
    () => projects.filter((project) => !project.published).length,
    [projects]
  );

  const toolOptions = useMemo(() => {
    const tools = new Set<string>();
    projects.forEach((project) => {
      project.tools.forEach((tool) => tools.add(tool));
    });
    return Array.from(tools).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const liveShare = useMemo(() => {
    if (!projects.length) return 0;
    return Math.round((publishedCount / projects.length) * 100);
  }, [projects.length, publishedCount]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'published'
          ? project.published
          : !project.published;

      const matchesTool =
        toolFilter === 'all'
          ? true
          : project.tools.includes(toolFilter);

      const matchesSearch = `${project.title} ${project.summary}`
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesStatus && matchesTool && matchesSearch;
    });
  }, [projects, statusFilter, toolFilter, search]);

  const formatDate = (
    timestamp?: Timestamp | Date | { toDate?: () => Date } | null
  ) => {
    if (!timestamp) return '-';

    const toDate = () => {
      if (timestamp instanceof Timestamp) {
        return timestamp.toDate();
      }
      if (timestamp instanceof Date) {
        return timestamp;
      }
      if (
        typeof timestamp === 'object' &&
        timestamp !== null &&
        typeof timestamp.toDate === 'function'
      ) {
        return timestamp.toDate();
      }
      return null;
    };

    const date = toDate();
    if (!date) return '-';

    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit uppercase tracking-wide">Portfolio Manager</Badge>
              <h1 className="text-3xl font-bold">Projects Command Center</h1>
              <p className="text-muted-foreground max-w-2xl">
                Track performance, publish new case studies, and keep Rachael&apos;s portfolio always investor-ready.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link to="/">
                  <Sparkles className="w-4 h-4 mr-2" />
                  View Public Site
                </Link>
              </Button>
              <Button asChild>
                <Link to="/admin/projects/new">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-semibold mt-2">{projects.length}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Keep your portfolio fresh with impactful stories.
              </p>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-semibold mt-2">{publishedCount}</p>
                </div>
                <div className="rounded-full bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Visible on the live site right now.
              </p>
            </Card>
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Live coverage</p>
                  <p className="text-2xl font-semibold mt-2">{liveShare}%</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Draft queue: {draftCount} awaiting polish.
                  </p>
                </div>
                <div className="rounded-full bg-amber-100 p-3 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Aim for 100% to keep momentum with prospects.
              </p>
            </Card>
          </div>

          <Card className="p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search projects by title or summary"
                  className="border-0 shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-background p-1">
                {(
                  [
                    { label: 'All', value: 'all' },
                    { label: 'Published', value: 'published' },
                    { label: 'Drafts', value: 'draft' },
                  ] as const
                ).map((filter) => (
                  <Button
                    key={filter.value}
                    variant={statusFilter === filter.value ? 'default' : 'ghost'}
                    size="sm"
                    className={statusFilter === filter.value ? 'shadow-sm' : 'hover:bg-transparent'}
                    onClick={() => setStatusFilter(filter.value)}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {toolOptions.length ? (
            <Card className="p-4 border border-border/60 bg-muted/10">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium">Filter by tool</p>
              </div>
              <ScrollArea className="w-full">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setToolFilter('all')}
                    className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                      toolFilter === 'all'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    All tools
                  </button>
                  {toolOptions.map((tool) => {
                    const isActive = toolFilter === tool;
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => setToolFilter(tool)}
                        className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </Card>
          ) : null}

          {projects.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No projects yet</p>
              <Button asChild>
                <Link to="/admin/projects/new">Create your first project</Link>
              </Button>
            </Card>
          ) : filteredProjects.length === 0 ? (
            <Card className="p-12 text-center space-y-3">
              <h3 className="text-lg font-semibold">No projects found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search keywords.
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group p-6 transition-shadow hover:shadow-lg">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
                    {project.coverImage && (
                      <div className="w-full shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted/40 shadow-sm lg:w-40">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                            <Badge variant={project.published ? 'default' : 'secondary'}>
                              {project.published ? 'Published' : 'Draft'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.summary}
                          </p>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <p>Created {formatDate(project.createdAt)}</p>
                          <p>Updated {formatDate(project.updatedAt)}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <Badge key={tool} variant="outline" className="bg-background">
                            {tool}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-xs text-emerald-600/80 dark:text-emerald-300/80 border border-emerald-200/70 dark:border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-500/5 rounded-lg px-3 py-2 leading-relaxed">
                        <span className="font-medium uppercase tracking-wide mr-2 text-[0.65rem]">Impact</span>
                        <span className="line-clamp-2 text-muted-foreground">{project.impact}</span>
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2 self-stretch lg:flex-col">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start gap-2 border border-border/60 hover:bg-primary/10"
                        onClick={() => togglePublished(project.id, project.published)}
                      >
                        {project.published ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Publish
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start gap-2 border border-border/60 hover:bg-primary/10"
                        asChild
                      >
                        <Link to={`/admin/projects/${project.id}/edit`}>
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start gap-2 border border-border/60 text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminProjects;

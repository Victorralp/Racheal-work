import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/data/mockProjects";
import { Loader2, Filter, Search, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toolFilter, setToolFilter] = useState("all");

  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const projectsData = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        })) as Project[];

        setProjects(projectsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const toolOptions = useMemo(() => {
    const toolkit = new Set<string>();
    projects.forEach((project) => {
      project.tools.forEach((tool) => toolkit.add(tool));
    });
    return Array.from(toolkit).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const queryText = search.toLowerCase().trim();

    return projects.filter((project) => {
      const matchesSearch =
        !queryText ||
        `${project.title} ${project.summary}`
          .toLowerCase()
          .includes(queryText);

      const matchesTool =
        toolFilter === "all" || project.tools.includes(toolFilter);

      return matchesSearch && matchesTool;
    });
  }, [projects, search, toolFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="mb-12 space-y-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <Badge variant="secondary" className="w-fit gap-2">
                <Sparkles className="w-3 h-3" />
                Real impact case files
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Projects that turn insight into revenue
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Dive into dashboards, automation, and growth experiments that moved metrics for leadership teams across finance, operations, and growth.
              </p>
            </div>
          </div>

          <Card className="border border-border/60 bg-muted/20">
            <div className="grid gap-6 p-6 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Live case studies
                </p>
                <p className="text-2xl font-semibold">{projects.length}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Tool coverage
                </p>
                <p className="text-2xl font-semibold">{toolOptions.length}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Average ROI uplift
                </p>
                <p className="text-2xl font-semibold text-primary">+23%</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="border border-border/60 mb-12">
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or summary"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="md:w-72"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Filter by primary tool</span>
            </div>
          </div>

          {toolOptions.length ? (
            <div className="border-t border-border/60 bg-muted/20">
              <ScrollArea className="w-full">
                <div className="flex gap-2 px-6 py-3">
                  <button
                    type="button"
                    onClick={() => setToolFilter("all")}
                    className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wide transition-colors ${
                      toolFilter === "all"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    All
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
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          ) : null}
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <Card className="p-12 text-center space-y-3 border border-dashed border-border">
            <h3 className="text-lg font-semibold">No projects match your filters</h3>
            <p className="text-sm text-muted-foreground">
              Try clearing the search or selecting a different tool.
            </p>
          </Card>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl border border-border/60 bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  summary={project.summary}
                  tools={project.tools}
                  coverImage={project.coverImage}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Projects;


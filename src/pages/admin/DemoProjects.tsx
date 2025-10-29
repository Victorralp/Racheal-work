import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { useDemoProjects, DEMO_PROJECTS_QUERY_KEY } from "@/hooks/use-demo-projects";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Plus,
  ArrowUpRight,
  Edit,
  Trash2,
  BarChart3,
  FileText,
} from "lucide-react";

const AdminDemoProjects = () => {
  const { data: demoProjects, isLoading } = useDemoProjects();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this interactive demo scenario?",
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(collection(db, "demoProjects"), id));
      await queryClient.invalidateQueries({
        queryKey: DEMO_PROJECTS_QUERY_KEY,
      });
      toast({
        title: "Deleted",
        description: "Interactive demo scenario removed successfully.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete the scenario.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Interactive Demo Library</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">
              Curate rich, data-backed walkthroughs for prospects. These entries
              appear on the Interactive Demo page.
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/demo-projects/new" className="gap-2">
              <Plus className="w-4 h-4" />
              New Scenario
            </Link>
          </Button>
        </div>

        <Card className="mb-6 border-dashed border-primary/30 bg-primary/5">
          <div className="flex flex-wrap gap-4 items-center justify-between p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Best Practices</h2>
                <p className="text-sm text-muted-foreground">
                  Include 3-5 metrics, highlight attention-worthy data points,
                  and close with clear insights and next steps.
                </p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link to="/interactive" className="gap-2" target="_blank">
                View Demo Page
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : !demoProjects || demoProjects.length === 0 ? (
          <Card className="p-12 text-center space-y-4">
            <FileText className="w-10 h-10 mx-auto text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">No demo scenarios yet</h3>
              <p className="text-sm text-muted-foreground">
                Add your first interactive walkthrough to impress prospective
                clients with a data-rich story.
              </p>
            </div>
            <Button asChild>
              <Link to="/admin/demo-projects/new" className="gap-2">
                <Plus className="w-4 h-4" />
                Create Scenario
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {demoProjects.map((project) => (
              <Card
                key={project.id}
                className="p-6 transition hover:shadow-lg border-border"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                  {project.coverImage ? (
                    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border/60 bg-muted/40 shadow-sm">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.summary}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {project.metrics.length} metrics · {project.insights.length} insights
                      </Badge>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {project.metrics.slice(0, 3).map((metric, index) => (
                        <Card key={index} className="p-4 bg-muted/40 border-border/60">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            {metric.label}
                          </p>
                          <p className="text-lg font-semibold">{metric.value}</p>
                          {metric.change ? (
                            <p className="text-xs text-primary mt-1">
                              {metric.change}
                            </p>
                          ) : null}
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2 self-stretch lg:flex-col">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Link to={`/admin/demo-projects/${project.id}/edit`}>
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive"
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
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminDemoProjects;

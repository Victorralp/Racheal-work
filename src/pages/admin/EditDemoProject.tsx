import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  DemoProjectForm,
  DemoProjectFormData,
} from "@/components/DemoProjectForm";
import { DEMO_PROJECTS_QUERY_KEY } from "@/hooks/use-demo-projects";

const EditDemoProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [initialData, setInitialData] = useState<DemoProjectFormData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemoProject = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "demoProjects", id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          toast({
            title: "Not found",
            description: "This demo scenario no longer exists.",
            variant: "destructive",
          });
          navigate("/admin/demo-projects");
          return;
        }

        const data = snapshot.data();

        setInitialData({
          title: data.title || "",
          summary: data.summary || "",
          description: data.description || "",
          coverImage: data.coverImage || "",
          metrics: Array.isArray(data.metrics) ? data.metrics : [],
          dataPoints: Array.isArray(data.dataPoints) ? data.dataPoints : [],
          insights: Array.isArray(data.insights) ? data.insights : [],
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load the demo scenario.";
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
        navigate("/admin/demo-projects");
      } finally {
        setLoading(false);
      }
    };

    fetchDemoProject();
  }, [id, navigate, toast]);

  const handleSubmit = async (data: DemoProjectFormData) => {
    if (!id) return;
    await updateDoc(doc(db, "demoProjects", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });

    await queryClient.invalidateQueries({
      queryKey: DEMO_PROJECTS_QUERY_KEY,
    });

    toast({
      title: "Scenario updated",
      description: "Interactive demo scenario saved successfully.",
    });

    navigate("/admin/demo-projects");
  };

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="max-w-4xl space-y-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/demo-projects" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to library
            </Link>
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Edit Demo Scenario</h1>
            <p className="text-muted-foreground mt-1">
              Update the data narrative and supporting visuals.
            </p>
          </div>

          <Card className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : initialData ? (
              <DemoProjectForm
                submitLabel="Save Changes"
                initialData={initialData}
                onSubmit={handleSubmit}
              />
            ) : null}
          </Card>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default EditDemoProject;

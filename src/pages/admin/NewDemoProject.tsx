import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  DemoProjectForm,
  DemoProjectFormData,
} from "@/components/DemoProjectForm";
import { DEMO_PROJECTS_QUERY_KEY } from "@/hooks/use-demo-projects";

const NewDemoProject = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSubmit = async (data: DemoProjectFormData) => {
    await addDoc(collection(db, "demoProjects"), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await queryClient.invalidateQueries({
      queryKey: DEMO_PROJECTS_QUERY_KEY,
    });

    toast({
      title: "Scenario created",
      description: "Your interactive demo scenario is live.",
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
            <h1 className="text-3xl font-bold">Create Demo Scenario</h1>
            <p className="text-muted-foreground mt-1">
              Build a data-rich walkthrough to showcase your analysis skills.
            </p>
          </div>

          <Card className="p-6">
            <DemoProjectForm
              submitLabel="Create Scenario"
              onSubmit={handleSubmit}
            />
          </Card>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default NewDemoProject;


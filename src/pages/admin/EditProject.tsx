import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AdminGuard } from '@/components/AdminGuard';
import { AdminLayout } from '@/components/AdminLayout';
import { ProjectForm, ProjectFormData } from '@/components/ProjectForm';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<ProjectFormData | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setInitialData({
            title: data.title,
            summary: data.summary,
            problem: data.problem,
            solution: data.solution,
            impact: data.impact,
            tools: data.tools,
            coverImage: data.coverImage,
            images: data.images || [],
            published: data.published,
          });
        } else {
          toast({
            title: 'Error',
            description: 'Project not found',
            variant: 'destructive',
          });
          navigate('/admin/projects');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load project',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate, toast]);

  const handleSubmit = async (data: ProjectFormData) => {
    if (!id) return;

    try {
      await updateDoc(doc(db, 'projects', id), {
        ...data,
        updatedAt: serverTimestamp(),
      });

      toast({
        title: 'Success',
        description: 'Project updated successfully',
      });

      navigate('/admin/projects');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update project',
        variant: 'destructive',
      });
      throw error;
    }
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

  if (!initialData) {
    return null;
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="max-w-3xl">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-4"
          >
            <Link to="/admin/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground mt-1">
              Update your project details
            </p>
          </div>

          <Card className="p-6">
            <ProjectForm
              initialData={initialData}
              onSubmit={handleSubmit}
              submitLabel="Update Project"
            />
          </Card>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default EditProject;

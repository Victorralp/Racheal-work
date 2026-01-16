import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AdminGuard } from '@/components/AdminGuard';
import { AdminLayout } from '@/components/AdminLayout';
import { ProjectForm, ProjectFormData } from '@/components/ProjectForm';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      await addDoc(collection(db, 'projects'), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: 'Success',
        description: 'Project created successfully',
      });

      navigate('/admin/projects');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create project',
        variant: 'destructive',
      });
      throw error;
    }
  };

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
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-muted-foreground mt-1">
              Add a new project to your portfolio
            </p>
          </div>

          <Card className="p-6">
            <ProjectForm
              onSubmit={handleSubmit}
              submitLabel="Create Project"
            />
          </Card>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default NewProject;

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/data/mockProjects";
import { ArrowLeft, Loader2 } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({
            id: docSnap.id,
            ...docSnap.data()
          } as Project);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-20">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project || (!project.published && !isAdmin)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              This project doesn't exist or is not published yet.
            </p>
            <Link to="/projects">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <Link to="/projects" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </Link>

        {/* Cover Image */}
        <div className="aspect-video bg-secondary rounded-xl overflow-hidden mb-8">
          <img 
            src={project.coverImage} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and Tools */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <Badge key={tool} variant="secondary">
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8">
          <p className="text-xl text-muted-foreground">
            {project.summary}
          </p>
        </div>

        {/* Problem, Solution, Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-destructive">Problem</h3>
            <p className="text-sm text-muted-foreground">
              {project.problem}
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-primary">What I Did</h3>
            <p className="text-sm text-muted-foreground">
              {project.solution}
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3 text-accent">Impact</h3>
            <p className="text-sm text-muted-foreground">
              {project.impact}
            </p>
          </div>
        </div>

        {/* Gallery */}
        {project.images.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.map((image, index) => (
                <div key={index} className="aspect-video bg-secondary rounded-xl overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;

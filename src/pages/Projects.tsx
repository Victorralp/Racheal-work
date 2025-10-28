import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/data/mockProjects";
import { Loader2 } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'projects'),
      where('published', '==', true),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching projects:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Each project demonstrates data cleaning, analysis, visualization, 
            and business impact. All results are real.
          </p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                summary={project.summary}
                tools={project.tools}
                coverImage={project.coverImage}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Projects;

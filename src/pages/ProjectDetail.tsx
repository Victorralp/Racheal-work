import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

        <div className="space-y-10">
          {/* Cover & Overview */}
          <Card className="overflow-hidden border border-border/60">
            <div className="aspect-video bg-secondary">
              <img
                src={project.coverImage}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-6 p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="uppercase tracking-wide">
                    Case study
                  </Badge>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground">{project.summary}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Business impact
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {project.impact}
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Core challenge
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {project.problem}
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Role
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Lead Data Analyst & BI Consultant
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Narrative */}
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Card className="space-y-6 border border-border/60 p-6">
              <h2 className="text-2xl font-semibold">How I solved it</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.solution}
              </p>

              <Accordion type="multiple" defaultValue={["process", "stakeholders"]}>
                <AccordionItem value="process" className="border-border/60">
                  <AccordionTrigger className="text-left text-base font-medium">
                    Process breakdown
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {project.solution}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="stakeholders" className="border-border/60">
                  <AccordionTrigger className="text-left text-base font-medium">
                    Stakeholder alignment
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    Coordinated with finance, operations, and growth teams to prioritise the insights with the fastest ROI, ensuring executive buy-in at each milestone.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <Card className="border border-border/60 bg-muted/20 p-6 space-y-5">
              <h3 className="text-lg font-semibold">Next steps for your team</h3>
              <p className="text-sm text-muted-foreground">
                Curious what this would look like for your data stack? I can tailor the same playbook to your industry, metrics, and decision cadence.
              </p>
              <Link to="/contact">
                <Button className="w-full">Book a working session</Button>
              </Link>
            </Card>
          </div>

          {/* Problem / Solution / Impact Blocks */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border border-border/60 bg-destructive/5 p-6">
              <h3 className="text-lg font-semibold text-destructive mb-2">
                The bottleneck
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </Card>
            <Card className="border border-border/60 bg-primary/5 p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                What I delivered
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </Card>
            <Card className="border border-border/60 bg-emerald-50 dark:bg-emerald-500/10 p-6">
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-300 mb-2">
                Measurable outcome
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.impact}
              </p>
            </Card>
          </div>

          {/* Gallery */}
          {project.images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Screenshots</h2>
                <Badge variant="outline">{project.images.length} assets</Badge>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-video overflow-hidden rounded-2xl border border-border/60 bg-secondary"
                  >
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { SkillsCarousel } from "@/components/ui/logo-carousel";
import { TestimonialSection } from "@/components/ui/testimonial-cards";
import { mockProjects, Project } from "@/data/mockProjects";
import { db } from "@/lib/firebase";
import { useSiteProfile } from "@/hooks/use-site-profile";
import {
  ArrowRight,
  BarChart3,
  FileSpreadsheet,
  Database,
  Mail,
} from "lucide-react";

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { data: profile } = useSiteProfile();
  const headshotUrl = profile?.headshotUrl?.trim() || "";

  useEffect(() => {
    const publishedProjectsQuery = query(
      collection(db, "projects"),
      where("published", "==", true),
    );

    const unsubscribe = onSnapshot(
      publishedProjectsQuery,
      (snapshot) => {
        const projectsData = snapshot.docs
          .map((docSnapshot) => ({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          }))
          .sort((a, b) => {
            const getCreatedTime = (value: unknown) => {
              if (value instanceof Timestamp) return value.toMillis();
              if (value instanceof Date) return value.getTime();
              if (
                value &&
                typeof value === "object" &&
                "toDate" in value &&
                typeof value.toDate === "function"
              ) {
                return value.toDate().getTime();
              }
              return 0;
            };

            return getCreatedTime(b.createdAt) - getCreatedTime(a.createdAt);
          }) as Project[];

        setProjects(projectsData);
      },
      (error) => {
        console.error("Error fetching featured projects:", error);
      },
    );

    return () => unsubscribe();
  }, []);

  const featuredProjects = useMemo(() => {
    const publishedProjects = projects.length
      ? projects
      : mockProjects.filter((p) => p.published);

    return publishedProjects.slice(0, 5);
  }, [projects]);

  const projectCards: CardStackItem[] = useMemo(
    () =>
      featuredProjects.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.summary,
        imageSrc: p.coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        href: `/projects/${p.id}`,
        tag: p.tools[0] || "Analytics",
      })),
    [featuredProjects],
  );

  return (
    <BackgroundPaths>
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              {/* Profile Image */}
              {headshotUrl && (
                <div className="mb-8 flex justify-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#d4a853]/40 shadow-lg">
                    <img
                      src={headshotUrl}
                      alt="Rachael Olarinoye"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Hi, I'm{" "}
                <span className="text-[#d4a853]">Rachael Olarinoye</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-4">
                Data Analyst
              </p>

              <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                I help teams and founders transform data into clear, actionable
                business decisions. Building dashboards, reporting systems, and
                workflows that drive results.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-[#d4a853] hover:bg-[#c49943] text-white" asChild>
                  <Link to="/projects" className="flex items-center gap-2">
                    View Projects
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853]/10" asChild>
                  <Link to="/contact" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="container mx-auto px-4 py-20 bg-gray-50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                What I Do
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Helping businesses make smarter decisions through data
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 bg-white border-gray-200 hover:border-[#d4a853] hover:shadow-lg transition-all">
                  <BarChart3 className="w-10 h-10 text-[#d4a853] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Data Analytics
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transform raw data into actionable insights with clear
                    analysis and visualizations.
                  </p>
                </Card>

                <Card className="p-6 bg-white border-gray-200 hover:border-[#d4a853] hover:shadow-lg transition-all">
                  <FileSpreadsheet className="w-10 h-10 text-[#d4a853] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Dashboard Building
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Create executive-ready dashboards that provide visibility into
                    performance and trends.
                  </p>
                </Card>

                <Card className="p-6 bg-white border-gray-200 hover:border-[#d4a853] hover:shadow-lg transition-all">
                  <Database className="w-10 h-10 text-[#d4a853] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Reporting Automation
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Automate recurring reports and data updates to save time and
                    improve accuracy.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Skills/Tools Section */}
          <section className="container mx-auto px-4">
            <SkillsCarousel />
          </section>

          {/* Projects Section */}
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Selected Projects
                  </h2>
                  <p className="text-gray-600">
                    Some of my recent data analytics work
                  </p>
                </div>
                <Button variant="outline" className="border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853]/10" asChild>
                  <Link to="/projects" className="flex items-center gap-2">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <CardStack
                items={projectCards}
                cardWidth={480}
                cardHeight={300}
                autoAdvance
                intervalMs={3500}
                pauseOnHover
                showDots
              />
            </div>
          </section>

          {/* Testimonials Section */}
          <TestimonialSection />
        </main>

        <Footer />
      </div>
    </BackgroundPaths>
  );
};

export default Home;

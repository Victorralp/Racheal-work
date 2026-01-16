import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/data/mockProjects";
import { Loader2, Filter, Search, Sparkles, TrendingUp, FolderKanban, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    <BackgroundPaths>
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 container mx-auto px-4 py-20">
          {/* Hero Section */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 gap-2 bg-[#d4a853]/10 text-[#b8923f] border-[#d4a853]/30">
              <Sparkles className="w-3 h-3" />
              Portfolio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              My <span className="text-[#d4a853]">Projects</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore dashboards, automation workflows, and analytics solutions
              that delivered real business impact.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 border border-gray-200 bg-white hover:border-[#d4a853] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#d4a853]/10">
                  <FolderKanban className="w-6 h-6 text-[#d4a853]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
                  <p className="text-sm text-gray-500">Case Studies</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border border-gray-200 bg-white hover:border-[#d4a853] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#d4a853]/10">
                  <Wrench className="w-6 h-6 text-[#d4a853]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">{toolOptions.length}</p>
                  <p className="text-sm text-gray-500">Tools Used</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 border border-gray-200 bg-white hover:border-[#d4a853] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#d4a853]/10">
                  <TrendingUp className="w-6 h-6 text-[#d4a853]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#d4a853]">+23%</p>
                  <p className="text-sm text-gray-500">Avg. ROI Impact</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border border-gray-200 mb-12 overflow-hidden">
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between bg-white">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="pl-10 border-gray-200 focus:border-[#d4a853] focus:ring-[#d4a853]"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Filter className="w-4 h-4" />
                  <span>Filter by tool:</span>
                </div>
              </div>

              {toolOptions.length ? (
                <div className="border-t border-gray-200 bg-gray-50">
                  <ScrollArea className="w-full">
                    <div className="flex gap-2 px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setToolFilter("all")}
                        className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-all ${toolFilter === "all"
                          ? "border-[#d4a853] bg-[#d4a853] text-white shadow-md"
                          : "border-gray-300 text-gray-600 hover:border-[#d4a853] hover:text-[#d4a853]"
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
                            className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wide transition-all whitespace-nowrap ${isActive
                              ? "border-[#d4a853] bg-[#d4a853] text-white shadow-md"
                              : "border-gray-300 text-gray-600 hover:border-[#d4a853] hover:text-[#d4a853]"
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
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#d4a853]" />
              <p className="text-gray-500">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card className="p-16 text-center space-y-4 border border-dashed border-gray-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">No projects found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search or selecting a different tool filter.
              </p>
              <button
                onClick={() => { setSearch(""); setToolFilter("all"); }}
                className="text-[#d4a853] font-medium hover:underline"
              >
                Clear all filters
              </button>
            </Card>
          ) : (
            <motion.div
              className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#d4a853]"
                >
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    summary={project.summary}
                    tools={project.tools}
                    coverImage={project.coverImage}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>

        <Footer />
      </div>
    </BackgroundPaths>
  );
};

export default Projects;

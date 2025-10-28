import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { KPIBlock } from "@/components/KPIBlock";
import { ProjectCard } from "@/components/ProjectCard";
import { mockProjects } from "@/data/mockProjects";
import { 
  ArrowRight, 
  Database, 
  BarChart3, 
  FileSpreadsheet, 
  Code2, 
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Award,
  Trophy,
  Star,
  Briefcase
} from "lucide-react";

const Home = () => {
  const featuredProjects = mockProjects.filter(p => p.published).slice(0, 3);

  const skills = [
    { name: "Power BI", level: "Expert" },
    { name: "SQL", level: "Expert" },
    { name: "Python", level: "Advanced" },
    { name: "Excel", level: "Expert" },
    { name: "Tableau", level: "Advanced" },
    { name: "Data Cleaning", level: "Expert" },
  ];

  const accomplishments = [
    {
      icon: Trophy,
      title: "Top 5% Data Analyst",
      description: "Recognized for exceptional performance in delivering high-impact analytics projects",
      highlight: "Elite Performer"
    },
    {
      icon: Award,
      title: "$700K+ Capital Freed",
      description: "Optimized inventory management system, unlocking significant working capital",
      highlight: "Major Win"
    },
    {
      icon: Star,
      title: "23% ROI Increase",
      description: "Transformed marketing analytics, driving measurable profit improvement",
      highlight: "Revenue Driver"
    },
    {
      icon: Briefcase,
      title: "5+ Years Experience",
      description: "Proven track record across multiple industries and business functions",
      highlight: "Seasoned Pro"
    },
    {
      icon: Database,
      title: "150K+ Rows Processed",
      description: "Expert in handling large-scale data cleaning and transformation projects",
      highlight: "Scale Master"
    },
    {
      icon: TrendingUp,
      title: "10+ Dashboards Built",
      description: "Created executive-level dashboards that drive daily business decisions",
      highlight: "Dashboard Expert"
    }
  ];

  const capabilities = [
    {
      icon: Database,
      title: "Data Engineering",
      description: "Build pipelines that collect and organize data automatically—no more manual exports eating up your team's time"
    },
    {
      icon: BarChart3,
      title: "Executive Dashboards",
      description: "Real-time dashboards that show you exactly where money is being made (or lost) so you can act fast"
    },
    {
      icon: FileSpreadsheet,
      title: "Data Cleaning & Quality",
      description: "Fix the mess in your data so you can trust your numbers and make confident decisions"
    },
    {
      icon: Code2,
      title: "SQL & Python Automation",
      description: "Automate the boring stuff. Save hours every week and redirect that time to high-value work"
    },
    {
      icon: TrendingUp,
      title: "Business Intelligence",
      description: "Get clear recommendations backed by data—not guesswork. Know exactly what to do next to increase revenue"
    },
    {
      icon: Sparkles,
      title: "Process Optimization",
      description: "Cut operational waste and streamline workflows. More efficiency = more profit"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              Data Analyst • Business Intelligence • Automation
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              I turn raw data into decisions.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              I'm <span className="text-foreground font-semibold">Rachael Olarinoye</span>, and I help businesses make more money and waste less time. 
              I build executive dashboards, automate workflows, and turn data chaos into strategic decisions that actually impact the bottom line.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/interactive">
                <Button size="lg" className="gap-2">
                  See Interactive Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">
                  Work With Me
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="container mx-auto px-4 py-20 bg-secondary/30 -mx-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Proven Business Impact</h2>
              <p className="text-muted-foreground">Real results from real projects</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPIBlock 
                value="+23%" 
                label="Marketing ROI improvement"
              />
              <KPIBlock 
                value="10+ hrs" 
                label="Manual reporting time saved / month"
              />
              <KPIBlock 
                value="150k+ rows" 
                label="Cleaned and validated"
              />
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">How I Make You Money</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From messy data to clear profit opportunities—I handle the full stack
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((capability, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <capability.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{capability.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Accomplishments */}
        <section className="container mx-auto px-4 py-20 bg-secondary/30 -mx-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Accomplishments & Recognition</h2>
              <p className="text-muted-foreground">
                Proven results that speak for themselves
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accomplishments.map((accomplishment, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-primary/10 rounded-full mb-4">
                      <accomplishment.icon className="w-8 h-8 text-primary" />
                    </div>
                    <Badge className="mb-3" variant="secondary">
                      {accomplishment.highlight}
                    </Badge>
                    <h3 className="font-bold text-lg mb-2">{accomplishment.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {accomplishment.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Technical Expertise</h2>
              <p className="text-muted-foreground">
                Tools I use daily to deliver results
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <Card key={index} className="p-4 text-center hover:border-primary transition-colors">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">{skill.name}</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {skill.level}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How I Work */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">My Process</h2>
              <p className="text-muted-foreground">
                Fast, focused, and always ROI-driven
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">01</div>
                <h3 className="font-semibold mb-2">Understand the Money</h3>
                <p className="text-sm text-muted-foreground">
                  Where's the revenue opportunity or cost leak?
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">02</div>
                <h3 className="font-semibold mb-2">Fix the Data</h3>
                <p className="text-sm text-muted-foreground">
                  Clean it up so you can trust it
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">03</div>
                <h3 className="font-semibold mb-2">Find the Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Uncover what's actually driving results
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">04</div>
                <h3 className="font-semibold mb-2">Show You the Money</h3>
                <p className="text-sm text-muted-foreground">
                  Clear actions with projected financial impact
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section className="container mx-auto px-4 py-20 bg-secondary/30 -mx-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Selected Work</h2>
                <p className="text-muted-foreground">
                  Real projects with measurable business impact
                </p>
              </div>
              <Link to="/projects">
                <Button variant="outline" className="gap-2">
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              Your competitors are using their data better than you.
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's fix that. I turn data into revenue, cut operational waste, and give you the insights that actually move your business forward. 
              Fast response guaranteed—because time is money.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gap-2">
                Let's Talk Numbers
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

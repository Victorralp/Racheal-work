import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { KPIBlock } from "@/components/KPIBlock";
import { ProjectCard } from "@/components/ProjectCard";
import { AnalyticsProjectCard } from "@/components/AnalyticsProjectCard";
// import { LazyDataSphere } from "@/components/LazyDataSphere"; // Disabled due to React version conflicts
import { AnimatedChart } from "@/components/AnimatedChart";
// import { div } from "@/components/div"; // Not used
import { mockProjects } from "@/data/mockProjects";
import { useSiteProfile } from "@/hooks/use-site-profile";
import { useGSAPScroll } from "@/hooks/use-gsap-scroll";
import {
  useHomeSettings,
  getDefaultHomeSettings,
} from "@/hooks/use-home-settings";
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
  Briefcase,
  type LucideIcon,
} from "lucide-react";
// Temporarily disabled Framer Motion to fix React context issues
// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

const ICON_LIBRARY: Record<string, LucideIcon> = {
  Trophy,
  Award,
  Star,
  Briefcase,
  Database,
  BarChart3,
  FileSpreadsheet,
  Code2,
  TrendingUp,
  Sparkles,
};

const resolveIcon = (name: string): LucideIcon =>
  ICON_LIBRARY[name as keyof typeof ICON_LIBRARY] ?? Sparkles;

const isExternalLink = (href: string) => /^https?:\/\//i.test(href);

const Home = () => {
  const featuredProjects = mockProjects.filter((p) => p.published).slice(0, 3);
  const { data: profile, isLoading: profileLoading, error: profileError } = useSiteProfile();
  const { data: homeSettingsData } = useHomeSettings();
  const homeSettings = homeSettingsData ?? getDefaultHomeSettings();
  const scrollRef = useGSAPScroll();

  // Debug profile data
  console.log('Profile data:', profile);
  console.log('Headshot URL:', profile?.headshotUrl);

  const headshotUrl = profile?.headshotUrl?.trim()
    ? profile.headshotUrl
    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80";
  
  // Debug: Force show a test image
  console.log('Using headshot URL:', headshotUrl);

  const heroStats = homeSettings.heroStats ?? [];
  const trustLogos = homeSettings.trustLogos ?? [];
  const accomplishments = homeSettings.accomplishments ?? [];
  const skills = homeSettings.skills ?? [];
  const capabilities = homeSettings.capabilities ?? [];
  const impactMetrics = homeSettings.impactMetrics ?? [];
  const processSteps = homeSettings.processSteps ?? [];

  const profileShape = profile?.profileShape || "circle";
  const profileSize = profile?.profileSize || "large";
  const profilePositionX = typeof profile?.profilePositionX === 'number' ? profile.profilePositionX : 0;
  const profilePositionY = typeof profile?.profilePositionY === 'number' ? profile.profilePositionY : 0;

  // map settings to classes/styles
  const shapeMap = {
    circle: 'rounded-full',
    oval: 'aspect-[4/3] rounded-full', // for container
    hexagon: '', // shape by style
    rounded: 'rounded-2xl',
    square: ''
  };
  const sizeMap = {
    small: 'h-28 w-28 md:h-32 md:w-32 min-w-[112px] min-h-[112px]',
    medium: 'h-40 w-40 md:h-48 md:w-48 min-w-[160px] min-h-[160px]',
    large: 'h-52 w-52 md:h-60 md:w-60 min-w-[208px] min-h-[208px]'
  };
  const posMap = {
    'top-left':  { justifyContent: 'flex-start', alignItems: 'flex-start', top: '2rem', left: '2rem', right: 'auto', bottom: 'auto' },
    'top-right': { justifyContent: 'flex-end', alignItems: 'flex-start', top: '2rem', right: '2rem', left: 'auto', bottom: 'auto' },
    'bottom-left': { justifyContent: 'flex-start', alignItems: 'flex-end', bottom: '2rem', left: '2rem', right: 'auto', top: 'auto' },
    'bottom-right': { justifyContent: 'flex-end', alignItems: 'flex-end', bottom: '2rem', right: '2rem', left: 'auto', top: 'auto' },
    'center-left': { justifyContent: 'flex-start', alignItems: 'center', left: '2rem', right: 'auto', top: 0, bottom: 0 },
    'center-right': { justifyContent: 'flex-end', alignItems: 'center', right: '2rem', left: 'auto', top: 0, bottom: 0 },
  };
  const imgShape = shapeMap[profileShape] || shapeMap.circle;
  const imgSize = 'h-60 w-60 md:h-72 md:w-72 min-w-[240px] min-h-[240px]';
  const imgPos = posMap['top-right'];

  const renderButton = (
    href: string,
    children: ReactNode,
    options: { variant?: ButtonProps["variant"]; size?: ButtonProps["size"] } = {},
  ) => {
    const { variant = "default", size = "default" } = options;
    const external = isExternalLink(href);
    const Comp: any = external ? "a" : Link;
    const compProps = external
      ? { href, target: "_blank", rel: "noopener noreferrer" }
      : { to: href };
    return (
      <Button variant={variant} size={size} asChild>
        <Comp {...compProps}>{children}</Comp>
      </Button>
    );
  };

  const heroHighlight = homeSettings.heroHighlight?.trim();
  const heroSubtitle = homeSettings.heroSubtitle?.trim();
  const heroBgUrl = profile?.heroBgUrl;

  return (
    <div ref={scrollRef} className="min-h-screen flex flex-col data-grid">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="hero-section container mx-auto px-4 py-20 md:py-32 relative overflow-hidden"
          style={heroBgUrl ? {
            backgroundImage: `url(${heroBgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          } : {}}
        >
          {heroBgUrl && (
            <>
              {/* Blurred dark background for ambiance */}
              <div className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${heroBgUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'blur(8px) brightness(0.55)',
                }}
              />
              {/* Gradient + vignette overlay for blend and readability */}
              <div className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,.82) 100%), linear-gradient(to bottom, rgba(0,0,0,0.66) 40%, rgba(0,0,0,0.88) 100%)'
                }}
              />
            </>
          )}
          {/* Main hero content (ensure z-20 or higher) */}
          <div className="relative z-20">
            <div className="max-w-6xl mx-auto flex flex-row-reverse items-center gap-10">
              <div className="flex-shrink-0 flex flex-col items-center justify-center">
                <div className={`relative group ${imgSize} rounded-full overflow-hidden`} style={{
                  boxShadow: '0 0 48px 0px rgba(0,212,255,0.45), 0 4px 16px 0 rgba(0,0,0,0.6)',
                  border: '3.5px solid #00d4ff',
                  background: 'rgba(15,25,40,0.4)',
                }}>
                  <img
                    src={headshotUrl}
                    alt="Rachael Olarinoye"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                    style={{ backgroundColor: 'white' }}
                  />
                  {/* Animated Neon Pulse/Halo */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow: '0 0 48px 8px rgba(0,212,255,0.38)',
                      animation: 'pulse 2.6s infinite cubic-bezier(.4,0,.6,1)',
                      zIndex: 2,
                      borderRadius: '9999px',
                      border: '2px solid #00d4ff'
                    }}
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left space-y-6 scroll-reveal animate-fade-in-left">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <Badge className="inline-flex neon-glow" variant="secondary">
                  {homeSettings.heroBadge}
                </Badge>
                </div>
                
                <h1 
                  className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-primary via-cyan-400 to-primary/60 bg-clip-text text-transparent animate-fade-in-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  {homeSettings.heroTitle}
                </h1>
                
                <p 
                  className="text-xl text-muted-foreground max-w-3xl mx-auto md:mx-0 animate-fade-in-up"
                  style={{ animationDelay: '0.6s' }}
                >
                  {heroHighlight ? (
                    <>
                      I&apos;m{" "}
                      <span className="text-foreground font-semibold neon-glow px-2 py-1 rounded">
                        {heroHighlight}
                      </span>
                      {heroSubtitle ? ` ${heroSubtitle}` : null}
                    </>
                  ) : (
                    heroSubtitle ??
                    "I help teams turn raw data into confident, revenue-driving decisions."
                  )}
                </p>
                
                <div 
                  className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in-up"
                  style={{ animationDelay: '0.8s' }}
                >
                  {renderButton(
                    homeSettings.primaryCtaLink || "/interactive",
                    <span className="flex items-center gap-2">
                      {homeSettings.primaryCtaLabel}
                      <ArrowRight className="w-4 h-4" />
                    </span>,
                    { size: "lg" },
                  )}
                  {renderButton(
                    homeSettings.secondaryCtaLink || "/contact",
                    homeSettings.secondaryCtaLabel,
                    { size: "lg", variant: "outline" },
                  )}
                </div>
              </div>
            </div>

            {(heroStats.length > 0 || trustLogos.length > 0) && (
              <div className="mt-12 space-y-8">
                {heroStats.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm md:grid-cols-3 md:divide-x md:divide-border/60">
                    {heroStats.map((stat, index) => (
                      <div key={`${stat.label}-${index}`} className="text-center md:px-6">
                        <p className="text-3xl font-semibold text-primary">
                          {stat.value}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {trustLogos.length > 0 && (
                  <div className="flex flex-col items-center gap-5 text-sm text-muted-foreground md:flex-row md:justify-center">
                    <span className="uppercase tracking-[0.3em] text-xs text-muted-foreground/70">
                      {homeSettings.trustHeading}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-foreground/70">
                      {trustLogos.map((logo, index) => (
                        <span key={`${logo}-${index}`} className="font-medium">
                          {logo}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Impact Metrics */}
        {(homeSettings.impactTitle || impactMetrics.length > 0) && (
          <section className="container mx-auto px-4 py-20 bg-secondary/30 -mx-4">
            <div className="max-w-6xl mx-auto">
              <div 
                className="text-center mb-12 scroll-reveal animate-fade-in-up"
              >
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.impactTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.impactSubtitle}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {impactMetrics.map((metric, index) => (
                  <div
                    key={`${metric.label}-${index}`}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <KPIBlock
                    value={metric.value}
                    label={metric.label}
                      enableCounter={true}
                  />
                  </div>
                ))}
              </div>

              {/* Data Visualization */}
              <div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <AnimatedChart
                  data={[
                    { label: 'Q1', value: 85, color: '#00d4ff' },
                    { label: 'Q2', value: 92, color: '#00ff88' },
                    { label: 'Q3', value: 78, color: '#ff6b6b' },
                    { label: 'Q4', value: 95, color: '#4ecdc4' },
                  ]}
                  type="bar"
                />
                <AnimatedChart
                  data={[
                    { label: 'SQL', value: 35, color: '#00d4ff' },
                    { label: 'Python', value: 25, color: '#00ff88' },
                    { label: 'R', value: 20, color: '#ff6b6b' },
                    { label: 'Other', value: 20, color: '#4ecdc4' },
                  ]}
                  type="donut"
                />
              </div>
            </div>
          </section>
        )}

        {/* Capabilities */}
        {capabilities.length > 0 && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <div 
                className="text-center mb-12 scroll-reveal animate-fade-in-up"
              >
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.capabilitiesTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.capabilitiesSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {capabilities.map((capability, index) => {
                  const CapabilityIcon = resolveIcon(capability.icon);
                  return (
                    <div
                      key={`${capability.title}-${index}`}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="hover:-translate-y-1 transition-transform duration-200">
                        <Card className="p-6 h-full data-card hover:neon-glow transition-all duration-300">
                          <CapabilityIcon className="w-6 h-6 text-primary mb-4 pulse-glow" />
                      <h3 className="text-lg font-semibold mb-2">
                        {capability.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {capability.description}
                      </p>
                    </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Accomplishments */}
        {accomplishments.length > 0 && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.accomplishmentsTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.accomplishmentsSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accomplishments.map((item, index) => {
                  const IconComp = resolveIcon(item.icon);
                  return (
                    <Card
                      key={`${item.title}-${index}`}
                      className="p-6 bg-card border border-border/60 hover:border-primary/60 transition"
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <IconComp className="w-6 h-6 text-primary" />
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
                          {item.description}
                        </p>
                        <Badge className="mt-4 w-fit" variant="outline">
                          {item.highlight}
                        </Badge>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.skillsTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.skillsSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <Card
                    key={`${skill.name}-${index}`}
                    className="p-4 text-center hover:border-primary transition-colors"
                  >
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
        )}

        {/* Process */}
        {processSteps.length > 0 && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.processTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.processSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <Card key={`${step.title}-${index}`} className="p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Selected Work */}
        <section className="container mx-auto px-4 py-20 bg-secondary/30 -mx-4">
          <div className="max-w-6xl mx-auto">
            <div 
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 scroll-reveal animate-fade-in-up"
            >
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {homeSettings.selectedWorkTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.selectedWorkSubtitle}
                </p>
              </div>
              {renderButton(
                homeSettings.selectedWorkCtaLink || "/projects",
                <span className="flex items-center gap-2">
                  {homeSettings.selectedWorkCtaLabel}
                  <ArrowRight className="w-4 h-4" />
                </span>,
                { variant: "outline" },
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => {
                // Add mock metrics for analytics cards
                const mockMetrics = [
                  { label: "Accuracy", value: "94.2%", change: "+2.1%", trend: "up" as const },
                  { label: "Uptime", value: "99.8%", change: "+0.3%", trend: "up" as const },
                  { label: "Performance", value: "1.2s", change: "-0.4s", trend: "up" as const },
                  { label: "Adoption", value: "87%", change: "+12%", trend: "up" as const },
                ];

                return (
                  <AnalyticsProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  summary={project.summary}
                  tools={project.tools}
                  coverImage={project.coverImage}
                    metrics={mockMetrics}
                    className="analytics-card neon-hover"
                />
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">
              {homeSettings.ctaHeadline}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {homeSettings.ctaDescription}
            </p>
            {renderButton(
              homeSettings.ctaButtonLink || "/contact",
              <span className="flex items-center gap-2">
                {homeSettings.ctaButtonLabel}
                <ArrowRight className="w-4 h-4" />
              </span>,
              { size: "lg" },
            )}
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

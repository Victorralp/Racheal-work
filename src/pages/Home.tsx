import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { KPIBlock } from "@/components/KPIBlock";
import { ProjectCard } from "@/components/ProjectCard";
import { mockProjects } from "@/data/mockProjects";
import { useSiteProfile } from "@/hooks/use-site-profile";
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
  const { data: profile } = useSiteProfile();
  const { data: homeSettingsData } = useHomeSettings();
  const homeSettings = homeSettingsData ?? getDefaultHomeSettings();

  const headshotUrl = profile?.headshotUrl?.trim()
    ? profile.headshotUrl
    : "/placeholder.svg";

  const heroStats = homeSettings.heroStats ?? [];
  const trustLogos = homeSettings.trustLogos ?? [];
  const accomplishments = homeSettings.accomplishments ?? [];
  const skills = homeSettings.skills ?? [];
  const capabilities = homeSettings.capabilities ?? [];
  const impactMetrics = homeSettings.impactMetrics ?? [];
  const processSteps = homeSettings.processSteps ?? [];

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-6xl mx-auto grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
            <div className="text-center md:text-left space-y-6">
              <Badge className="inline-flex" variant="secondary">
                {homeSettings.heroBadge}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {homeSettings.heroTitle}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto md:mx-0">
                {heroHighlight ? (
                  <>
                    I&apos;m{" "}
                    <span className="text-foreground font-semibold">
                      {heroHighlight}
                    </span>
                    {heroSubtitle ? ` ${heroSubtitle}` : null}
                  </>
                ) : (
                  heroSubtitle ??
                  "I help teams turn raw data into confident, revenue-driving decisions."
                )}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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

            <div className="flex justify-center md:justify-end">
              <div className="relative inline-flex">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-primary/30 blur-[2px]"
                />
                <img
                  src={headshotUrl}
                  alt="Portrait of Rachael Olarinoye"
                  className="relative h-48 w-48 md:h-64 md:w-64 rounded-full object-cover border-4 border-background shadow-2xl"
                  loading="lazy"
                />
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
        </section>

        {/* Impact Metrics */}
        {(homeSettings.impactTitle || impactMetrics.length > 0) && (
          <section className="container mx-auto px-4 py-20 bg-secondary/30 -mx-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.impactTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.impactSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {impactMetrics.map((metric, index) => (
                  <KPIBlock
                    key={`${metric.label}-${index}`}
                    value={metric.value}
                    label={metric.label}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Capabilities */}
        {capabilities.length > 0 && (
          <section className="container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
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
                    <Card
                      key={`${capability.title}-${index}`}
                      className="p-6 h-full border border-border/60 hover:border-primary/60 transition"
                    >
                      <CapabilityIcon className="w-6 h-6 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {capability.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {capability.description}
                      </p>
                    </Card>
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
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

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { KPIBlock } from "@/components/KPIBlock";
import { ProjectCard } from "@/components/ProjectCard";
import { PerformanceOptimized3D } from "@/components/PerformanceOptimized3D";
import { mockProjects } from "@/data/mockProjects";
import { useSiteProfile } from "@/hooks/use-site-profile";
import {
  useHomeSettings,
  getDefaultHomeSettings,
} from "@/hooks/use-home-settings";
import { useHeroAnimation } from "@/hooks/use-hero-animation";
import { useScrollAnimations } from "@/hooks/use-scroll-animations";
import { useAnimationConfig } from "@/hooks/use-animation-config";
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
  
  // Animation hooks
  const { heroRef, titleRef, subtitleRef, buttonsRef, imageRef } = useHeroAnimation();
  const { addSectionRef, containerRef } = useScrollAnimations();
  const { shouldAnimate, isLowPerformance, duration, ease } = useAnimationConfig();

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
    const Comp = external ? "a" : Link;
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
    <div ref={containerRef} className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative container mx-auto px-4 py-20 md:py-32 overflow-hidden"
        >
          {/* 3D Background - performance optimized */}
          <PerformanceOptimized3D />
          
          <div className="relative max-w-6xl mx-auto grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
            <motion.div 
              ref={titleRef}
              className="text-center md:text-left space-y-6"
              initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
              transition={{ duration: duration.slow, ease: ease.smooth }}
            >
              <motion.div
                initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : false}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
                transition={{ duration: duration.normal, delay: 0.1 }}
              >
                <Badge className="inline-flex" variant="secondary">
                  {homeSettings.heroBadge}
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                initial={shouldAnimate ? { opacity: 0, y: 40 } : false}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
                transition={{ duration: duration.slow, delay: 0.2 }}
              >
                {homeSettings.heroTitle}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto md:mx-0"
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
                transition={{ duration: duration.normal, delay: 0.3 }}
              >
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
              </motion.p>
              
              <motion.div 
                ref={buttonsRef}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
                transition={{ duration: duration.normal, delay: 0.4 }}
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
              </motion.div>
            </motion.div>

            <motion.div 
              ref={imageRef}
              className="flex justify-center md:justify-end"
              initial={shouldAnimate ? { opacity: 0, scale: 0.8, rotateY: -15 } : false}
              animate={shouldAnimate ? { opacity: 1, scale: 1, rotateY: 0 } : false}
              transition={{ duration: duration.slow, delay: 0.5, ease: ease.bouncy }}
            >
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
            </motion.div>
          </div>

          {(heroStats.length > 0 || trustLogos.length > 0) && (
            <motion.div 
              className="mt-12 space-y-8"
              initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
              transition={{ duration: duration.normal, delay: 0.6 }}
            >
              {heroStats.length > 0 && (
                <motion.div 
                  className="grid grid-cols-1 gap-4 rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm md:grid-cols-3 md:divide-x md:divide-border/60"
                  initial={shouldAnimate ? { opacity: 0, scale: 0.95 } : false}
                  animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
                  transition={{ duration: duration.normal, delay: 0.7 }}
                >
                  {heroStats.map((stat, index) => (
                    <motion.div 
                      key={`${stat.label}-${index}`} 
                      className="text-center md:px-6"
                      initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                      animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
                      transition={{ duration: duration.fast, delay: 0.8 + index * 0.1 }}
                    >
                      <p className="text-3xl font-semibold text-primary">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {trustLogos.length > 0 && (
                <motion.div 
                  className="flex flex-col items-center gap-5 text-sm text-muted-foreground md:flex-row md:justify-center"
                  initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : false}
                  transition={{ duration: duration.normal, delay: 0.9 }}
                >
                  <span className="uppercase tracking-[0.3em] text-xs text-muted-foreground/70">
                    {homeSettings.trustHeading}
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-foreground/70">
                    {trustLogos.map((logo, index) => (
                      <motion.span 
                        key={`${logo}-${index}`} 
                        className="font-medium"
                        initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
                        animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
                        transition={{ duration: duration.fast, delay: 1 + index * 0.05 }}
                      >
                        {logo}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </section>

        {/* Impact Metrics */}
        {(homeSettings.impactTitle || impactMetrics.length > 0) && (
          <motion.section 
            ref={(el) => addSectionRef(el, 0)}
            className="container mx-auto px-4 py-20 bg-secondary/30 -mx-4"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : false}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: duration.normal }}
              >
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.impactTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.impactSubtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {impactMetrics.map((metric, index) => (
                  <motion.div
                    key={`${metric.label}-${index}`}
                    className="stagger-item"
                    initial={shouldAnimate ? { opacity: 0, y: 40, scale: 0.95 } : false}
                    whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : false}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: duration.normal, delay: index * 0.1 }}
                    whileHover={shouldAnimate ? { scale: 1.02, y: -5 } : false}
                  >
                    <KPIBlock
                      value={metric.value}
                      label={metric.label}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Capabilities */}
        {capabilities.length > 0 && (
          <motion.section 
            ref={(el) => addSectionRef(el, 1)}
            className="container mx-auto px-4 py-20"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : false}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: duration.normal }}
              >
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.capabilitiesTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.capabilitiesSubtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {capabilities.map((capability, index) => {
                  const CapabilityIcon = resolveIcon(capability.icon);
                  return (
                    <motion.div
                      key={`${capability.title}-${index}`}
                      className="stagger-item"
                      initial={shouldAnimate ? { opacity: 0, y: 40, scale: 0.95 } : false}
                      whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : false}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: duration.normal, delay: index * 0.1 }}
                      whileHover={shouldAnimate ? { scale: 1.02, y: -5 } : false}
                    >
                      <Card className="p-6 h-full border border-border/60 hover:border-primary/60 transition">
                        <CapabilityIcon className="w-6 h-6 text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          {capability.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {capability.description}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {/* Accomplishments */}
        {accomplishments.length > 0 && (
          <motion.section 
            ref={(el) => addSectionRef(el, 2)}
            className="container mx-auto px-4 py-20"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : false}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: duration.normal }}
              >
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.accomplishmentsTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.accomplishmentsSubtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accomplishments.map((item, index) => {
                  const IconComp = resolveIcon(item.icon);
                  return (
                    <motion.div
                      key={`${item.title}-${index}`}
                      className="stagger-item"
                      initial={shouldAnimate ? { opacity: 0, y: 40, scale: 0.95 } : false}
                      whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : false}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: duration.normal, delay: index * 0.1 }}
                      whileHover={shouldAnimate ? { scale: 1.02, y: -5 } : false}
                    >
                      <Card className="p-6 bg-card border border-border/60 hover:border-primary/60 transition">
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
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <motion.section 
            ref={(el) => addSectionRef(el, 3)}
            className="container mx-auto px-4 py-20"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : false}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: duration.normal }}
              >
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.skillsTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.skillsSubtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    className="stagger-item"
                    initial={shouldAnimate ? { opacity: 0, y: 30, scale: 0.9 } : false}
                    whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : false}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: duration.fast, delay: index * 0.05 }}
                    whileHover={shouldAnimate ? { scale: 1.05, y: -2 } : false}
                  >
                    <Card className="p-4 text-center hover:border-primary transition-colors">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">{skill.name}</h3>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {skill.level}
                      </Badge>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Process */}
        {processSteps.length > 0 && (
          <motion.section 
            ref={(el) => addSectionRef(el, 4)}
            className="container mx-auto px-4 py-20"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : false}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: duration.normal }}
              >
                <h2 className="text-3xl font-bold mb-3">
                  {homeSettings.processTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.processSubtitle}
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={`${step.title}-${index}`}
                    className="stagger-item"
                    initial={shouldAnimate ? { opacity: 0, y: 40, scale: 0.9 } : false}
                    whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : false}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: duration.normal, delay: index * 0.15 }}
                    whileHover={shouldAnimate ? { scale: 1.05, y: -5 } : false}
                  >
                    <Card className="p-6 text-center">
                      <motion.div 
                        className="text-4xl font-bold text-primary mb-2"
                        initial={shouldAnimate ? { scale: 0 } : false}
                        whileInView={shouldAnimate ? { scale: 1 } : false}
                        viewport={{ once: true }}
                        transition={{ duration: duration.normal, delay: index * 0.15 + 0.2, ease: ease.bouncy }}
                      >
                        {(index + 1).toString().padStart(2, "0")}
                      </motion.div>
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Selected Work */}
        <motion.section 
          ref={(el) => addSectionRef(el, 5)}
          className="container mx-auto px-4 py-20 bg-secondary/30 -mx-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12"
              initial={shouldAnimate ? { opacity: 0, y: 30 } : false}
              whileInView={shouldAnimate ? { opacity: 1, y: 0 } : false}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: duration.normal }}
            >
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {homeSettings.selectedWorkTitle}
                </h2>
                <p className="text-muted-foreground">
                  {homeSettings.selectedWorkSubtitle}
                </p>
              </div>
              <motion.div
                initial={shouldAnimate ? { opacity: 0, x: 20 } : false}
                whileInView={shouldAnimate ? { opacity: 1, x: 0 } : false}
                viewport={{ once: true }}
                transition={{ duration: duration.normal, delay: 0.2 }}
              >
                {renderButton(
                  homeSettings.selectedWorkCtaLink || "/projects",
                  <span className="flex items-center gap-2">
                    {homeSettings.selectedWorkCtaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </span>,
                  { variant: "outline" },
                )}
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="stagger-item"
                  initial={shouldAnimate ? { opacity: 0, y: 40, scale: 0.95 } : false}
                  whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : false}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: duration.normal, delay: index * 0.1 }}
                  whileHover={shouldAnimate ? { scale: 1.02, y: -5 } : false}
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
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          ref={(el) => addSectionRef(el, 6)}
          className="container mx-auto px-4 py-20"
        >
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 40, scale: 0.95 } : false}
            whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : false}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: duration.slow, ease: ease.smooth }}
            whileHover={shouldAnimate ? { scale: 1.02 } : false}
          >
            <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : false}
                viewport={{ once: true }}
                transition={{ duration: duration.normal, delay: 0.1 }}
              >
                {homeSettings.ctaHeadline}
              </motion.h2>
              <motion.p 
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : false}
                viewport={{ once: true }}
                transition={{ duration: duration.normal, delay: 0.2 }}
              >
                {homeSettings.ctaDescription}
              </motion.p>
              <motion.div
                initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
                whileInView={shouldAnimate ? { opacity: 1, y: 0 } : false}
                viewport={{ once: true }}
                transition={{ duration: duration.normal, delay: 0.3 }}
              >
                {renderButton(
                  homeSettings.ctaButtonLink || "/contact",
                  <span className="flex items-center gap-2">
                    {homeSettings.ctaButtonLabel}
                    <ArrowRight className="w-4 h-4" />
                  </span>,
                  { size: "lg" },
                )}
              </motion.div>
            </Card>
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  useHomeSettings,
  useUpdateHomeSettings,
  getDefaultHomeSettings,
  type HomeSettings,
  type UpdateHomeSettingsInput,
  type HeroStat,
  type HomeSkill,
  type HomeAccomplishment,
  type HomeCapability,
  type HomeProcessStep,
} from "@/hooks/use-home-settings";
import { Loader2, Plus, Trash2 } from "lucide-react";

type EditableHomeSettings = Omit<HomeSettings, "updatedAt">;

const cloneEditableHomeSettings = (
  settings?: HomeSettings,
): EditableHomeSettings => {
  const base = getDefaultHomeSettings();
  const { updatedAt: _baseUpdatedAt, ...baseRest } = base;
  if (!settings) {
    return JSON.parse(JSON.stringify(baseRest));
  }
  const { updatedAt: _settingsUpdatedAt, ...settingsRest } = settings;
  return JSON.parse(JSON.stringify({ ...baseRest, ...settingsRest }));
};

const createHeroStat = (): HeroStat => ({ value: "", label: "" });
const createSkill = (): HomeSkill => ({ name: "", level: "" });
const createAccomplishment = (): HomeAccomplishment => ({
  icon: "",
  title: "",
  description: "",
  highlight: "",
});
const createCapability = (): HomeCapability => ({
  icon: "",
  title: "",
  description: "",
});
const createProcessStep = (): HomeProcessStep => ({
  title: "",
  description: "",
});

const removeAt = <T,>(list: T[], index: number, createItem: () => T): T[] => {
  if (list.length === 1) {
    return [createItem()];
  }
  return list.filter((_, i) => i !== index);
};

const AdminHomeSettings = () => {
  const { data, isLoading } = useHomeSettings();
  const updateHomeSettings = useUpdateHomeSettings();
  const { toast } = useToast();

  const [formData, setFormData] = useState<EditableHomeSettings>(() =>
    cloneEditableHomeSettings(data),
  );

  useEffect(() => {
    if (data) {
      setFormData(cloneEditableHomeSettings(data));
    }
  }, [data]);

  const updateHeroStat = (
    index: number,
    key: keyof HeroStat,
    value: string,
  ) => {
    setFormData((prev) => {
      const next = [...prev.heroStats];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, heroStats: next };
    });
  };

  const updateImpactMetric = (
    index: number,
    key: keyof HeroStat,
    value: string,
  ) => {
    setFormData((prev) => {
      const next = [...prev.impactMetrics];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, impactMetrics: next };
    });
  };

  const updateTrustLogo = (index: number, value: string) => {
    setFormData((prev) => {
      const next = [...prev.trustLogos];
      next[index] = value;
      return { ...prev, trustLogos: next };
    });
  };

  const updateSkill = (index: number, key: keyof HomeSkill, value: string) => {
    setFormData((prev) => {
      const next = [...prev.skills];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, skills: next };
    });
  };

  const updateAccomplishment = (
    index: number,
    key: keyof HomeAccomplishment,
    value: string,
  ) => {
    setFormData((prev) => {
      const next = [...prev.accomplishments];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, accomplishments: next };
    });
  };

  const updateCapability = (
    index: number,
    key: keyof HomeCapability,
    value: string,
  ) => {
    setFormData((prev) => {
      const next = [...prev.capabilities];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, capabilities: next };
    });
  };

  const updateProcessStep = (
    index: number,
    key: keyof HomeProcessStep,
    value: string,
  ) => {
    setFormData((prev) => {
      const next = [...prev.processSteps];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, processSteps: next };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateHomeSettings.mutateAsync(
        formData as UpdateHomeSettingsInput,
      );
      toast({
        title: "Homepage updated",
        description: "Your homepage content has been saved.",
      });
    } catch (error) {
      toast({
        title: "Error saving homepage",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong while saving.",
        variant: "destructive",
      });
    }
  };

  if (isLoading && !data) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Homepage Content</h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Update the copy, stats, logos, and calls-to-action that appear on the public homepage. Changes save immediately to Firestore—no code deploy required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Hero Section</h2>
                <p className="text-sm text-muted-foreground">
                  Edit the headline, introduction, and top-of-page calls-to-action.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="heroBadge">Hero Badge</Label>
                  <Input
                    id="heroBadge"
                    value={formData.heroBadge}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroBadge: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={formData.heroTitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroTitle: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroHighlight">Highlighted Name</Label>
                  <Input
                    id="heroHighlight"
                    value={formData.heroHighlight}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroHighlight: event.target.value,
                      }))
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Displayed in bold within the hero paragraph.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Textarea
                    id="heroSubtitle"
                    value={formData.heroSubtitle}
                    rows={3}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        heroSubtitle: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trustHeading">Trust Heading</Label>
                  <Input
                    id="trustHeading"
                    value={formData.trustHeading}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        trustHeading: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primaryCtaLabel">Primary CTA Label</Label>
                  <Input
                    id="primaryCtaLabel"
                    value={formData.primaryCtaLabel}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        primaryCtaLabel: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryCtaLink">Primary CTA Link</Label>
                  <Input
                    id="primaryCtaLink"
                    value={formData.primaryCtaLink}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        primaryCtaLink: event.target.value,
                      }))
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Accepts relative paths (e.g. /interactive) or full URLs.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryCtaLabel">Secondary CTA Label</Label>
                  <Input
                    id="secondaryCtaLabel"
                    value={formData.secondaryCtaLabel}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        secondaryCtaLabel: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryCtaLink">Secondary CTA Link</Label>
                  <Input
                    id="secondaryCtaLink"
                    value={formData.secondaryCtaLink}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        secondaryCtaLink: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </Card>
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Hero Stats & Logos</h2>
                <p className="text-sm text-muted-foreground">
                  Showcase headline metrics and trusted brands.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wide">
                    Hero Stats
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        heroStats: [...prev.heroStats, createHeroStat()],
                      }))
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add stat
                  </Button>
                </div>
                <div className="grid gap-4">
                  {formData.heroStats.map((stat, index) => (
                    <div
                      key={`hero-stat-${index}`}
                      className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end"
                    >
                      <div className="space-y-2">
                        <Label>Value</Label>
                        <Input
                          value={stat.value}
                          onChange={(event) =>
                            updateHeroStat(index, "value", event.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={stat.label}
                          onChange={(event) =>
                            updateHeroStat(index, "label", event.target.value)
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="self-center"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            heroStats: removeAt(
                              prev.heroStats,
                              index,
                              createHeroStat,
                            ),
                          }))
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wide">
                    Trust Logos
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        trustLogos: [...prev.trustLogos, ""],
                      }))
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add logo
                  </Button>
                </div>
                <div className="grid gap-3">
                  {formData.trustLogos.map((logo, index) => (
                    <div
                      key={`logo-${index}`}
                      className="grid gap-3 md:grid-cols-[1fr_auto]"
                    >
                      <Input
                        value={logo}
                        onChange={(event) =>
                          updateTrustLogo(index, event.target.value)
                        }
                        placeholder="Company or client name"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            trustLogos: removeAt(
                              prev.trustLogos,
                              index,
                              () => "",
                            ),
                          }))
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Impact Section</h2>
                <p className="text-sm text-muted-foreground">
                  Manage the KPI headline and metrics.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="impactTitle">Section Title</Label>
                  <Input
                    id="impactTitle"
                    value={formData.impactTitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        impactTitle: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="impactSubtitle">Section Subtitle</Label>
                  <Input
                    id="impactSubtitle"
                    value={formData.impactSubtitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        impactSubtitle: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wide">
                    Impact Metrics
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        impactMetrics: [
                          ...prev.impactMetrics,
                          createHeroStat(),
                        ],
                      }))
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add metric
                  </Button>
                </div>
                <div className="grid gap-4">
                  {formData.impactMetrics.map((metric, index) => (
                    <div
                      key={`impact-metric-${index}`}
                      className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end"
                    >
                      <div className="space-y-2">
                        <Label>Value</Label>
                        <Input
                          value={metric.value}
                          onChange={(event) =>
                            updateImpactMetric(index, "value", event.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={metric.label}
                          onChange={(event) =>
                            updateImpactMetric(index, "label", event.target.value)
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="self-center"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            impactMetrics: removeAt(
                              prev.impactMetrics,
                              index,
                              createHeroStat,
                            ),
                          }))
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Capabilities</h2>
                <p className="text-sm text-muted-foreground">
                  Define the services or capability pillars you want to highlight.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="capabilitiesTitle">Section Title</Label>
                  <Input
                    id="capabilitiesTitle"
                    value={formData.capabilitiesTitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        capabilitiesTitle: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capabilitiesSubtitle">Section Subtitle</Label>
                  <Input
                    id="capabilitiesSubtitle"
                    value={formData.capabilitiesSubtitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        capabilitiesSubtitle: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wide">
                    Capability Cards
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        capabilities: [...prev.capabilities, createCapability()],
                      }))
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add capability
                  </Button>
                </div>
                <div className="grid gap-4">
                  {formData.capabilities.map((capability, index) => (
                    <div
                      key={`capability-${index}`}
                      className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]"
                    >
                      <div className="space-y-2">
                        <Label>Icon (Lucide name)</Label>
                        <Input
                          value={capability.icon}
                          onChange={(event) =>
                            updateCapability(index, "icon", event.target.value)
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Example: Database, BarChart3, Sparkles
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={capability.title}
                          onChange={(event) =>
                            updateCapability(index, "title", event.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={capability.description}
                          onChange={(event) =>
                            updateCapability(
                              index,
                              "description",
                              event.target.value,
                            )
                          }
                          rows={2}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="self-center"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            capabilities: removeAt(
                              prev.capabilities,
                              index,
                              createCapability,
                            ),
                          }))
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Accomplishments</h2>
                <p className="text-sm text-muted-foreground">
                  Curate proof points with Lucide icons, short copy, and highlight tags.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="accomplishmentsTitle">Section Title</Label>
                  <Input
                    id="accomplishmentsTitle"
                    value={formData.accomplishmentsTitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        accomplishmentsTitle: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accomplishmentsSubtitle">
                    Section Subtitle
                  </Label>
                  <Input
                    id="accomplishmentsSubtitle"
                    value={formData.accomplishmentsSubtitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        accomplishmentsSubtitle: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wide">
                    Accomplishment Cards
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        accomplishments: [
                          ...prev.accomplishments,
                          createAccomplishment(),
                        ],
                      }))
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add accomplishment
                  </Button>
                </div>
                <div className="grid gap-4">
                  {formData.accomplishments.map((item, index) => (
                    <div
                      key={`accomplishment-${index}`}
                      className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]"
                    >
                      <div className="space-y-2">
                        <Label>Icon (Lucide name)</Label>
                        <Input
                          value={item.icon}
                          onChange={(event) =>
                            updateAccomplishment(index, "icon", event.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={item.title}
                          onChange={(event) =>
                            updateAccomplishment(index, "title", event.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={item.description}
                          onChange={(event) =>
                            updateAccomplishment(
                              index,
                              "description",
                              event.target.value,
                            )
                          }
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Highlight</Label>
                        <Input
                          value={item.highlight}
                          onChange={(event) =>
                            updateAccomplishment(
                              index,
                              "highlight",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="self-center md:col-start-4"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            accomplishments: removeAt(
                              prev.accomplishments,
                              index,
                              createAccomplishment,
                            ),
                          }))
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Skills</h2>
                <p className="text-sm text-muted-foreground">
                  Update the tool badges that appear in the “Technical Expertise” grid.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="skillsTitle">Section Title</Label>
                  <Input
                    id="skillsTitle"
                    value={formData.skillsTitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        skillsTitle: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skillsSubtitle">Section Subtitle</Label>
                  <Input
                    id="skillsSubtitle"
                    value={formData.skillsSubtitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        skillsSubtitle: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wide">
                    Skill Badges
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        skills: [...prev.skills, createSkill()],
                      }))
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add skill
                  </Button>
                </div>
                <div className="grid gap-3">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={`skill-${index}`}
                      className="grid gap-3 md:grid-cols-[1fr_1fr_auto]"
                    >
                      <Input
                        value={skill.name}
                        onChange={(event) =>
                          updateSkill(index, "name", event.target.value)
                        }
                        placeholder="Skill name"
                      />
                      <Input
                        value={skill.level}
                        onChange={(event) =>
                          updateSkill(index, "level", event.target.value)
                        }
                        placeholder="Proficiency (e.g. Expert)"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            skills: removeAt(prev.skills, index, createSkill),
                          }))
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Process Steps</h2>
                <p className="text-sm text-muted-foreground">
                  Outline the four-step working cadence that appears in the “My Process” section.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="processTitle">Section Title</Label>
                  <Input
                    id="processTitle"
                    value={formData.processTitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        processTitle: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processSubtitle">Section Subtitle</Label>
                  <Input
                    id="processSubtitle"
                    value={formData.processSubtitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        processSubtitle: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium uppercase tracking-wide">
                    Process Steps
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        processSteps: [
                          ...prev.processSteps,
                          createProcessStep(),
                        ],
                      }))
                    }
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add step
                  </Button>
                </div>
                <div className="grid gap-4">
                  {formData.processSteps.map((step, index) => (
                    <div
                      key={`process-step-${index}`}
                      className="grid gap-3 md:grid-cols-[1fr_2fr_auto]"
                    >
                      <Input
                        value={step.title}
                        onChange={(event) =>
                          updateProcessStep(index, "title", event.target.value)
                        }
                        placeholder="Step title"
                      />
                      <Textarea
                        value={step.description}
                        onChange={(event) =>
                          updateProcessStep(
                            index,
                            "description",
                            event.target.value,
                          )
                        }
                        rows={2}
                        placeholder="Brief description"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            processSteps: removeAt(
                              prev.processSteps,
                              index,
                              createProcessStep,
                            ),
                          }))
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Selected Work</h2>
                <p className="text-sm text-muted-foreground">
                  Customize the heading and call-to-action above the portfolio grid.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="selectedWorkTitle">Section Title</Label>
                  <Input
                    id="selectedWorkTitle"
                    value={formData.selectedWorkTitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        selectedWorkTitle: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selectedWorkSubtitle">Section Subtitle</Label>
                  <Input
                    id="selectedWorkSubtitle"
                    value={formData.selectedWorkSubtitle}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        selectedWorkSubtitle: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selectedWorkCtaLabel">CTA Label</Label>
                  <Input
                    id="selectedWorkCtaLabel"
                    value={formData.selectedWorkCtaLabel}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        selectedWorkCtaLabel: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="selectedWorkCtaLink">CTA Link</Label>
                  <Input
                    id="selectedWorkCtaLink"
                    value={formData.selectedWorkCtaLink}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        selectedWorkCtaLink: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </Card>
            <Card className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Final CTA Banner</h2>
                <p className="text-sm text-muted-foreground">
                  Adjust the closing pitch that sits above the contact button.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="ctaHeadline">Headline</Label>
                  <Input
                    id="ctaHeadline"
                    value={formData.ctaHeadline}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        ctaHeadline: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="ctaDescription">Description</Label>
                  <Textarea
                    id="ctaDescription"
                    value={formData.ctaDescription}
                    rows={3}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        ctaDescription: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaButtonLabel">Button Label</Label>
                  <Input
                    id="ctaButtonLabel"
                    value={formData.ctaButtonLabel}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        ctaButtonLabel: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaButtonLink">Button Link</Label>
                  <Input
                    id="ctaButtonLink"
                    value={formData.ctaButtonLink}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        ctaButtonLink: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={updateHomeSettings.isPending}
                className="gap-2"
              >
                {updateHomeSettings.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving changes...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminHomeSettings;

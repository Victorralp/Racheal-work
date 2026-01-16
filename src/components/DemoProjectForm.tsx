import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ImageUploader } from "@/components/ImageUploader";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  DemoDataPoint,
  DemoInsight,
  DemoMetric,
} from "@/hooks/use-demo-projects";

export interface DemoProjectFormData {
  title: string;
  summary: string;
  description: string;
  coverImage: string;
  metrics: DemoMetric[];
  dataPoints: DemoDataPoint[];
  insights: DemoInsight[];
}

interface DemoProjectFormProps {
  initialData?: DemoProjectFormData;
  onSubmit: (data: DemoProjectFormData) => Promise<void>;
  submitLabel: string;
}

const emptyMetric: DemoMetric = { label: "", value: "", change: "" };
const emptyDataPoint: DemoDataPoint = { label: "", value: "" };
const emptyInsight: DemoInsight = { title: "", detail: "" };

export const DemoProjectForm = ({
  initialData,
  onSubmit,
  submitLabel,
}: DemoProjectFormProps) => {
  const normalizeData = (data?: DemoProjectFormData): DemoProjectFormData => {
    if (!data) {
      return {
        title: "",
        summary: "",
        description: "",
        coverImage: "",
        metrics: [{ ...emptyMetric }],
        dataPoints: [{ ...emptyDataPoint }],
        insights: [{ ...emptyInsight }],
      };
    }

    return {
      ...data,
      metrics:
        Array.isArray(data.metrics) && data.metrics.length
          ? data.metrics
          : [{ ...emptyMetric }],
      dataPoints:
        Array.isArray(data.dataPoints) && data.dataPoints.length
          ? data.dataPoints
          : [{ ...emptyDataPoint }],
      insights:
        Array.isArray(data.insights) && data.insights.length
          ? data.insights
          : [{ ...emptyInsight }],
    };
  };

  const [formData, setFormData] = useState<DemoProjectFormData>(
    normalizeData(initialData),
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(normalizeData(initialData));
  }, [initialData]);

  const updateMetric = (index: number, key: keyof DemoMetric, value: string) => {
    setFormData((prev) => {
      const metrics = [...prev.metrics];
      metrics[index] = { ...metrics[index], [key]: value };
      return { ...prev, metrics };
    });
  };

  const addMetric = () =>
    setFormData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, { ...emptyMetric }],
    }));

  const removeMetric = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));

  const updateDataPoint = (
    index: number,
    key: keyof DemoDataPoint,
    value: string,
  ) => {
    setFormData((prev) => {
      const dataPoints = [...prev.dataPoints];
      dataPoints[index] = { ...dataPoints[index], [key]: value };
      return { ...prev, dataPoints };
    });
  };

  const addDataPoint = () =>
    setFormData((prev) => ({
      ...prev,
      dataPoints: [...prev.dataPoints, { ...emptyDataPoint }],
    }));

  const removeDataPoint = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      dataPoints: prev.dataPoints.filter((_, i) => i !== index),
    }));

  const updateInsight = (
    index: number,
    key: keyof DemoInsight,
    value: string,
  ) => {
    setFormData((prev) => {
      const insights = [...prev.insights];
      insights[index] = { ...insights[index], [key]: value };
      return { ...prev, insights };
    });
  };

  const addInsight = () =>
    setFormData((prev) => ({
      ...prev,
      insights: [...prev.insights, { ...emptyInsight }],
    }));

  const removeInsight = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      insights: prev.insights.filter((_, i) => i !== index),
    }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const sanitizedMetrics = formData.metrics.filter(
        (metric) => metric.label.trim() && metric.value.trim(),
      );
      const sanitizedDataPoints = formData.dataPoints.filter(
        (item) => item.label.trim() && item.value.trim(),
      );
      const sanitizedInsights = formData.insights.filter(
        (item) => item.title.trim() && item.detail.trim(),
      );

      await onSubmit({
        ...formData,
        metrics: sanitizedMetrics.length ? sanitizedMetrics : [emptyMetric],
        dataPoints: sanitizedDataPoints.length
          ? sanitizedDataPoints
          : [emptyDataPoint],
        insights: sanitizedInsights.length
          ? sanitizedInsights
          : [emptyInsight],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
            }
            required
            placeholder="Revenue Recovery Scenario"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Summary *</Label>
          <Textarea
            id="summary"
            value={formData.summary}
            onChange={(event) =>
              setFormData({ ...formData, summary: event.target.value })
            }
            required
            placeholder="Short description used on the interactive page."
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Scenario Detail *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(event) =>
              setFormData({ ...formData, description: event.target.value })
            }
            required
            placeholder="Explain the business context, the data available, and what the user should look for."
            rows={4}
          />
        </div>

        <ImageUploader
          label="Cover Image (optional)"
          value={formData.coverImage}
          onChange={(url) =>
            setFormData({ ...formData, coverImage: url as string })
          }
          multiple={false}
        />
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Key Metrics</h2>
            <p className="text-sm text-muted-foreground">
              Show the headline numbers for this scenario (e.g. revenue, ROI,
              churn).
            </p>
          </div>
          <Button type="button" variant="outline" onClick={addMetric}>
            <Plus className="w-4 h-4 mr-2" />
            Add Metric
          </Button>
        </div>

        <div className="space-y-3">
          {formData.metrics.map((metric, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-lg border border-border p-4 md:grid-cols-[2fr_2fr_1fr_auto]"
            >
              <div className="space-y-2">
                <Label htmlFor={`metric-label-${index}`}>Label *</Label>
                <Input
                  id={`metric-label-${index}`}
                  value={metric.label}
                  onChange={(event) =>
                    updateMetric(index, "label", event.target.value)
                  }
                  placeholder="Monthly Recurring Revenue"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`metric-value-${index}`}>Value *</Label>
                <Input
                  id={`metric-value-${index}`}
                  value={metric.value}
                  onChange={(event) =>
                    updateMetric(index, "value", event.target.value)
                  }
                  placeholder="$248,500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`metric-change-${index}`}>
                  Change (optional)
                </Label>
                <Input
                  id={`metric-change-${index}`}
                  value={metric.change}
                  onChange={(event) =>
                    updateMetric(index, "change", event.target.value)
                  }
                  placeholder="+12.4% vs last month"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="self-end"
                onClick={() => removeMetric(index)}
                disabled={formData.metrics.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Data Highlights</h2>
            <p className="text-sm text-muted-foreground">
              Summarize notable data rows or categories that appear in the
              dashboard.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={addDataPoint}>
            <Plus className="w-4 h-4 mr-2" />
            Add Row
          </Button>
        </div>

        <div className="space-y-3">
          {formData.dataPoints.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-lg border border-border p-4 md:grid-cols-[2fr_2fr_auto]"
            >
              <div className="space-y-2">
                <Label htmlFor={`datapoint-label-${index}`}>Category *</Label>
                <Input
                  id={`datapoint-label-${index}`}
                  value={item.label}
                  onChange={(event) =>
                    updateDataPoint(index, "label", event.target.value)
                  }
                  placeholder="South Region"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`datapoint-value-${index}`}>Value *</Label>
                <Input
                  id={`datapoint-value-${index}`}
                  value={item.value}
                  onChange={(event) =>
                    updateDataPoint(index, "value", event.target.value)
                  }
                  placeholder="$98,200 revenue"
                  required
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="self-end"
                onClick={() => removeDataPoint(index)}
                disabled={formData.dataPoints.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Insights & Actions</h2>
            <p className="text-sm text-muted-foreground">
              Capture the business insights and recommended follow-up actions
              generated from this analysis.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={addInsight}>
            <Plus className="w-4 h-4 mr-2" />
            Add Insight
          </Button>
        </div>

        <div className="space-y-3">
          {formData.insights.map((item, index) => (
            <div
              key={index}
              className="space-y-3 rounded-lg border border-border p-4"
            >
              <div className="space-y-2">
                <Label htmlFor={`insight-title-${index}`}>Headline *</Label>
                <Input
                  id={`insight-title-${index}`}
                  value={item.title}
                  onChange={(event) =>
                    updateInsight(index, "title", event.target.value)
                  }
                  placeholder="Churn risk concentrated in SMB segment"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`insight-detail-${index}`}>Detail *</Label>
                <Textarea
                  id={`insight-detail-${index}`}
                  value={item.detail}
                  onChange={(event) =>
                    updateInsight(index, "detail", event.target.value)
                  }
                  placeholder="SMB customers with ARR < $15k are churning at 2.5x the rate of enterprise accounts. Recommend launching a retention playbook and outreach campaign."
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeInsight(index)}
                  disabled={formData.insights.length === 1}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
};

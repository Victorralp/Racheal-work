import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUploader } from '@/components/ImageUploader';
import { Loader2 } from 'lucide-react';

export interface ProjectFormData {
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  tools: string[];
  coverImage: string;
  images: string[];
  published: boolean;
}

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  submitLabel: string;
}

export const ProjectForm = ({ initialData, onSubmit, submitLabel }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>(
    initialData || {
      title: '',
      summary: '',
      problem: '',
      solution: '',
      impact: '',
      tools: [],
      coverImage: '',
      images: [],
      published: false,
    }
  );
  const [toolsInput, setToolsInput] = useState(initialData?.tools.join(', ') || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tools = toolsInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      await onSubmit({
        ...formData,
        tools,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="Sales Performance Dashboard"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary *</Label>
        <Textarea
          id="summary"
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          required
          placeholder="Brief one-line description of the project"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="problem">Problem *</Label>
        <Textarea
          id="problem"
          value={formData.problem}
          onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
          required
          placeholder="What business problem did this solve?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="solution">What I Did (Solution) *</Label>
        <Textarea
          id="solution"
          value={formData.solution}
          onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
          required
          placeholder="Describe your approach and methodology"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="impact">Impact *</Label>
        <Textarea
          id="impact"
          value={formData.impact}
          onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
          required
          placeholder="Quantifiable business results and outcomes"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tools">Tools Used (comma-separated) *</Label>
        <Input
          id="tools"
          value={toolsInput}
          onChange={(e) => setToolsInput(e.target.value)}
          required
          placeholder="Power BI, SQL, Python, Excel"
        />
        <p className="text-xs text-muted-foreground">
          Separate tools with commas
        </p>
      </div>

      <ImageUploader
        label="Cover Image *"
        value={formData.coverImage}
        onChange={(url) => setFormData({ ...formData, coverImage: url as string })}
        multiple={false}
      />

      <ImageUploader
        label="Project Screenshots (optional)"
        value={formData.images}
        onChange={(urls) => setFormData({ ...formData, images: urls as string[] })}
        multiple={true}
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, published: checked as boolean })
          }
        />
        <Label
          htmlFor="published"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Publish immediately
        </Label>
      </div>

      <div className="flex gap-4 pt-4">
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

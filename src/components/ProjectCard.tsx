import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  id: string;
  title: string;
  summary: string;
  tools: string[];
  coverImage: string;
}

export const ProjectCard = ({ id, title, summary, tools, coverImage }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${id}`} className="group">
      <div className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-primary/50">
        <div className="aspect-video bg-secondary overflow-hidden">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <Badge key={tool} variant="secondary" className="text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

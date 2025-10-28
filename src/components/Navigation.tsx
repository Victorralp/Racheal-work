import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">
          Rachael Olarinoye
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm transition-colors ${isActive('/') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Home
          </Link>
          <Link 
            to="/interactive" 
            className={`text-sm transition-colors ${isActive('/interactive') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Interactive Demo
          </Link>
          <Link 
            to="/projects" 
            className={`text-sm transition-colors ${isActive('/projects') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Projects
          </Link>
          <Link to="/contact">
            <Button size="sm" variant="default">
              Work With Me
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

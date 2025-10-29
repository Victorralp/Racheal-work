import { ReactNode, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  LogOut,
  Globe,
  Briefcase,
  ShieldCheck,
  UserRound,
  BarChart3,
  Home as HomeIcon,
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  comingSoon?: boolean;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: 'Projects',
        to: '/admin/projects',
        icon: Briefcase,
      },
      {
        label: 'Interactive Demo',
        to: '/admin/demo-projects',
        icon: BarChart3,
      },
      {
        label: 'Homepage',
        to: '/admin/home',
        icon: HomeIcon,
      },
      {
        label: 'Profile',
        to: '/admin/profile',
        icon: UserRound,
      },
    ],
    []
  );

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col border-r border-border bg-background/90 backdrop-blur">
          <div className="px-6 py-8 border-b border-border/60">
            <Link to="/admin/projects" className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-4">Admin Control Center</p>
                <p className="text-xs text-muted-foreground">Manage your portfolio</p>
              </div>
            </Link>
            <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Signed in as</p>
                  <p className="text-xs text-muted-foreground break-all">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.to);

              return item.comingSoon ? (
                <div
                  key={item.to}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground/70 border border-dashed border-border/60"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  <span className="ml-auto text-xs uppercase tracking-wide">Soon</span>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="px-4 pb-6">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main section */}
        <div className="flex-1 flex flex-col">
          <header className="border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Admin Area</p>
                <h1 className="text-lg font-semibold">Rachael's Portfolio CMS</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/">
                    <Globe className="w-4 h-4 mr-2" />
                    View Site
                  </Link>
                </Button>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hidden sm:block">
                  Admin Access Granted
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

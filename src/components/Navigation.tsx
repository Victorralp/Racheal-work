import { Home, User, Briefcase, Zap, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Interactive", url: "/interactive", icon: Zap },
  { name: "Projects", url: "/projects", icon: Briefcase },
  { name: "Contact", url: "/contact", icon: Mail },
];

export const Navigation = () => {
  return <NavBar items={navItems} />;
};

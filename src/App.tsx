import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import Interactive from "./pages/Interactive";
import Login from "./pages/admin/Login";
import AdminProjects from "./pages/admin/Projects";
import NewProject from "./pages/admin/NewProject";
import EditProject from "./pages/admin/EditProject";
import AdminDemoProjects from "./pages/admin/DemoProjects";
import NewDemoProject from "./pages/admin/NewDemoProject";
import EditDemoProject from "./pages/admin/EditDemoProject";
import AdminProfile from "./pages/admin/Profile";
import AdminHomeSettings from "./pages/admin/HomeSettings";
import NotFound from "./pages/NotFound";
import AdminShortcutListener from "./components/AdminShortcutListener";
import { useAnimationConfig } from "./hooks/use-animation-config";

const queryClient = new QueryClient();

// Page transition wrapper component
const PageTransitionWrapper = () => {
  const location = useLocation();
  const { shouldAnimate, duration } = useAnimationConfig();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interactive" element={<Interactive />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/projects/new" element={<NewProject />} />
        <Route path="/admin/projects/:id/edit" element={<EditProject />} />
        <Route path="/admin/demo-projects" element={<AdminDemoProjects />} />
        <Route path="/admin/demo-projects/new" element={<NewDemoProject />} />
        <Route path="/admin/demo-projects/:id/edit" element={<EditDemoProject />} />
        <Route path="/admin/home" element={<AdminHomeSettings />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminShortcutListener />
          <PageTransitionWrapper />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

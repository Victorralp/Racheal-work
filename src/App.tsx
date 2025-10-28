import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
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
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

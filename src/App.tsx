import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { isFirebaseConfigured } from "@/lib/firebase";
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
// Background motion/overlays removed per request

const queryClient = new QueryClient();

const FirebaseSetupNotice = () => (
  <div className="min-h-screen bg-white flex items-center justify-center px-6">
    <div className="max-w-xl rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-3">
        Firebase setup is missing
      </h1>
      <p className="text-gray-600 leading-relaxed">
        Add your Firebase values to a local .env file, then restart the dev
        server. Without those values the admin area and project data cannot
        connect, so the app stops here instead of showing a blank screen.
      </p>
      <p className="mt-5 rounded-md bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
        Copy .env.example to .env and fill in the VITE_FIREBASE_* fields.
      </p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    {!isFirebaseConfigured ? (
      <FirebaseSetupNotice />
    ) : (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminShortcutListener />
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
            <Route path="/admin/demo-projects" element={<AdminDemoProjects />} />
            <Route path="/admin/demo-projects/new" element={<NewDemoProject />} />
            <Route path="/admin/demo-projects/:id/edit" element={<EditDemoProject />} />
            <Route path="/admin/home" element={<AdminHomeSettings />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    )}
  </QueryClientProvider>
);

export default App;

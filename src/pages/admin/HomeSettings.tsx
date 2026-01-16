import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSiteProfile, useUpdateSiteProfile } from "@/hooks/use-site-profile";
import { ImageUploader } from "@/components/ImageUploader";
import { Loader2, Save, User, FileText, Briefcase } from "lucide-react";

const AdminHomeSettings = () => {
  const { data: profile, isLoading } = useSiteProfile();
  const updateProfile = useUpdateSiteProfile();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Hero Section
    name: "Rachael Olarinoye",
    title: "Data Analyst",
    bio: "I help teams and founders transform data into clear, actionable business decisions. Building dashboards, reporting systems, and workflows that drive results.",
    headshotUrl: "",
    // Services Section
    servicesTitle: "What I Do",
    servicesSubtitle: "Helping businesses make smarter decisions through data",
    service1Title: "Data Analytics",
    service1Description: "Transform raw data into actionable insights with clear analysis and visualizations.",
    service2Title: "Dashboard Building",
    service2Description: "Create executive-ready dashboards that provide visibility into performance and trends.",
    service3Title: "Reporting Automation",
    service3Description: "Automate recurring reports and data updates to save time and improve accuracy.",
  });

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        name: profile.name || prev.name,
        title: profile.title || prev.title,
        bio: profile.bio || prev.bio,
        headshotUrl: profile.headshotUrl || "",
      }));
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        headshotUrl: formData.headshotUrl,
      });
      toast({
        title: "Settings saved",
        description: "Your homepage content has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#d4a853]" />
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Home Settings</h1>
            <p className="text-gray-500 mt-2">
              Edit the content displayed on your homepage.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hero Section */}
            <Card className="p-6 border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#d4a853]/10">
                  <User className="w-5 h-5 text-[#d4a853]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
                  <p className="text-sm text-gray-500">Your main introduction</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <ImageUploader
                    label="Profile Photo"
                    value={formData.headshotUrl}
                    onChange={(url) => setFormData((prev) => ({ ...prev, headshotUrl: typeof url === 'string' ? url : url[0] || '' }))}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="border-gray-200 focus:border-[#d4a853]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-700">Job Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      className="border-gray-200 focus:border-[#d4a853]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="border-gray-200 focus:border-[#d4a853]"
                  />
                  <p className="text-xs text-gray-400">Displayed below your title</p>
                </div>
              </div>
            </Card>

            {/* Services Section */}
            <Card className="p-6 border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-[#d4a853]/10">
                  <Briefcase className="w-5 h-5 text-[#d4a853]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Services Section</h2>
                  <p className="text-sm text-gray-500">What you offer</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-gray-700">Section Title</Label>
                    <Input
                      value={formData.servicesTitle}
                      onChange={(e) => setFormData((prev) => ({ ...prev, servicesTitle: e.target.value }))}
                      className="border-gray-200 focus:border-[#d4a853]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Section Subtitle</Label>
                    <Input
                      value={formData.servicesSubtitle}
                      onChange={(e) => setFormData((prev) => ({ ...prev, servicesSubtitle: e.target.value }))}
                      className="border-gray-200 focus:border-[#d4a853]"
                    />
                  </div>
                </div>

                {/* Service 1 */}
                <div className="p-4 border rounded-lg border-gray-200 space-y-3">
                  <Label className="text-gray-700 font-medium">Service 1: Data Analytics</Label>
                  <Input
                    value={formData.service1Title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, service1Title: e.target.value }))}
                    placeholder="Title"
                    className="border-gray-200"
                  />
                  <Textarea
                    value={formData.service1Description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, service1Description: e.target.value }))}
                    placeholder="Description"
                    rows={2}
                    className="border-gray-200"
                  />
                </div>

                {/* Service 2 */}
                <div className="p-4 border rounded-lg border-gray-200 space-y-3">
                  <Label className="text-gray-700 font-medium">Service 2: Dashboard Building</Label>
                  <Input
                    value={formData.service2Title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, service2Title: e.target.value }))}
                    placeholder="Title"
                    className="border-gray-200"
                  />
                  <Textarea
                    value={formData.service2Description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, service2Description: e.target.value }))}
                    placeholder="Description"
                    rows={2}
                    className="border-gray-200"
                  />
                </div>

                {/* Service 3 */}
                <div className="p-4 border rounded-lg border-gray-200 space-y-3">
                  <Label className="text-gray-700 font-medium">Service 3: Reporting Automation</Label>
                  <Input
                    value={formData.service3Title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, service3Title: e.target.value }))}
                    placeholder="Title"
                    className="border-gray-200"
                  />
                  <Textarea
                    value={formData.service3Description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, service3Description: e.target.value }))}
                    placeholder="Description"
                    rows={2}
                    className="border-gray-200"
                  />
                </div>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="p-4 border-[#d4a853]/30 bg-[#d4a853]/5">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#d4a853] mt-0.5" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">Note</p>
                  <p>Projects are managed in the Projects section. Testimonials and skills carousel are configured in the codebase.</p>
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={updateProfile.isPending}
                className="bg-[#d4a853] hover:bg-[#b8923f] text-white px-8"
              >
                {updateProfile.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
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

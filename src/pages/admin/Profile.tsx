import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/AdminGuard";
import { AdminLayout } from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/ImageUploader";
import {
  useSiteProfile,
  useUpdateSiteProfile,
} from "@/hooks/use-site-profile";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCcw } from "lucide-react";

const AdminProfile = () => {
  const { data: profile, isLoading } = useSiteProfile();
  const updateProfile = useUpdateSiteProfile();
  const { toast } = useToast();
  const [headshotUrl, setHeadshotUrl] = useState<string>("");

  useEffect(() => {
    if (profile) {
      setHeadshotUrl(profile.headshotUrl || "");
    }
  }, [profile]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProfile.mutate(
      { headshotUrl },
      {
        onSuccess: () => {
          toast({
            title: "Profile updated",
            description: "Your headshot has been saved.",
          });
        },
        onError: (error: unknown) => {
          const message = error instanceof Error ? error.message : "Failed to save profile image.";
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          });
        },
      },
    );
  };

  const resetForm = () => {
    setHeadshotUrl(profile?.headshotUrl || "");
  };

  const isSaving = updateProfile.isPending;

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="max-w-3xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">
              Update the headshot that appears on your public homepage.
            </p>
          </div>

          <Card className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Headshot</h2>
                  <p className="text-sm text-muted-foreground">
                    Upload a clear photo of yourself. This image is shown on the
                    hero section of your site.
                  </p>
                </div>

                <ImageUploader
                  label="Profile Photo"
                  value={headshotUrl}
                  onChange={(url) => setHeadshotUrl(url as string)}
                  multiple={false}
                />

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={isSaving}
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
};

export default AdminProfile;

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
  // ADD shape, size, placement state hooks
  const [profilePositionX, setProfilePositionX] = useState<number>(profile?.profilePositionX ?? 0);
  const [profilePositionY, setProfilePositionY] = useState<number>(profile?.profilePositionY ?? 0);
  const [zoom, setZoom] = useState<number>(1);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  // Add state
  const [heroBgUrl, setHeroBgUrl] = useState<string>(profile?.heroBgUrl || "");

  useEffect(() => {
    if (profile) {
      setHeadshotUrl(profile.headshotUrl || "");
      setHeroBgUrl(profile.heroBgUrl || "");
      setProfilePositionX(profile?.profilePositionX ?? 0);
      setProfilePositionY(profile?.profilePositionY ?? 0);
    }
  }, [profile]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProfile.mutate(
      {
        headshotUrl,
        heroBgUrl,
        profilePositionX,
        profilePositionY
      },
      {
        onSuccess: () => {
          toast({
            title: "Profile updated",
            description: "Your headshot and settings have been saved.",
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
    setHeroBgUrl(profile?.heroBgUrl || "");
    setProfilePositionX(profile?.profilePositionX ?? 0);
    setProfilePositionY(profile?.profilePositionY ?? 0);
  };

  const isSaving = updateProfile.isPending;

  const imgSize = 'h-60 w-60 md:h-72 md:w-72 min-w-[240px] min-h-[240px]';
  const previewSize = 'w-72 h-72 md:w-80 md:h-80';

  console.log('Preview heroBgUrl:', heroBgUrl);

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

                {/* NEW: Shape, Size, Placement Controls */}
                <div className="grid md:grid-cols-3 gap-4 pt-6">
                  <div>
                    <label htmlFor="profilePositionX" className="block text-sm font-medium mb-1">X Offset ({profilePositionX}%)</label>
                    <input
                      type="range"
                      id="profilePositionX"
                      min={-50} max={50} step={1}
                      value={profilePositionX}
                      onChange={e => setProfilePositionX(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="profilePositionY" className="block text-sm font-medium mb-1">Y Offset ({profilePositionY}%)</label>
                    <input
                      type="range"
                      id="profilePositionY"
                      min={-50} max={50} step={1}
                      value={profilePositionY}
                      onChange={e => setProfilePositionY(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>

                {/* NEW: Zoom, OffsetX, OffsetY Controls */}
                <div className="flex flex-col md:flex-row gap-4 pt-6">
                  <div className="flex-1">
                    <label htmlFor="zoom" className="block text-sm font-medium mb-1">Zoom</label>
                    <input
                      type="range"
                      id="zoom"
                      min={1}
                      max={2}
                      step={0.01}
                      value={zoom}
                      onChange={e => setZoom(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="text-xs text-right text-muted-foreground">{zoom.toFixed(2)}x</div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="offsetX" className="block text-sm font-medium mb-1">Left / Right</label>
                    <input
                      type="range"
                      id="offsetX"
                      min={-50}
                      max={50}
                      step={1}
                      value={offsetX}
                      onChange={e => setOffsetX(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="text-xs text-right text-muted-foreground">{offsetX}%</div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="offsetY" className="block text-sm font-medium mb-1">Up / Down</label>
                    <input
                      type="range"
                      id="offsetY"
                      min={-50}
                      max={50}
                      step={1}
                      value={offsetY}
                      onChange={e => setOffsetY(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="text-xs text-right text-muted-foreground">{offsetY}%</div>
                  </div>
                </div>

                {/* NEW: Hero Background Image Uploader */}
                <div className="space-y-2 pt-8">
                  <h2 className="text-lg font-semibold">Hero Background Image</h2>
                  <p className="text-sm text-muted-foreground">Upload a background image for the main hero section.</p>
                  <ImageUploader
                    label="Hero Background"
                    value={heroBgUrl}
                    onChange={url => {
                      console.log('Uploader returned:', url);
                      setHeroBgUrl(url as string);
                    }}
                    multiple={false}
                  />
                  <div className="mt-4 relative w-full max-w-lg aspect-[3/1] bg-background border border-primary/30 rounded-xl overflow-hidden">
                    {heroBgUrl ? (
                      <img src={heroBgUrl} alt="Hero background preview" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/60">No image</div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-60" />
                    <span className="absolute bottom-2 left-3 text-xs bg-primary/80 text-white px-2 py-1 rounded-lg pointer-events-none">Preview</span>
                  </div>
                </div>

                <div className="py-8 flex flex-col items-center">
                  <span className="text-primary mb-3 self-start">Preview</span>
                  <div className="flex justify-center items-center">
                    <div
                      className="relative rounded-full overflow-hidden w-72 h-72 md:w-80 md:h-80"
                      style={{
                        boxShadow: '0 0 48px 0px rgba(0,212,255,0.45), 0 4px 16px 0 rgba(0,0,0,0.6)',
                        border: '3.5px solid #00d4ff',
                        background: 'rgba(15,25,40,0.4)',
                      }}
                    >
                      <img
                        src={headshotUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                        style={{
                          backgroundColor: 'white',
                          transform: `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`,
                          transition: 'transform 0.2s'
                        }}
                      />
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          boxShadow: '0 0 48px 8px rgba(0,212,255,0.38)',
                          animation: 'pulse-glow 2.6s infinite cubic-bezier(.4,0,.6,1)',
                          zIndex: 2,
                          borderRadius: '9999px',
                          border: '2px solid #00d4ff'
                        }}
                      />
                    </div>
                  </div>
                </div>

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

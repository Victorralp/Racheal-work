import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string | string[];
  onChange: (url: string | string[]) => void;
  multiple?: boolean;
}

export const ImageUploader = ({ label, value, onChange, multiple = false }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration is missing. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      if (multiple) {
        const uploadPromises = Array.from(files).map(file => uploadToCloudinary(file));
        const urls = await Promise.all(uploadPromises);
        const currentUrls = Array.isArray(value) ? value : [];
        onChange([...currentUrls, ...urls]);
      } else {
        const url = await uploadToCloudinary(files[0]);
        onChange(url);
      }

      toast({
        title: 'Success',
        description: 'Image(s) uploaded successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index?: number) => {
    if (multiple && Array.isArray(value) && typeof index === 'number') {
      const newUrls = value.filter((_, i) => i !== index);
      onChange(newUrls);
    } else {
      onChange(multiple ? [] : '');
    }
  };

  const urls = multiple ? (Array.isArray(value) ? value : []) : (value ? [value as string] : []);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {/* Preview */}
      {urls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {urls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(multiple ? index : undefined)}
                className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id={`file-upload-${label}`}
        />
        <Label
          htmlFor={`file-upload-${label}`}
          className="cursor-pointer"
        >
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            asChild
          >
            <span>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {multiple ? 'Upload Images' : 'Upload Image'}
                </>
              )}
            </span>
          </Button>
        </Label>
      </div>
    </div>
  );
};

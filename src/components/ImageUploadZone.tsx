import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Camera, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  angle: string;
}

interface ImageUploadZoneProps {
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

const VEHICLE_ANGLES = [
  "Front View",
  "Rear View", 
  "Driver Side",
  "Passenger Side",
  "Dashboard/Interior"
];

const ImageUploadZone = ({ onImagesChange, maxImages = 5 }: ImageUploadZoneProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: UploadedImage[] = acceptedFiles.slice(0, maxImages - uploadedImages.length).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      angle: VEHICLE_ANGLES[uploadedImages.length] || "Additional View"
    }));

    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    onImagesChange(updatedImages);
    
    toast.success(`${newImages.length} image${newImages.length > 1 ? 's' : ''} uploaded successfully`);
  }, [uploadedImages, maxImages, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxImages,
    disabled: uploadedImages.length >= maxImages
  });

  const removeImage = (id: string) => {
    const updatedImages = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(updatedImages);
    onImagesChange(updatedImages);
    toast.success("Image removed");
  };

  const updateImageAngle = (id: string, angle: string) => {
    const updatedImages = uploadedImages.map(img => 
      img.id === id ? { ...img, angle } : img
    );
    setUploadedImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-6">
      {uploadedImages.length < maxImages && (
        <Card className="border-2 border-dashed border-primary/20 bg-gradient-card transition-all duration-300 hover:border-primary/40">
          <div
            {...getRootProps()}
            className={`p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragActive ? 'bg-primary/5 border-primary/60' : ''
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                {isDragActive ? (
                  <Upload className="h-8 w-8 text-primary animate-bounce" />
                ) : (
                  <Camera className="h-8 w-8 text-primary" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {isDragActive ? "Drop images here" : "Upload Vehicle Photos"}
                </h3>
                <p className="text-muted-foreground mt-1">
                  Drag & drop or click to select images ({uploadedImages.length}/{maxImages})
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, PNG, WebP up to 10MB each
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedImages.map((image, index) => (
            <Card key={image.id} className="overflow-hidden bg-gradient-card shadow-card hover:shadow-float transition-all duration-300">
              <div className="relative">
                <img
                  src={image.preview}
                  alt={`Vehicle ${image.angle}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute bottom-2 left-2 right-2">
                  <select
                    value={image.angle}
                    onChange={(e) => updateImageAngle(image.id, e.target.value)}
                    className="w-full bg-white/90 text-foreground text-sm rounded px-2 py-1 border-none focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {VEHICLE_ANGLES.map((angle) => (
                      <option key={angle} value={angle}>
                        {angle}
                      </option>
                    ))}
                    <option value="Additional View">Additional View</option>
                  </select>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={uploadedImages[selectedImageIndex].preview}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={() => setSelectedImageIndex(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone;
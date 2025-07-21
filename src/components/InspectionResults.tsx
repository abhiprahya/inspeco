import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle, Eye, Download, Share2 } from "lucide-react";

interface DamageDetection {
  id: string;
  type: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  imageIndex: number;
  severity: 'low' | 'medium' | 'high';
}

interface InspectionResultsProps {
  results: DamageDetection[];
  images: Array<{ preview: string; angle: string }>;
  onGenerateReport: () => void;
}

const InspectionResults = ({ results, images, onGenerateReport }: InspectionResultsProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const damagesByImage = results.reduce((acc, damage) => {
    if (!acc[damage.imageIndex]) acc[damage.imageIndex] = [];
    acc[damage.imageIndex].push(damage);
    return acc;
  }, {} as Record<number, DamageDetection[]>);

  const totalDamages = results.length;
  const highSeverityCount = results.filter(r => r.severity === 'high').length;
  const averageConfidence = results.length > 0 
    ? results.reduce((sum, r) => sum + r.confidence, 0) / results.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Damages</p>
              <p className="text-2xl font-bold text-foreground">{totalDamages}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-warning" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
              <p className="text-2xl font-bold text-destructive">{highSeverityCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Confidence</p>
              <p className="text-2xl font-bold text-success">{Math.round(averageConfidence * 100)}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
        </Card>
      </div>

      {/* Image Analysis */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          Damage Detection Overview
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {images.map((image, index) => {
            const imageDamages = damagesByImage[index] || [];
            return (
              <div key={index} className="space-y-3">
                <div className="relative">
                  <img
                    src={image.preview}
                    alt={image.angle}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage(index)}
                  />
                  
                  {/* Damage overlays */}
                  {imageDamages.map((damage) => (
                    <div
                      key={damage.id}
                      className="absolute border-2 border-destructive bg-destructive/20 rounded"
                      style={{
                        left: `${(damage.x / 100) * 100}%`,
                        top: `${(damage.y / 100) * 100}%`,
                        width: `${damage.width / 100 * 100}%`,
                        height: `${damage.height / 100 * 100}%`,
                      }}
                    >
                      <span className="absolute -top-6 left-0 bg-destructive text-destructive-foreground text-xs px-1 rounded">
                        {damage.type}
                      </span>
                    </div>
                  ))}
                  
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {image.angle}
                  </div>
                  
                  {imageDamages.length > 0 && (
                    <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded">
                      {imageDamages.length} issue{imageDamages.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Detailed Results Table */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <h3 className="text-lg font-semibold mb-4">Detailed Damage Report</h3>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Damage Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((damage) => (
                <TableRow key={damage.id}>
                  <TableCell className="font-medium">{damage.type}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(damage.severity)} className="flex items-center w-fit">
                      {getSeverityIcon(damage.severity)}
                      <span className="ml-1 capitalize">{damage.severity}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{Math.round(damage.confidence * 100)}%</TableCell>
                  <TableCell>
                    x: {Math.round(damage.x)}, y: {Math.round(damage.y)}
                  </TableCell>
                  <TableCell>{images[damage.imageIndex]?.angle || 'Unknown'}</TableCell>
                </TableRow>
              ))}
              {results.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    <CheckCircle className="mx-auto h-12 w-12 text-success mb-2" />
                    No damages detected! Vehicle appears to be in good condition.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={onGenerateReport}
          className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          <Download className="mr-2 h-5 w-5" />
          Generate PDF Report
        </Button>
        
        <Button 
          variant="outline"
          className="flex-1"
          size="lg"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share Results
        </Button>
      </div>

      {/* Image Preview Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={images[selectedImage].preview}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Damage overlays for modal */}
            {(damagesByImage[selectedImage] || []).map((damage) => (
              <div
                key={damage.id}
                className="absolute border-2 border-destructive bg-destructive/30 rounded"
                style={{
                  left: `${damage.x}%`,
                  top: `${damage.y}%`,
                  width: `${damage.width}%`,
                  height: `${damage.height}%`,
                }}
              >
                <span className="absolute -top-8 left-0 bg-destructive text-destructive-foreground text-sm px-2 py-1 rounded">
                  {damage.type} ({Math.round(damage.confidence * 100)}%)
                </span>
              </div>
            ))}
            
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={() => setSelectedImage(null)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionResults;
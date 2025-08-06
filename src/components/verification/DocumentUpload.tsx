import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Check, X, Eye } from 'lucide-react';

interface DocumentUploadProps {
  documentType: 'id_card' | 'drivers_license' | 'passport' | 'vehicle_registration' | 'insurance' | 'selfie';
  title: string;
  description: string;
  currentDocument?: {
    url: string;
    status: 'pending' | 'verified' | 'rejected';
    rejectionReason?: string;
  };
  onUpload: (file: File, type: string) => Promise<void>;
  required?: boolean;
}

export const DocumentUpload = ({ 
  documentType, 
  title, 
  description, 
  currentDocument, 
  onUpload,
  required = false 
}: DocumentUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      await onUpload(file, documentType);
      toast({
        title: "Document uploaded",
        description: "Your document has been uploaded and is being verified.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getStatusBadge = () => {
    if (!currentDocument) return null;
    
    switch (currentDocument.status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800"><Check className="h-3 w-3 mr-1" />Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title} {required && <span className="text-red-500">*</span>}</CardTitle>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {currentDocument ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <div className="flex-1">
                <p className="font-medium">Document uploaded</p>
                <p className="text-sm text-muted-foreground">
                  {currentDocument.status === 'pending' && 'Being reviewed by our team'}
                  {currentDocument.status === 'verified' && 'Successfully verified'}
                  {currentDocument.status === 'rejected' && currentDocument.rejectionReason}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full"
            >
              {uploading ? "Uploading..." : "Replace Document"}
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full h-24 border-dashed"
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-6 w-6" />
              <span>{uploading ? "Uploading..." : "Upload Document"}</span>
            </div>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
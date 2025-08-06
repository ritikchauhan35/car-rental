import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DocumentUpload } from '@/components/verification/DocumentUpload';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Car, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VehicleVerification = () => {
  const [documents, setDocuments] = useState<Record<string, any>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDocumentUpload = async (file: File, type: string) => {
    // In a real app, this would upload to Firebase Storage and save to Firestore
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDocuments(prev => ({
      ...prev,
      [type]: {
        url: URL.createObjectURL(file),
        status: 'pending',
      }
    }));
  };

  const requiredDocuments = [
    {
      type: 'vehicle_registration' as const,
      title: 'Vehicle Registration',
      description: 'Upload your current vehicle registration document',
      required: true,
    },
    {
      type: 'insurance' as const,
      title: 'Insurance Certificate',
      description: 'Upload current insurance certificate or policy document',
      required: true,
    },
  ];

  const progress = (Object.keys(documents).length / requiredDocuments.length) * 100;
  const canProceed = Object.keys(documents).length === requiredDocuments.length;

  const handleSubmit = async () => {
    if (!canProceed) return;

    try {
      // In a real app, this would submit for verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Documents submitted",
        description: "Your vehicle documents have been submitted for verification. You'll receive an update within 24 hours.",
      });
      
      navigate('/owner/dashboard');
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your documents. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Vehicle Owner Verification</h1>
                <p className="text-muted-foreground">Verify your vehicle ownership to start renting</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Verification Progress</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Upload all required documents to complete your vehicle verification
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requiredDocuments.map((doc) => (
              <DocumentUpload
                key={doc.type}
                documentType={doc.type}
                title={doc.title}
                description={doc.description}
                currentDocument={documents[doc.type]}
                onUpload={handleDocumentUpload}
                required={doc.required}
              />
            ))}
          </div>

          {/* Requirements Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Vehicle registration must be current and in your name</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Insurance certificate must be valid and cover the rental period</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>All documents must be clearly visible and readable</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Verification process takes 1-3 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Notice */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Shield className="h-5 w-5" />
                Safety & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-700">
                By submitting these documents, you confirm that you are the legal owner of the vehicle 
                and that it meets all safety and legal requirements for rental. Your vehicle may be 
                subject to inspection before approval.
              </p>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmit}
              disabled={!canProceed}
              size="lg"
            >
              Submit for Verification
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
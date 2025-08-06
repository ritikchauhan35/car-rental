import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Smartphone, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const { toast } = useToast();

  const generateQRCode = () => {
    // In a real app, this would generate an actual QR code
    const secret = "JBSWY3DPEHPK3PXP"; // Example secret
    const appName = "VehicleRental";
    const accountName = "user@example.com";
    const qrString = `otpauth://totp/${appName}:${accountName}?secret=${secret}&issuer=${appName}`;
    setQrCode(qrString);
    setIsVerifying(true);
  };

  const verifyCode = () => {
    // In a real app, this would verify the code with your backend
    if (verificationCode.length === 6) {
      setIsEnabled(true);
      setIsVerifying(false);
      toast({
        title: "Two-Factor Authentication Enabled",
        description: "Your account is now more secure with 2FA.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
    }
  };

  const disable2FA = () => {
    setIsEnabled(false);
    setIsVerifying(false);
    setVerificationCode("");
    setQrCode("");
    toast({
      title: "Two-Factor Authentication Disabled",
      description: "2FA has been disabled for your account.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Two-Factor Authentication
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isEnabled && !isVerifying && (
          <div className="space-y-4">
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication adds an extra layer of security by requiring a code from your phone in addition to your password.
              </AlertDescription>
            </Alert>
            
            <Button onClick={generateQRCode} className="w-full">
              <Key className="h-4 w-4 mr-2" />
              Enable Two-Factor Authentication
            </Button>
          </div>
        )}

        {isVerifying && (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                1. Install an authenticator app (Google Authenticator, Authy, etc.)
                <br />
                2. Scan the QR code or enter this secret: JBSWY3DPEHPK3PXP
                <br />
                3. Enter the 6-digit code from your app below
              </AlertDescription>
            </Alert>

            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">QR Code would appear here</p>
              <div className="bg-white p-4 inline-block rounded">
                <p className="text-xs">QR Code: {qrCode.substring(0, 50)}...</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={verifyCode} disabled={verificationCode.length !== 6}>
                Verify & Enable
              </Button>
              <Button variant="outline" onClick={() => setIsVerifying(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {isEnabled && (
          <div className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication is enabled. Your account is protected with an additional security layer.
              </AlertDescription>
            </Alert>
            
            <Button variant="destructive" onClick={disable2FA}>
              Disable Two-Factor Authentication
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
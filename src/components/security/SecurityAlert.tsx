import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle, Clock } from "lucide-react";
import { useSecurity } from "./SecurityProvider";

export const SecurityAlert = () => {
  const { isBlocked, loginAttempts, sessionTimeout } = useSecurity();

  if (isBlocked) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Account Temporarily Blocked</AlertTitle>
        <AlertDescription>
          Too many failed login attempts. Please wait 15 minutes before trying again.
        </AlertDescription>
      </Alert>
    );
  }

  if (loginAttempts > 2) {
    return (
      <Alert variant="destructive" className="mb-4">
        <Shield className="h-4 w-4" />
        <AlertTitle>Security Warning</AlertTitle>
        <AlertDescription>
          {5 - loginAttempts} login attempts remaining before account is temporarily blocked.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export const SessionTimer = () => {
  const { sessionTimeout } = useSecurity();
  const timeoutMinutes = Math.floor(sessionTimeout / (1000 * 60));

  return (
    <Alert className="mb-4">
      <Clock className="h-4 w-4" />
      <AlertTitle>Session Security</AlertTitle>
      <AlertDescription>
        Your session will automatically expire after {timeoutMinutes} minutes of inactivity for security.
      </AlertDescription>
    </Alert>
  );
};
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface PasswordStrengthMeterProps {
  password: string;
  onStrengthChange?: (strength: number) => void;
}

export const PasswordStrengthMeter = ({ password, onStrengthChange }: PasswordStrengthMeterProps) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    const calculateStrength = (pwd: string) => {
      let score = 0;
      const suggestions: string[] = [];

      if (pwd.length === 0) {
        setStrength(0);
        setFeedback([]);
        onStrengthChange?.(0);
        return;
      }

      // Length check
      if (pwd.length >= 8) {
        score += 20;
      } else {
        suggestions.push("Use at least 8 characters");
      }

      // Uppercase letters
      if (/[A-Z]/.test(pwd)) {
        score += 20;
      } else {
        suggestions.push("Add uppercase letters");
      }

      // Lowercase letters
      if (/[a-z]/.test(pwd)) {
        score += 20;
      } else {
        suggestions.push("Add lowercase letters");
      }

      // Numbers
      if (/\d/.test(pwd)) {
        score += 20;
      } else {
        suggestions.push("Add numbers");
      }

      // Special characters
      if (/[^A-Za-z0-9]/.test(pwd)) {
        score += 20;
      } else {
        suggestions.push("Add special characters (!@#$%^&*)");
      }

      setStrength(score);
      setFeedback(suggestions);
      onStrengthChange?.(score);
    };

    calculateStrength(password);
  }, [password, onStrengthChange]);

  const getStrengthLabel = () => {
    if (strength === 0) return { label: "", color: "secondary" };
    if (strength <= 40) return { label: "Weak", color: "destructive" };
    if (strength <= 60) return { label: "Fair", color: "secondary" };
    if (strength <= 80) return { label: "Good", color: "default" };
    return { label: "Strong", color: "default" };
  };

  const strengthInfo = getStrengthLabel();

  if (password.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Progress value={strength} className="flex-1" />
        <Badge variant={strengthInfo.color as any}>
          {strengthInfo.label}
        </Badge>
      </div>
      
      {feedback.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <p className="font-medium">To improve password strength:</p>
          <ul className="list-disc list-inside space-y-1">
            {feedback.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
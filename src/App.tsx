import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SecurityProvider } from "@/components/security/SecurityProvider";
import { Header } from "@/components/Header";
import { Landing } from "./pages/Landing";
import { Browse } from "./pages/Browse";
import { HowItWorks } from "./pages/HowItWorks";
import { OwnerDashboard } from "./pages/owner/OwnerDashboard";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { AddVehicle } from "./pages/owner/AddVehicle";
import { Bookings } from "./pages/owner/Bookings";
import { Analytics } from "./pages/owner/Analytics";
import { EditVehicle } from "./pages/owner/EditVehicle";
import { OwnerProfile } from "./pages/owner/OwnerProfile";
import { VehicleDetail } from "./pages/VehicleDetail";
import { Profile } from "./pages/Profile";
import { Security } from "./pages/Security";
import { PersonalVerification } from "./pages/verification/PersonalVerification";
import { VehicleVerification } from "./pages/verification/VehicleVerification";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vehicle-rental-theme">
      <AuthProvider>
        <SecurityProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/vehicle/:id" element={<VehicleDetail />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/owner/dashboard" element={
                <ProtectedRoute>
                  <OwnerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/owner/add-vehicle" element={
                <ProtectedRoute>
                  <AddVehicle />
                </ProtectedRoute>
              } />
              <Route path="/owner/bookings" element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              } />
              <Route path="/owner/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/owner/edit-vehicle/:id" element={
                <ProtectedRoute>
                  <EditVehicle />
                </ProtectedRoute>
              } />
              <Route path="/owner/profile" element={
                <ProtectedRoute>
                  <OwnerProfile />
                </ProtectedRoute>
              } />
              <Route path="/security" element={
                <ProtectedRoute>
                  <Security />
                </ProtectedRoute>
              } />
              <Route path="/verification/personal" element={
                <ProtectedRoute>
                  <PersonalVerification />
                </ProtectedRoute>
              } />
              <Route path="/verification/vehicle" element={
                <ProtectedRoute>
                  <VehicleVerification />
                </ProtectedRoute>
              } />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </SecurityProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Car, Menu, X, LogOut, User, Shield } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  
  const navigation = [
    { name: "Browse", href: "/browse" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "List Your Vehicle", href: "/owner/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">RentFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex flex-col items-start">
                  <div className="font-medium">{currentUser.displayName || 'User'}</div>
                  <div className="text-xs text-muted-foreground">{currentUser.email}</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/owner/dashboard" className="flex items-center">
                    <Car className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/security" className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t space-y-2">
              {currentUser ? (
                <>
                  <div className="px-4 py-2 text-sm">
                    <div className="font-medium">{currentUser.displayName || 'User'}</div>
                    <div className="text-xs text-muted-foreground">{currentUser.email}</div>
                  </div>
                  <Button variant="ghost" asChild className="w-full justify-start">
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="w-full justify-start">
                    <Link to="/owner/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Car className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="w-full justify-start">
                    <Link to="/security" onClick={() => setMobileMenuOpen(false)}>
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="w-full justify-start">
                    <Link to="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
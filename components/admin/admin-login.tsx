"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        onLogin();
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(null);
  };

  return (
    <div className="from-background to-muted/5 via-background min-h-screen flex justify-center items-center bg-gradient-to-br">
      <Card className="bg-card/80 w-full max-w-md border-0 shadow-2xl backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="bg-primary/10 mx-auto w-16 h-16 flex justify-center items-center mb-6 rounded-2xl">
            <Lock className="text-primary w-8 h-8" />
          </div>
          <CardTitle className="mb-2 text-3xl font-bold">
            Admin Access
          </CardTitle>
          <p className="text-muted-foreground leading-relaxed">
            Sign in with your admin credentials to access the boss management
            system
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-center gap-2 p-3 rounded-lg border">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative mt-2">
                <Mail className="-translate-y-1/2 text-muted-foreground transform w-4 h-4 absolute left-3 top-1/2" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="admin@example.com"
                  className="h-12 pl-10"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative mt-2">
                <Lock className="-translate-y-1/2 text-muted-foreground transform w-4 h-4 absolute left-3 top-1/2" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="h-12 pr-10 pl-10"
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="-translate-y-1/2 transform w-10 h-10 absolute right-1 top-1/2 p-0 hover:bg-muted"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="text-muted-foreground w-4 h-4" />
                  ) : (
                    <Eye className="text-muted-foreground w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="border-border/50 pt-6 mt-8 border-t">
            <div className="text-center">
              <Badge
                variant="secondary"
                className="bg-muted/50 text-muted-foreground mb-3"
              >
                Admin Access Required
              </Badge>
              <p className="text-muted-foreground/70 text-xs leading-relaxed">
                Only authorized administrators can access the boss management
                system. Contact the system administrator for access credentials.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

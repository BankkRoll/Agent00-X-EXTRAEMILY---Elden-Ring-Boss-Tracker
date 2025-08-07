"use client";

import { RefreshCw } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="from-background to-muted/5 via-background min-h-screen flex justify-center items-center bg-gradient-to-br">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <RefreshCw className="text-primary w-12 h-12 animate-spin" />
          <div className="bg-primary/20 absolute inset-0 rounded-full animate-ping"></div>
        </div>
        <p className="text-muted-foreground text-sm font-medium">
          Loading the journey...
        </p>
      </div>
    </div>
  );
}

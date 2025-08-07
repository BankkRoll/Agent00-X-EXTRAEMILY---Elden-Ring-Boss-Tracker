"use client";

import { Clock, Heart } from "lucide-react";

export function FooterSection() {
  return (
    <div className="py-12 text-center">
      <div className="flex flex-col justify-center items-center gap-4 md:gap-6 sm:flex-row">
        <div className="text-muted-foreground/60 flex items-center gap-2 text-xs">
          <span>
            Developed by{" "}
            <a
              href="https://x.com/bankkroll_eth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bankk
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

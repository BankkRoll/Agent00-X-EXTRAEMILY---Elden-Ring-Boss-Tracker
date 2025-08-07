"use client";

import { Boss } from "@/lib/database.types";

import { BossCard } from "./boss-card";

interface BossGridProps {
  bosses: Boss[];
  onWatchClip: (clipUrl: string) => void;
}

export function BossGrid({ bosses, onWatchClip }: BossGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
      {bosses.map((boss) => (
        <BossCard key={boss.id} boss={boss} onWatchClip={onWatchClip} />
      ))}
    </div>
  );
}

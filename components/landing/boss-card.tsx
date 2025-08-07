"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  ExternalLink,
  Play,
  Skull,
  Target,
  Trophy,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Boss } from "@/lib/database.types";

interface BossCardProps {
  boss: Boss;
  onWatchClip?: (clipUrl: string) => void;
}

export function BossCard({ boss, onWatchClip }: BossCardProps) {
  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 shadow-sm";
      case "In Progress":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400 shadow-sm";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-500/20 dark:text-slate-400 shadow-sm";
    }
  };

  const formatDuration = (start: string | null, end: string | null) => {
    if (!start || !end) return null;

    const [startH, startM, startS] = start.split(":").map(Number);
    const [endH, endM, endS] = end.split(":").map(Number);

    const startTotal = startH * 3600 + startM * 60 + startS;
    const endTotal = endH * 3600 + endM * 60 + endS;

    const duration = endTotal - startTotal;
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const duration = formatDuration(boss.start_time, boss.end_time);

  const handleWatchClip = () => {
    if (boss.clip_link && onWatchClip) {
      onWatchClip(boss.clip_link);
    }
  };

  return (
    <Card className="border-border/50 from-card/50 to-card/30 overflow-hidden relative bg-gradient-to-br border backdrop-blur-sm transition-all duration-300 group hover:border-border/80 hover:shadow-primary/5 hover:shadow-lg">
      <div className="from-primary/5 to-secondary/5 via-transparent absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100" />

      <CardContent className="relative z-10 p-0">
        {/* Header */}
        <div className="border-border/30 p-4 pb-3 border-b">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="text-foreground text-lg font-semibold truncate drop-shadow-sm transition-colors group-hover:text-primary">
                {boss.name}
              </h3>
            </div>
            <Badge
              variant="outline"
              className={`${getStatusColor(boss.status)} shrink-0 text-xs font-medium px-2 py-0.5 transition-all duration-300 hover:shadow-md`}
            >
              {boss.status || "Not Started"}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-3">
          {boss.status === "Completed" ? (
            <div className="space-y-4">
              {/* Duration & Stats Row */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {duration && (
                  <div className="bg-emerald-500/5 border-emerald-500/10 flex items-center gap-2 p-2 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md">
                    <Clock className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0 flex-1">
                      <div className="text-muted-foreground text-xs">
                        Duration
                      </div>
                      <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {duration}
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-primary/5 border-primary/10 flex items-center gap-2 p-2 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md">
                  <Trophy className="text-primary w-4 h-4 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-muted-foreground text-xs">Status</div>
                    <div className="text-primary text-sm font-semibold">
                      Victory
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Levels */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>Levels</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emily</span>
                      <span className="text-primary font-medium">
                        Lv.{boss.level_emily || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Agent</span>
                      <span className="text-primary font-medium">
                        Lv.{boss.level_agent || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deaths */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Skull className="w-3 h-3" />
                    <span>Deaths</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emily</span>
                      <span className="text-destructive font-medium">
                        {boss.death_count_emily || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Agent</span>
                      <span className="text-destructive font-medium">
                        {boss.death_count_agent || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clip Actions */}
              {boss.clip_link && (
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="bg-primary h-8 flex-1 text-xs font-medium shadow-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-md"
                    onClick={handleWatchClip}
                  >
                    <Play className="w-3 h-3 mr-1.5" />
                    Watch
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0 shadow-sm transition-all duration-300 hover:shadow-md"
                    asChild
                  >
                    <a
                      href={boss.clip_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ) : boss.status === "In Progress" ? (
            <div className="space-y-4">
              {/* Status Row */}
              <div className="bg-amber-500/5 border-amber-500/10 flex items-center gap-2 p-2 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md">
                <Target className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <div className="min-w-0 flex-1">
                  <div className="text-muted-foreground text-xs">Status</div>
                  <div className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    In Progress
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Levels */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>Levels</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emily</span>
                      <span className="text-primary font-medium">
                        Lv.{boss.level_emily || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Agent</span>
                      <span className="text-primary font-medium">
                        Lv.{boss.level_agent || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deaths */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Skull className="w-3 h-3" />
                    <span>Deaths</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emily</span>
                      <span className="text-destructive font-medium">
                        {boss.death_count_emily || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Agent</span>
                      <span className="text-destructive font-medium">
                        {boss.death_count_agent || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <Skull className="text-muted-foreground/50 mx-auto w-8 h-8 mb-2 drop-shadow-sm" />
              <p className="text-muted-foreground text-xs">
                Awaiting challenge
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

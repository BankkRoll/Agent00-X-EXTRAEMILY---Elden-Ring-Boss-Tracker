"use client";

import { Crown, ExternalLink, Skull, Sword, Target, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Boss } from "@/lib/database.types";

import { TwitchIcon } from "./twitch-icon";

interface HeroSectionProps {
  bosses: Boss[];
}

export function HeroSection({ bosses }: HeroSectionProps) {
  const completed = bosses.filter((boss) => boss.status === "Completed").length;
  const inProgress = bosses.filter(
    (boss) => boss.status === "In Progress",
  ).length;
  const total = bosses.length;
  const progressPercentage = (completed / total) * 100;

  const totalDeaths = bosses.reduce(
    (sum, boss) =>
      sum + (boss.death_count_emily || 0) + (boss.death_count_agent || 0),
    0,
  );

  const averageLevelEmily =
    Math.round(
      bosses
        .filter((boss) => (boss.level_emily || 0) > 0)
        .reduce((sum, boss) => sum + (boss.level_emily || 0), 0) /
        bosses.filter((boss) => (boss.level_emily || 0) > 0).length,
    ) || 0;

  const averageLevelAgent =
    Math.round(
      bosses
        .filter((boss) => (boss.level_agent || 0) > 0)
        .reduce((sum, boss) => sum + (boss.level_agent || 0), 0) /
        bosses.filter((boss) => (boss.level_agent || 0) > 0).length,
    ) || 0;

  return (
    <div className="relative mb-12">
      <div className="relative z-10">
        {/* Compact Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 border-primary/20 text-primary px-3 py-1 text-xs font-medium shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <Zap className="w-3 h-3 mr-1" />
              Live on Twitch
            </Badge>
          </div>

          <h1 className="text-primary mb-4 text-6xl font-black tracking-tight leading-none drop-shadow-sm md:text-7xl">
            Elden Ring Marathon Progress
          </h1>

          <div className="flex justify-center items-center gap-3 mb-4">
            <h2 className="text-muted-foreground text-xl font-light md:text-2xl">
              Boss Tracker
            </h2>
          </div>

          <p className="text-muted-foreground mx-auto max-w-2xl mb-6 text-sm leading-relaxed md:text-base">
            Follow <span className="text-foreground font-semibold">Emily</span>{" "}
            and <span className="text-foreground font-semibold">Agent</span>
            &apos;s epic journey through the treacherous Lands Between
          </p>

          {/* Compact Twitch Buttons */}
          <div className="flex flex-col justify-center items-center gap-3 mb-8 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-primary shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              <a
                href="https://www.twitch.tv/extraemily"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitchIcon className="w-4 h-4 mr-2" />
                Emily&apos;s Stream
                <ExternalLink className="w-3 h-3 ml-2 opacity-70" />
              </a>
            </Button>

            <Button
              size="lg"
              asChild
              className="bg-primary shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
            >
              <a
                href="https://www.twitch.tv/agent00"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitchIcon className="w-4 h-4 mr-2" />
                Agent&apos;s Stream
                <ExternalLink className="w-3 h-3 ml-2 opacity-70" />
              </a>
            </Button>
          </div>
        </div>

        {/* Floating Stats Display */}
        <div className="relative">
          {/* Main Progress Circle with Ring */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 relative drop-shadow-lg md:w-40 md:h-40">
                {/* Progress Ring */}
                <svg
                  className="-rotate-90 transform w-full h-full"
                  viewBox="0 0 100 100"
                >
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="4"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
                    className="drop-shadow-sm transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="text-center">
                    <div className="text-primary text-3xl font-black drop-shadow-sm md:text-4xl">
                      {completed}
                    </div>
                    <div className="text-muted-foreground text-xs md:text-sm">
                      of {total}
                    </div>
                  </div>
                </div>
              </div>
              <div className="-right-2 -top-2 bg-primary text-primary-foreground absolute px-2 py-1 text-xs font-bold rounded-full shadow-lg">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>

          {/* Floating Stat Bubbles */}
          <div className="grid grid-cols-3 gap-4">
            {/* Deaths */}
            <div className="relative">
              <div className="bg-card/80 border-border/50 p-4 text-center rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:bg-card/90 hover:shadow-destructive/10 hover:shadow-lg">
                <div className="mx-auto w-12 h-12 flex justify-center items-center mb-3 rounded-full border shadow-sm">
                  <Skull className="w-6 h-6" />
                </div>
                <div className="text-foreground text-2xl font-black drop-shadow-sm">
                  {totalDeaths}
                </div>
                <div className="text-muted-foreground text-xs">Deaths</div>
              </div>
            </div>

            {/* In Progress */}
            <div className="relative">
              <div className="bg-card/80 border-border/50 p-4 text-center rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:bg-card/90 hover:shadow-destructive/10 hover:shadow-lg">
                <div className="mx-auto w-12 h-12 flex justify-center items-center mb-3 rounded-full border shadow-sm">
                  <Sword className="w-6 h-6" />
                </div>
                <div className="text-foreground text-2xl font-black drop-shadow-sm">
                  {inProgress}
                </div>
                <div className="text-muted-foreground text-xs">In Battle</div>
              </div>
            </div>

            {/* Remaining */}
            <div className="relative">
              <div className="bg-card/80 border-border/50 p-4 text-center rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:bg-card/90 hover:shadow-destructive/10 hover:shadow-lg">
                <div className="mx-auto w-12 h-12 flex justify-center items-center mb-3 rounded-full border shadow-sm">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-foreground text-2xl font-black drop-shadow-sm">
                  {total - completed - inProgress}
                </div>
                <div className="text-muted-foreground text-xs">Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

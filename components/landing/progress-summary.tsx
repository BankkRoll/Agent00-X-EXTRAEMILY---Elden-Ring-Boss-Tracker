"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skull, Target, TrendingUp, Trophy, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Boss } from "@/lib/database.types";
import { Progress } from "@/components/ui/progress";

interface ProgressSummaryProps {
  bosses: Boss[];
}

export function ProgressSummary({ bosses }: ProgressSummaryProps) {
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
    <div className="mb-20 space-y-8">
      <Card className="from-card/80 to-card/40 bg-gradient-to-br border-0 shadow-2xl backdrop-blur-xl transition-all duration-500 group hover:shadow-3xl">
        <CardHeader className="pb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Trophy className="text-primary w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">
                  Journey Progress
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Overall completion status
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-primary/10 border-primary/20 text-primary px-3 py-1"
            >
              <Zap className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-foreground mb-2 text-4xl font-black">
                {completed}
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                Bosses Conquered
              </div>
            </div>
            <div className="text-center">
              <div className="text-foreground mb-2 text-4xl font-black">
                {total}
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                Total Bosses
              </div>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-4xl font-black">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                Complete
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="bg-muted/50 h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="from-primary/5 to-primary/10 bg-gradient-to-br border-0 shadow-xl backdrop-blur-xl transition-all duration-500 group hover:shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Target className="text-primary w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-semibold">
                Battle Status
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/5 flex justify-between items-center p-3 rounded-lg">
              <span className="text-muted-foreground text-sm">Conquered</span>
              <span className="text-primary text-xl font-bold">
                {completed}
              </span>
            </div>
            <div className="bg-secondary/5 flex justify-between items-center p-3 rounded-lg">
              <span className="text-muted-foreground text-sm">In Battle</span>
              <span className="text-secondary-foreground text-xl font-bold">
                {inProgress}
              </span>
            </div>
            <div className="bg-muted/30 flex justify-between items-center p-3 rounded-lg">
              <span className="text-muted-foreground text-sm">Awaiting</span>
              <span className="text-muted-foreground text-xl font-bold">
                {total - completed - inProgress}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="from-destructive/5 to-destructive/10 bg-gradient-to-br border-0 shadow-xl backdrop-blur-xl transition-all duration-500 group hover:shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-destructive/10 p-2 rounded-lg">
                <Skull className="text-destructive w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-semibold">
                Souls Lost
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-destructive mb-3 text-4xl font-black">
              {totalDeaths}
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Combined deaths across all battles
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-destructive/5 p-2 rounded">
                <div className="text-destructive font-medium">Emily</div>
                <div className="text-muted-foreground">
                  {bosses.reduce(
                    (sum, boss) => sum + (boss.death_count_emily || 0),
                    0,
                  )}{" "}
                  deaths
                </div>
              </div>
              <div className="bg-destructive/5 p-2 rounded">
                <div className="text-destructive font-medium">Agent</div>
                <div className="text-muted-foreground">
                  {bosses.reduce(
                    (sum, boss) => sum + (boss.death_count_agent || 0),
                    0,
                  )}{" "}
                  deaths
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="from-accent/5 to-accent/10 bg-gradient-to-br border-0 shadow-xl backdrop-blur-xl transition-all duration-500 group hover:shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-accent/10 p-2 rounded-lg">
                <TrendingUp className="text-accent-foreground w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-semibold">
                Level Progress
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-accent/5 flex justify-between items-center p-3 rounded-lg">
              <span className="text-muted-foreground text-sm">
                Emily&apos;s Level
              </span>
              <span className="text-accent-foreground text-xl font-bold">
                Level {averageLevelEmily}
              </span>
            </div>
            <div className="bg-accent/5 flex justify-between items-center p-3 rounded-lg">
              <span className="text-muted-foreground text-sm">
                Agent&apos;s Level
              </span>
              <span className="text-accent-foreground text-xl font-bold">
                Level {averageLevelAgent}
              </span>
            </div>
            <div className="bg-muted/30 flex justify-between items-center p-3 rounded-lg">
              <span className="text-muted-foreground text-sm">Average</span>
              <span className="text-muted-foreground text-xl font-bold">
                Level {Math.round((averageLevelEmily + averageLevelAgent) / 2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { Boss, ProgressStats } from "@/lib/database.types";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function EmilyOverlay() {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [stats, setStats] = useState<ProgressStats>({
    total: 0,
    completed: 0,
    inProgress: 0,
    notStarted: 0,
    totalDeaths: 0,
    averageLevelEmily: 0,
    averageLevelAgent: 0,
    completionPercentage: 0,
  });
  const [currentBoss, setCurrentBoss] = useState<Boss | null>(null);

  useEffect(() => {
    fetchBosses();

    const channel = supabase
      .channel("emily-bosses-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bosses" },
        (payload) => {
          fetchBosses();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBosses = async () => {
    try {
      const { data, error } = await supabase
        .from("bosses")
        .select("*")
        .order("order_index");

      if (error) throw error;

      if (data) {
        setBosses(data);
        calculateStats(data);

        // Find current boss in progress - always update this
        const inProgressBoss = data.find(
          (boss) => boss.status === "In Progress",
        );
        setCurrentBoss(inProgressBoss || null);
      }
    } catch (error) {
      console.error("Error fetching bosses:", error);
    }
  };

  const calculateStats = (bossData: Boss[]) => {
    const total = bossData.length;
    const completed = bossData.filter(
      (boss) => boss.status === "Completed",
    ).length;
    const inProgress = bossData.filter(
      (boss) => boss.status === "In Progress",
    ).length;
    const notStarted = bossData.filter(
      (boss) => boss.status === "Not Started",
    ).length;

    const totalDeathsEmily = bossData.reduce(
      (sum, boss) => sum + (boss.death_count_emily || 0),
      0,
    );
    const totalDeathsAgent = bossData.reduce(
      (sum, boss) => sum + (boss.death_count_agent || 0),
      0,
    );

    const levelsEmily = bossData
      .filter((boss) => boss.level_emily && boss.level_emily > 0)
      .map((boss) => boss.level_emily!);
    const levelsAgent = bossData
      .filter((boss) => boss.level_agent && boss.level_agent > 0)
      .map((boss) => boss.level_agent!);

    const averageLevelEmily =
      levelsEmily.length > 0
        ? Math.round(
            levelsEmily.reduce((sum, level) => sum + level, 0) /
              levelsEmily.length,
          )
        : 0;
    const averageLevelAgent =
      levelsAgent.length > 0
        ? Math.round(
            levelsAgent.reduce((sum, level) => sum + level, 0) /
              levelsAgent.length,
          )
        : 0;

    const completionPercentage =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    setStats({
      total,
      completed,
      inProgress,
      notStarted,
      totalDeaths: totalDeathsEmily,
      averageLevelEmily,
      averageLevelAgent,
      completionPercentage,
    });
  };

  return (
    <>
      {/* Main Overlay - Elden Ring Style */}
      <div className="fixed right-0 bottom-0 left-0 p-2">
        <div className="mx-auto">
          {/* Ornate Frame Container */}
          <div className="border-amber-600/80 from-amber-900/90 to-amber-900/90 via-amber-800/90 relative bg-gradient-to-r rounded-lg border-2 shadow-2xl backdrop-blur-sm">
            {/* Decorative Corner Elements */}
            <div className="-left-1 -top-1 from-amber-400 to-amber-600 transform w-4 h-4 absolute bg-gradient-to-br rounded-sm rotate-45"></div>
            <div className="-right-1 -top-1 from-amber-400 to-amber-600 transform w-4 h-4 absolute bg-gradient-to-br rounded-sm rotate-45"></div>
            <div className="-bottom-1 -left-1 from-amber-400 to-amber-600 transform w-4 h-4 absolute bg-gradient-to-br rounded-sm rotate-45"></div>
            <div className="-bottom-1 -right-1 from-amber-400 to-amber-600 transform w-4 h-4 absolute bg-gradient-to-br rounded-sm rotate-45"></div>

            {/* Main Content */}
            <div className="bg-gray-900/95 border-amber-500/50 relative p-6 m-2 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-amber-400">⚔️</span>
                    <span className="text-lg font-bold tracking-wider text-amber-100">
                      EMILY&apos;S JOURNEY
                    </span>
                  </div>
                  <div className="bg-amber-900/50 border-amber-600/50 px-3 py-1 rounded border">
                    <span className="text-sm font-medium text-amber-200">
                      {stats.completed}/{stats.total} BOSSES SLAIN
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-amber-900/50 border-amber-600/50 px-3 py-1 rounded border">
                    <span className="text-sm font-medium text-amber-200">
                      LEVEL {stats.averageLevelEmily}
                    </span>
                  </div>
                  <div className="bg-amber-900/50 border-amber-600/50 px-3 py-1 rounded border">
                    <span className="text-sm font-medium text-amber-200">
                      {stats.totalDeaths} BOSS DEATHS
                    </span>
                  </div>
                  <div className="bg-amber-900/50 border-amber-600/50 px-3 py-1 rounded border">
                    <span className="text-sm font-medium text-amber-200">
                      {stats.completionPercentage}% COMPLETE
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar - Elden Ring Style */}
              <div className="relative">
                <div className="bg-gray-800/80 border-amber-600/50 w-full h-4 rounded-full border">
                  <div
                    className="from-red-600 to-red-400 via-red-500 h-full relative bg-gradient-to-r transition-all duration-1000 ease-out"
                    style={{ width: `${stats.completionPercentage}%` }}
                  >
                    {/* Animated glow effect */}
                    <div className="to-transparent via-white/20 absolute inset-0 bg-gradient-to-r from-transparent animate-pulse"></div>
                  </div>
                </div>
                {/* Decorative end caps */}
                <div className="-left-1 w-4 h-4 absolute top-0 bg-amber-500 rounded-full"></div>
                <div className="-right-1 w-4 h-4 absolute top-0 bg-amber-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Boss Indicator - Elden Ring Style */}
        {currentBoss && (
          <div className="absolute left-2 bottom-full mb-2">
            <div className="border-red-600/80 from-red-900/95 to-red-900/95 via-red-800/95 relative bg-gradient-to-r rounded-lg border-2 shadow-2xl backdrop-blur-sm">
              {/* Decorative Corner Elements */}
              <div className="-left-1 -top-1 from-red-400 to-red-600 transform w-3 h-3 absolute bg-gradient-to-br rounded-sm rotate-45"></div>
              <div className="-right-1 -top-1 from-red-400 to-red-600 transform w-3 h-3 absolute bg-gradient-to-br rounded-sm rotate-45"></div>
              <div className="-bottom-1 -left-1 from-red-400 to-red-600 transform w-3 h-3 absolute bg-gradient-to-br rounded-sm rotate-45"></div>
              <div className="-bottom-1 -right-1 from-red-400 to-red-600 transform w-3 h-3 absolute bg-gradient-to-br rounded-sm rotate-45"></div>

              <div className="bg-gray-900/95 border-red-500/50 relative p-4 m-1 rounded-lg border">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-red-400">⚔️</span>
                  <div>
                    <div className="text-sm font-medium tracking-wider text-red-200">
                      CURRENTLY FIGHTING
                    </div>
                    <div className="text-lg font-bold text-red-100">
                      {currentBoss.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

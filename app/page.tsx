"use client";

import { useEffect, useState } from "react";

import { BossCard } from "@/components/landing/boss-card";
import { ClipViewer } from "@/components/landing/clip-viewer";
import { HeroSection } from "@/components/landing/hero-section";
import { LoadingSpinner } from "@/components/landing/loading-spinner";
import { FooterSection } from "@/components/layout/footer-section";
import { Boss } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClip, setSelectedClip] = useState<string | null>(null);

  const fetchBosses = async () => {
    try {
      const { data, error } = await supabase
        .from("bosses")
        .select("*")
        .order("order_index");

      if (error) throw error;
      setBosses(data || []);
    } catch (error) {
      console.error("Error fetching bosses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBosses();

    const subscription = supabase
      .channel("bosses_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bosses" },
        () => {
          fetchBosses();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="from-background to-muted/5 via-background min-h-screen overflow-hidden relative bg-gradient-to-br">
      <div className="container mx-auto relative px-4 py-8">
        <HeroSection bosses={bosses} />

        <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {bosses.map((boss) => (
            <BossCard
              key={boss.id}
              boss={boss}
              onWatchClip={(clipUrl) => setSelectedClip(clipUrl)}
            />
          ))}
        </div>

        <ClipViewer
          selectedClip={selectedClip}
          onClose={() => setSelectedClip(null)}
        />

        <FooterSection />
      </div>
    </div>
  );
}

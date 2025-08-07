"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Boss } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";
import { Edit2, Home, LogOut, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AdminDashboardProps {
  onLogout: () => Promise<void>;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [editingBoss, setEditingBoss] = useState<Boss | null>(null);
  const [loading, setLoading] = useState(true);

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

  const updateBoss = async (boss: Boss) => {
    try {
      const { error } = await supabase
        .from("bosses")
        .update({
          ...boss,
          updated_at: new Date().toISOString(),
        })
        .eq("id", boss.id);

      if (error) throw error;

      fetchBosses();
      setEditingBoss(null);
    } catch (error) {
      console.error("Error updating boss:", error);
    }
  };

  useEffect(() => {
    fetchBosses();
  }, []);

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "Completed":
        return "bg-primary/20 text-primary border-primary/20";
      case "In Progress":
        return "bg-secondary/20 text-secondary-foreground border-secondary/20";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="from-background to-muted/20 via-background min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage the journey through the Lands Between
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Return to Tracker
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Card className="bg-card/50 border-0 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Boss Management</CardTitle>
            <p className="text-muted-foreground">
              Update boss status, timing, and battle statistics
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Boss Name</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Battle Time</TableHead>
                  <TableHead className="font-semibold">Death Count</TableHead>
                  <TableHead className="font-semibold text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bosses.map((boss) => (
                  <TableRow key={boss.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{boss.name}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(boss.status)} border-0`}
                      >
                        {boss.status || "Not Started"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {boss.start_time && boss.end_time
                          ? `${boss.start_time} - ${boss.end_time}`
                          : "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div>
                          Emily:{" "}
                          <span className="font-medium">
                            {boss.death_count_emily || 0}
                          </span>
                        </div>
                        <div>
                          Agent:{" "}
                          <span className="font-medium">
                            {boss.death_count_agent || 0}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingBoss(boss)}
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Update
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card/95 max-w-3xl border-0 backdrop-blur-sm">
                          <DialogHeader>
                            <DialogTitle className="text-xl">
                              Update Boss: {boss.name}
                            </DialogTitle>
                          </DialogHeader>
                          {editingBoss && (
                            <BossEditForm
                              boss={editingBoss}
                              onSave={updateBoss}
                              onChange={setEditingBoss}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface BossEditFormProps {
  boss: Boss;
  onSave: (boss: Boss) => void;
  onChange: (boss: Boss) => void;
}

function BossEditForm({ boss, onSave, onChange }: BossEditFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(boss);
  };

  const updateField = (field: keyof Boss, value: any) => {
    onChange({ ...boss, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="status" className="text-sm font-medium">
            Battle Status
          </Label>
          <Select
            value={boss.status || "Not Started"}
            onValueChange={(value) => updateField("status", value)}
          >
            <SelectTrigger className="h-12 mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="clip_link" className="text-sm font-medium">
            Victory Clip URL
          </Label>
          <Input
            id="clip_link"
            value={boss.clip_link || ""}
            onChange={(e) => updateField("clip_link", e.target.value)}
            placeholder="Twitch clip URL"
            className="h-12 mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="start_time" className="text-sm font-medium">
            Battle Start Time
          </Label>
          <Input
            id="start_time"
            value={boss.start_time || ""}
            onChange={(e) => updateField("start_time", e.target.value)}
            placeholder="0:45:20"
            className="h-12 mt-2"
          />
        </div>

        <div>
          <Label htmlFor="end_time" className="text-sm font-medium">
            Victory Time
          </Label>
          <Input
            id="end_time"
            value={boss.end_time || ""}
            onChange={(e) => updateField("end_time", e.target.value)}
            placeholder="2:06:36"
            className="h-12 mt-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <Label htmlFor="level_emily" className="text-sm font-medium">
            Emily&apos;s Level
          </Label>
          <Input
            id="level_emily"
            type="number"
            value={boss.level_emily || 0}
            onChange={(e) =>
              updateField("level_emily", parseInt(e.target.value) || 0)
            }
            className="h-12 mt-2"
          />
        </div>

        <div>
          <Label htmlFor="level_agent" className="text-sm font-medium">
            Agent&apos;s Level
          </Label>
          <Input
            id="level_agent"
            type="number"
            value={boss.level_agent || 0}
            onChange={(e) =>
              updateField("level_agent", parseInt(e.target.value) || 0)
            }
            className="h-12 mt-2"
          />
        </div>

        <div>
          <Label htmlFor="death_count_emily" className="text-sm font-medium">
            Emily&apos;s Deaths
          </Label>
          <Input
            id="death_count_emily"
            type="number"
            value={boss.death_count_emily || 0}
            onChange={(e) =>
              updateField("death_count_emily", parseInt(e.target.value) || 0)
            }
            className="h-12 mt-2"
          />
        </div>

        <div>
          <Label htmlFor="death_count_agent" className="text-sm font-medium">
            Agent&apos;s Deaths
          </Label>
          <Input
            id="death_count_agent"
            type="number"
            value={boss.death_count_agent || 0}
            onChange={(e) =>
              updateField("death_count_agent", parseInt(e.target.value) || 0)
            }
            className="h-12 mt-2"
          />
        </div>
      </div>

      <Button type="submit" className="w-full h-12 mt-8 text-base font-medium">
        <Save className="w-4 h-4 mr-2" />
        Update Boss Status
      </Button>
    </form>
  );
}

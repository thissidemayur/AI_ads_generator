"use client";

import { useAuthStore } from "@/store/authStore";
import {
  Building2,
  Users,
  ShieldAlert,
  Fingerprint,
  Cpu,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkspaceIdentity } from "@/features/dashboard/components/setting/workspaces/workspace-identity";
import { MemberManagement } from "@/features/dashboard/components/setting/workspaces/member-management";
import { WorkspaceDangerZone } from "@/features/dashboard/components/setting/workspaces/workspace-danger-zone";

export default function WorkspaceSettingsPage() {
  const { tenant } = useAuthStore();

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-6 px-4 md:px-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* 🏎️ SHOWROOM HEADER: High-Performance Aesthetic */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.05] pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
              Environment
            </h1>
          </div>
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] ml-1">
            Precision Workspace Control • Studio v1.0
          </p>
        </div>

        {/* Tactical Deployment Badge */}
        <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md shadow-inner">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">
              Instance ID
            </span>
            <code className="text-xs font-mono text-zinc-300">
              {tenant?.id?.slice(0, 16) || "LOCAL-NODE"}
            </code>
          </div>
          <Fingerprint className="w-5 h-5 text-primary/40" />
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full space-y-10">
        {/* 🎛️ PREMIUM TAB CONTROLS: Floating Command Rail */}
        <div className="flex justify-center">
          <TabsList className="bg-white/[0.02] border border-white/[0.08] p-1.5 rounded-[2rem] h-16 w-full max-w-lg flex gap-1.5 shadow-2xl backdrop-blur-2xl">
            {[
              { value: "general", icon: Building2, label: "Identity" },
              { value: "team", icon: Users, label: "Personnel" },
              {
                value: "security",
                icon: ShieldAlert,
                label: "Danger",
                danger: true,
              },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`
                  flex-1 rounded-[1.5rem] transition-all duration-500 gap-2 text-[10px] font-black uppercase tracking-widest
                  data-[state=active]:bg-white/[0.05] 
                  ${
                    tab.danger
                      ? "data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                      : "data-[state=active]:text-primary data-[state=active]:shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                  }
                `}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* 📜 TAB CONTENT AREAS: The Glass Case */}
        <div className="relative">
          <div className="p-[1px] rounded-[3rem] bg-gradient-to-b from-white/[0.1] to-transparent shadow-showroom transition-all duration-1000">
            <div className="bg-[#050505]/60 backdrop-blur-3xl rounded-[2.9rem] border border-white/[0.02] overflow-hidden">
              {/* --- IDENTITY TAB --- */}
              <TabsContent
                value="general"
                className="m-0 outline-none animate-in fade-in slide-in-from-right-4 duration-500"
              >
                <div className="p-10 md:p-16 space-y-10">
                  <header className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2 text-primary">
                      <Globe className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Global Discovery
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">
                      Branding & Studio Metadata
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                      Configure your studio&apos;s public-facing presence. This
                      identity propagates across all generated AI ad assets and
                      client-facing links.
                    </p>
                  </header>
                  <div className="pt-4">
                    <WorkspaceIdentity tenant={tenant} />
                  </div>
                </div>
              </TabsContent>

              {/* --- TEAM TAB --- */}
              <TabsContent
                value="team"
                className="m-0 outline-none animate-in fade-in slide-in-from-right-4 duration-500"
              >
                <div className="p-10 md:p-16 space-y-10">
                  <header className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Access Management
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">
                      Personnel Directory
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                      Control which specialists have authorization to operate
                      within this instance.
                    </p>
                  </header>
                  <MemberManagement tenantId={tenant?.id} />
                </div>
              </TabsContent>

              {/* --- DANGER TAB --- */}
              <TabsContent
                value="security"
                className="m-0 outline-none animate-in fade-in zoom-in-95 duration-500"
              >
                <div className="p-10 md:p-16 space-y-10">
                  <header className="space-y-2">
                    <div className="flex items-center gap-2 text-red-500">
                      <ShieldAlert className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Critical Override
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-red-500 tracking-tight uppercase italic">
                      System Termination
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                      Irreversible protocols for workspace dissolution. Data
                      purging cannot be recovered once initiated.
                    </p>
                  </header>
                  <WorkspaceDangerZone
                    tenantName={tenant?.name}
                    tenantId={tenant?.id}
                  />
                </div>
              </TabsContent>
            </div>
          </div>

          {/* Background Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full -z-10" />
        </div>
      </Tabs>
    </div>
  );
}

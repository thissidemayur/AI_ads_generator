"use client";

import { useAuthStore } from "@/store/authStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  ShieldCheck,
  Mail,
  AlertTriangle,
  Fingerprint,
  Lock,
  ShieldAlert,
} from "lucide-react";
import { EmailChangeForm } from "@/features/dashboard/components/setting/profile/emailChangeForm";
import { PasswordForm } from "@/features/dashboard/components/setting/profile/changePassword";
import { DangerZone } from "@/features/dashboard/components/setting/profile/dangerzone";
import { ProfileForm } from "@/features/dashboard/components/setting/profile/updateProfileForm";

export default function ProfileSettingsPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-2 md:p-4 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🚀 Page Header: Sophisticated & Minimal */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            Identity Hub
          </h1>
        </div>
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] ml-4">
          Personal Credentials & Security Protocols
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        {/* 💎 Tabs Navigation: Premium Glass Style */}
        <TabsList className="bg-white/[0.02] border border-white/[0.05] p-1 rounded-2xl h-14 w-full lg:w-fit flex gap-1 backdrop-blur-md">
          <TabsTrigger
            value="general"
            className="flex-1 lg:px-8 rounded-xl data-[state=active]:bg-white/[0.05] data-[state=active]:text-primary data-[state=active]:shadow-inner transition-all gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500"
          >
            <Fingerprint className="w-3.5 h-3.5" />
            Identity
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex-1 lg:px-8 rounded-xl data-[state=active]:bg-white/[0.05] data-[state=active]:text-primary transition-all gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500"
          >
            <Lock className="w-3.5 h-3.5" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="danger"
            className="flex-1 lg:px-8 rounded-xl data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 transition-all gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Danger
          </TabsTrigger>
        </TabsList>

        {/* --- TAB CONTENT: IDENTITY --- */}
        <TabsContent value="general" className="mt-12 space-y-16 outline-none">
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
                Public Persona
              </h3>
            </div>
            <div className="max-w-2xl">
              <ProfileForm
                initialData={{
                  firstName: user?.firstName || "",
                  lastName: user?.lastName || "",
                }}
              />
            </div>
          </section>

          <section className="space-y-8 pt-8 border-t border-white/[0.05]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
                Communication Root
              </h3>
            </div>
            <div className="max-w-2xl">
              <EmailChangeForm />
            </div>
          </section>
        </TabsContent>

        {/* --- TAB CONTENT: SECURITY --- */}
        <TabsContent
          value="security"
          className="mt-12 outline-none animate-in fade-in slide-in-from-right-4 duration-500"
        >
          <section className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
                Access Encryption
              </h3>
            </div>
            <div className="max-w-2xl">
              <PasswordForm />
            </div>
          </section>
        </TabsContent>

        {/* --- TAB CONTENT: DANGER --- */}
        <TabsContent
          value="danger"
          className="mt-12 outline-none animate-in zoom-in-95 duration-500"
        >
          <DangerZone />
        </TabsContent>
      </Tabs>
    </div>
  );
}

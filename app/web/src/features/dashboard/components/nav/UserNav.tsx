"use client";

import {
  LogOut,
  User,
  CreditCard,
  ShieldCheck,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/hooks/auth/useLogout";
import { cn } from "@/lib/utils";

interface UserNavProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter();
  const { logout, isLoading } = useLogout();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading}>
        <button className="relative group h-9 w-9 rounded-xl border border-white/[0.08] p-0.5 hover:border-primary/50 transition-all outline-none bg-white/[0.02] active:scale-95 disabled:opacity-50">
          <Avatar className="h-full w-full rounded-lg border border-white/[0.05]">
            <AvatarImage
              src={user?.avatar}
              alt={user?.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-zinc-900 text-primary text-[10px] font-black uppercase tracking-tighter">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -inset-0.5 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity -z-10" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-[#0A0A0A]/95 backdrop-blur-xl border-white/[0.08] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[1.5rem] z-[100]"
        align="end"
        sideOffset={12}
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">
                {user?.role || "Personal"} Account
              </p>
              {user?.role === "admin" && (
                <ShieldCheck className="w-3 h-3 text-primary" />
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold text-white tracking-tight">
                {user?.name || "User Account"}
              </p>
              <p className="text-[11px] font-medium text-zinc-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/[0.05] mx-2" />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem
            className="group flex items-center justify-between p-3 rounded-xl cursor-pointer focus:bg-white/[0.05] transition-all text-zinc-400 focus:text-white"
            onClick={() => router.push("/dashboard/settings/profile")}
          >
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-zinc-500 group-focus:text-primary transition-colors" />
              <span className="text-xs font-bold tracking-tight">
                Profile Settings
              </span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-0 group-focus:opacity-100 transition-all" />
          </DropdownMenuItem>

          <DropdownMenuItem
            className="group flex items-center justify-between p-3 rounded-xl cursor-pointer focus:bg-white/[0.05] transition-all text-zinc-400 focus:text-white"
            onClick={() => router.push("/dashboard/billing")}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="h-4 w-4 text-zinc-500 group-focus:text-primary transition-colors" />
              <span className="text-xs font-bold tracking-tight">
                Billing & Credits
              </span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-0 group-focus:opacity-100 transition-all" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-white/[0.05] mx-2" />

        <div className="p-1">
          <DropdownMenuItem
            onClick={logout}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
              "text-zinc-500 focus:bg-red-500/10 focus:text-red-500",
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span className="text-xs font-black uppercase tracking-widest">
              {isLoading ? "Ending Session..." : "Sign Out"}
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

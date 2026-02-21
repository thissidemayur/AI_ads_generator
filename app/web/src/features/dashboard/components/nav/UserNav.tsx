"use client";

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
import { useAuthStore } from "@/store/authStore";
import { LogOut, User, CreditCard, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UserNav() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    // clearAuth();

    // toast.success("Session terminated. See you soon!");

    // router.push("/login");
  };

  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Upgrade: Added a subtle border and hover lift */}
        <button className="relative h-9 w-9 rounded-xl border border-white/[0.08] p-0.5 hover:scale-105 transition-all outline-none bg-white/[0.02]">
          <Avatar className="h-full w-full rounded-lg">
            <AvatarImage
              src={`user?.avatarUrl`}
              alt={user?.firstName || "User"}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-zinc-950/95 backdrop-blur-2xl border-white/[0.08] p-2 shadow-showroom rounded-[1.5rem]"
        align="end"
        sideOffset={12}
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-black text-white uppercase tracking-wider">
              {user?.firstName || "User Account"}
            </p>
            <p className="text-[11px] font-mono text-zinc-500 truncate">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/[0.05]" />

        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-white/[0.05] transition-all"
            onClick={() => router.push("/dashboard/settings/profile")}
          >
            <User className="h-4 w-4 text-zinc-500" />
            <span className="text-xs font-bold text-zinc-300">
              Profile Settings
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-white/[0.05] transition-all"
            onClick={() => router.push("/dashboard/billing")}
          >
            <CreditCard className="h-4 w-4 text-zinc-500" />
            <span className="text-xs font-bold text-zinc-300">
              Billing & Credits
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-white/[0.05]" />

        <div className="p-1">
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-red-500/10 text-zinc-400 focus:text-red-500 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-xs font-bold">Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

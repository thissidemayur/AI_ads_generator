"use client";

import {
  MoreHorizontal,
  ShieldCheck,
  Mail,
  User as UserIcon,
  Crown,
  Settings2,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const MOCK_MEMBERS = [
  {
    id: "1",
    name: "Mayur Student",
    email: "mayur@lpu.in",
    role: "OWNER",
    status: "Active",
    avatar: "",
  },
  {
    id: "2",
    name: "AI Agent",
    email: "bot@aiaid.gen",
    role: "ADMIN",
    status: "Active",
    avatar: "",
  },
];

export function MembersTable() {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-white/[0.02]">
            <th className="p-5 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] border-b border-white/[0.05]">
              Collaborator
            </th>
            <th className="p-5 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] border-b border-white/[0.05]">
              Permission
            </th>
            <th className="p-5 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] border-b border-white/[0.05]">
              Status
            </th>
            <th className="p-5 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] border-b border-white/[0.05] text-right">
              Management
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.03]">
          {MOCK_MEMBERS.map((member) => (
            <tr
              key={member.id}
              className="group hover:bg-white/[0.02] transition-all duration-300"
            >
              {/* COLLABORATOR IDENTITY */}
              <td className="p-5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10 rounded-xl border border-white/[0.08] shadow-inner">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-zinc-900 text-[11px] font-black text-primary">
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#050505] rounded-full flex items-center justify-center border border-white/[0.05]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black text-white tracking-tight truncate">
                      {member.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-zinc-700" /> {member.email}
                    </span>
                  </div>
                </div>
              </td>

              {/* PERMISSION LEVEL */}
              <td className="p-5">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "p-1.5 rounded-lg border",
                      member.role === "OWNER"
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-zinc-900 border-white/[0.05] text-zinc-500",
                    )}
                  >
                    {member.role === "OWNER" ? (
                      <Crown className="w-3 h-3" />
                    ) : (
                      <UserIcon className="w-3 h-3" />
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                    {member.role}
                  </span>
                </div>
              </td>

              {/* LIVE STATUS */}
              <td className="p-5">
                <Badge
                  variant="outline"
                  className="bg-emerald-500/5 text-emerald-500 border-emerald-500/20 text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md"
                >
                  {member.status}
                </Badge>
              </td>

              {/* SETTINGS ACTIONS */}
              <td className="p-5 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 text-zinc-600 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all outline-none">
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={10}
                    className="w-48 bg-zinc-950/95 backdrop-blur-2xl border-white/[0.08] p-2 shadow-showroom rounded-2xl"
                  >
                    <DropdownMenuItem className="text-[10px] font-black uppercase tracking-widest p-3 rounded-xl cursor-pointer focus:bg-white/[0.05] gap-3">
                      <Settings2 className="w-3.5 h-3.5" /> Change Role
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/[0.05] my-1" />
                    <DropdownMenuItem className="text-[10px] font-black uppercase tracking-widest p-3 rounded-xl cursor-pointer focus:bg-red-500/10 text-red-500 gap-3">
                      <Trash2 className="w-3.5 h-3.5" /> Remove Personnel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";
import {
  MoreHorizontal,
  ShieldCheck,
  Mail,
  User as UserIcon,
  Crown,
  Settings2,
  Trash2,
  Loader2,
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

interface Member {
  id: string;
  role: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
}

interface MembersTableProps {
  members: Member[];
  isLoading: boolean;
}

export function MembersTable({ members, isLoading }: MembersTableProps) {
  if (isLoading) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center gap-3 bg-white/[0.01]">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
          Syncing Personnel...
        </span>
      </div>
    );
  }

  // 3. Handle Empty State
  if (!members || members.length === 0) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center gap-2 bg-white/[0.01]">
        <UserIcon className="w-5 h-5 text-zinc-800" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
          No collaborators found in this workspace
        </span>
      </div>
    );
  }

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
          {members.map((member) => (
            <tr
              key={member.id}
              className="group hover:bg-white/[0.02] transition-all duration-300"
            >
              <td className="p-5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-10 w-10 rounded-xl border border-white/[0.08] shadow-inner">
                      <AvatarImage src={member.user?.avatar} />
                      <AvatarFallback className="bg-zinc-900 text-[11px] font-black text-primary">
                        {member.user?.firstName?.[0]}
                        {member.user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#050505] rounded-full flex items-center justify-center border border-white/[0.05]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-black text-white tracking-tight truncate">
                      {member.user?.firstName} {member.user?.lastName}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-zinc-700" />{" "}
                      {member.user?.email}
                    </span>
                  </div>
                </div>
              </td>

              <td className="p-5">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "p-1.5 rounded-lg border",
                      member.role === "OWNER" || member.role === "ADMIN"
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "bg-zinc-900 border-white/[0.05] text-zinc-500",
                    )}
                  >
                    {member.role === "OWNER" ? (
                      <Crown className="w-3 h-3" />
                    ) : (
                      <ShieldCheck className="w-3 h-3" />
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
                    {member.role}
                  </span>
                </div>
              </td>

              <td className="p-5">
                <Badge
                  variant="outline"
                  className="bg-emerald-500/5 text-emerald-500 border-emerald-500/20 text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md"
                >
                  Active
                </Badge>
              </td>

              <td className="p-5 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-2 text-zinc-600 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all outline-none">
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={10}
                    className="w-48 bg-zinc-950/95 backdrop-blur-2xl border-white/[0.08] p-2 shadow-2xl rounded-2xl"
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

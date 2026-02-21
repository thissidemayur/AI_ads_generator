"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  Mail,
  Shield,
  Loader2,
  SendHorizontal,
  Users,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 🛡️ Validation Schema
const inviteSchema = z.object({
  email: z.string().email("Please enter a valid work email."),
  role: z.enum(["ADMIN", "MEMBER", "VIEWER"], {
    required_error: "Please select a permission level.",
  }),
});

type InviteValues = z.infer<typeof inviteSchema>;

export function InviteMemberSheet() {
  const [open, setOpen] = useState(false);

  const form = useForm<InviteValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "MEMBER",
    },
  });

  const onSubmit = async (data: InviteValues) => {
    console.log("Dispatching invitation...", data);
    // Placeholder for API call: await api.post(`/workspaces/${tenantId}/invites`, data);
    setOpen(false);
    form.reset();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-5 rounded-xl border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-[10px] font-black uppercase tracking-widest gap-2 group transition-all"
        >
          <Plus className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          Invite Collaborator
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-zinc-950/95 backdrop-blur-2xl border-white/[0.08] sm:max-w-md p-0 flex flex-col">
        {/* Header Section */}
        <div className="p-8 space-y-4 border-b border-white/[0.05]">
          <div className="p-3 bg-primary/10 rounded-2xl w-fit border border-primary/20">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-1">
            <SheetTitle className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Expand Team
            </SheetTitle>
            <SheetDescription className="text-zinc-500 text-xs font-medium">
              Invite a new specialist to join your workspace studio. They will
              receive an email with an access link.
            </SheetDescription>
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-8 space-y-8"
        >
          {/* Email Field */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-3">
                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">
                  Collaborator Email
                </FieldLabel>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    {...field}
                    placeholder="teammate@agency.com"
                    className="pl-11 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 rounded-2xl h-14 text-sm font-medium"
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Role Selection */}
          <Controller
            name="role"
            control={form.control}
            render={({ field }) => (
              <Field className="space-y-3">
                <FieldLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">
                  Access Protocol
                </FieldLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-white/[0.02] border-white/[0.08] rounded-2xl h-14 px-4 text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-zinc-600" />
                      <SelectValue placeholder="Select a role" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-white/[0.08] rounded-xl">
                    <SelectItem value="ADMIN" className="text-xs p-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold">Admin</span>
                        <span className="text-[10px] text-zinc-500">
                          Full control over settings & members
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="MEMBER" className="text-xs p-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold">Member</span>
                        <span className="text-[10px] text-zinc-500">
                          Can generate and manage ad assets
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem value="VIEWER" className="text-xs p-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold">Viewer</span>
                        <span className="text-[10px] text-zinc-500">
                          Read-only access to the library
                        </span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {/* Information Notice */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex gap-3 items-start">
            <CheckCircle2 className="w-4 h-4 text-zinc-600 mt-0.5" />
            <p className="text-[10px] text-zinc-600 font-medium leading-relaxed">
              Admins can manage billing and deletion. Members are restricted to
              the studio workshop tools only.
            </p>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-8 border-t border-white/[0.05] bg-white/[0.01]">
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all gap-3 shadow-xl"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <>
                Send Invitation
                <SendHorizontal className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

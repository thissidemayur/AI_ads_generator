"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle, Building2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useSwitchWorkspace } from "@/hooks/workspaces/useSwitchWorkspace";
import { CreateWorkspaceDrawer } from "../../CreateWorkspaceDrawer";

const switcherSchema = z.object({
  workspaceId: z.string().min(1, "Selection required"),
});

export function WorkspaceSwitcher() {
  const [open, setOpen] = React.useState(false);
  const { currentWorkspace, workspaces } = useWorkspaceStore();
  const { switchWorkspace } = useSwitchWorkspace();

  const form = useForm<z.infer<typeof switcherSchema>>({
    resolver: zodResolver(switcherSchema),
    defaultValues: {
      workspaceId: currentWorkspace?.id || "",
    },
  });

  const onWorkspaceSelect = (workspaceId: string) => {
    const selected = workspaces.find((w) => w.id === workspaceId);
    if (selected) {
      switchWorkspace(selected, "OWNER");
      form.setValue("workspaceId", workspaceId);
      setOpen(false);
    }
  };

  return (
    <div className="w-full max-w-[200px]">
      <Controller
        name="workspaceId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="sr-only">Active Workspace</FieldLabel>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  role="combobox"
                  className={cn(
                    "w-full justify-between hover:bg-white/[0.05] border-transparent transition-all px-2 h-9 rounded-xl",
                    fieldState.invalid && "border-destructive",
                  )}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                      <Building2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="truncate text-xs font-bold text-zinc-200 tracking-tight">
                      {workspaces.find((w) => w.id === field.value)?.name ||
                        currentWorkspace?.name ||
                        "Switch..."}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-40" />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-[240px] p-0 bg-zinc-950/90 backdrop-blur-xl border-white/[0.08] shadow-showroom rounded-2xl overflow-hidden"
                align="start"
                sideOffset={8}
              >
                <Command className="bg-transparent">
                  <CommandInput
                    placeholder="Search workspaces..."
                    className="h-11 border-none focus:ring-0 text-sm"
                  />

                  {/* --- COMMAND LIST: Handles the scrollable area --- */}
                  <CommandList className="max-h-[280px] overflow-y-auto custom-scrollbar p-1">
                    <CommandEmpty className="py-6 text-xs text-center text-zinc-500 font-medium">
                      No results found.
                    </CommandEmpty>

                    <CommandGroup
                      heading="Workspaces"
                      className="px-2 py-1.5 text-zinc-600 font-black text-[9px] uppercase tracking-[0.2em]"
                    >
                      {workspaces.map((workspace) => (
                        <CommandItem
                          key={workspace.id}
                          onSelect={() => onWorkspaceSelect(workspace.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer aria-selected:bg-white/[0.05] transition-all group mt-0.5"
                        >
                          <div className="h-6 w-6 rounded-lg bg-zinc-900 border border-white/[0.05] flex items-center justify-center group-aria-selected:border-primary/40 transition-colors">
                            <Building2 className="h-3 w-3 text-zinc-500 group-aria-selected:text-primary" />
                          </div>
                          <span className="flex-1 truncate text-sm font-medium tracking-tight">
                            {workspace.name}
                          </span>
                          <Check
                            className={cn(
                              "h-3.5 w-3.5 text-primary transition-opacity",
                              field.value === workspace.id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>

                  {/* --- COMMAND SEPARATOR: The visual break --- */}
                  <CommandSeparator className="bg-white/[0.08] h-[1px]" />

                  {/* --- SECOND LIST: For Persistent Actions --- */}
                  <CommandList className="p-1">
                    <CommandGroup>
                      <CreateWorkspaceDrawer>
                        <CommandItem className="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer text-zinc-400 hover:text-white hover:bg-primary/10 transition-all group">
                          <PlusCircle className="h-4 w-4 text-zinc-500 group-hover:text-primary" />
                          <span className="text-xs font-bold tracking-tight">
                            New Showroom
                          </span>
                        </CommandItem>
                      </CreateWorkspaceDrawer>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

"use client";

import * as React from "react";
import { PlusCircle, Sparkles, Building2 } from "lucide-react";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerTrigger,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateWorkspace } from "@/hooks/workspaces/useCreateWorkspace";

export function CreateWorkspaceDrawer({ children }: { children: React.ReactNode }) {
  const { register, handleSubmit, errors, isSubmitting } = useCreateWorkspace();
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="bg-zinc-950 border-white/[0.08] text-white">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-center">
            <div className="mx-auto p-3 bg-primary/10 rounded-2xl w-fit mb-2">
               <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <DrawerTitle className="text-xl font-bold tracking-tight">New Creative Space</DrawerTitle>
            <DrawerDescription className="text-zinc-500">
              Give your new agency or project a name to get started.
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Workspace Name
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="e.g. Maverick Studio"
                  className="pl-10 bg-white/[0.02] border-white/[0.08] focus:border-primary/50 transition-all rounded-xl h-12"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-destructive font-medium">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                type="submit" 
                className="h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Initialising..." : "Create Workspace"}
              </Button>
              <DrawerClose asChild>
                <Button variant="ghost" className="text-zinc-500 hover:text-white">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
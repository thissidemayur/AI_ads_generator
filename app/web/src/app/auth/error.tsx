"use client";

import { useEffect } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error reporting service
    console.error("Auth Boundary Error:", error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 bg-zinc-950/50 rounded-3xl border border-white/[0.05] backdrop-blur-xl">
      <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
        <AlertTriangle className="w-8 h-8 text-amber-500" />
      </div>

      <h2 className="text-xl font-black text-white uppercase tracking-tighter">
        Connection Interrupted
      </h2>

      <p className="mt-2 text-zinc-500 text-sm text-center max-w-[280px] mb-8 leading-relaxed">
        {error.message.includes("fetch")
          ? "We're having trouble reaching the studio servers."
          : "An unexpected error occurred while verifying your session."}
      </p>

      <div className="flex flex-col w-full gap-3">
        <Button
          onClick={() => reset()}
          className="w-full bg-white text-black font-bold hover:bg-zinc-200 rounded-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retry Connection
        </Button>

        <Button
          variant="ghost"
          onClick={() => (window.location.href = "/auth/login")}
          className="text-zinc-500 text-xs hover:text-white"
        >
          Return to Login
        </Button>
      </div>
    </div>
  );
}

import { useMemo } from "react";
import { ZeroProvider as BaseZeroProvider } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";
import { schema } from "../../zero-schema.gen";
import type { Schema } from "../../zero-schema.gen";
import { preloadAllData } from "../lib/preload";
import { router } from "../lib/router";

interface ZeroProviderProps {
  children: React.ReactNode;
}

export function ZeroProvider({ children }: ZeroProviderProps) {
  const opts = useMemo(() => {
    return {
      schema,
      userID: "anon" as const,
      server: import.meta.env.VITE_ZERO_SERVER || "http://localhost:4848",
      init: (zero: Zero<Schema>) => {
        console.log("🚀 Zero initialized, starting preload...");

        // Start preloading data
        preloadAllData(zero);

        // Update router context with zero instance
        router.update({
          context: {
            zero,
          },
        });
      },
    };
  }, []);

  return <BaseZeroProvider {...opts}>{children}</BaseZeroProvider>;
}

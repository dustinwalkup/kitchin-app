import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import "./index.css";
import { schema } from "../zero-schema.gen";
import type { Schema } from "../zero-schema.gen";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

function preload(z: Zero<Schema>) {
  // Delay preload() slightly to avoid blocking UI on first run
  setTimeout(() => {
    console.log("🚀 Starting strategic preload...");

    // preloading all tables
    z.query.mealPlans.preload({ ttl: "1m" });
    z.query.shoppingLists.where("isActive", true).preload({ ttl: "1m" });
    z.query.commonGroceryItems.preload({ ttl: "1m" });
    z.query.meals.preload({ ttl: "1m" });
    z.query.shoppingListItems.preload({ ttl: "1m" });

    console.log("✅ Strategic preload completed!");
  }, 1_000);
}

function App() {
  const opts = useMemo(() => {
    return {
      schema,
      userID: "anon" as const,
      server: import.meta.env.VITE_ZERO_SERVER || "http://localhost:4848",
      init: (zero: Zero<Schema>) => {
        console.log("🚀 Zero initialized, starting preload...");
        preload(zero);

        // Update router context with zero instance
        router.update({
          context: {
            zero,
          },
        });
      },
    };
  }, []);

  return (
    <ZeroProvider {...opts}>
      <RouterProvider router={router} />
    </ZeroProvider>
  );
}

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    zero: undefined!, // This will be set by the ZeroProvider init callback
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

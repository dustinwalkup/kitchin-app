import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { ZeroProvider } from "@rocicorp/zero/react";
import { Zero } from "@rocicorp/zero";

import "./index.css";
import App from "./App";
import { Schema, schema } from "../zero-schema.gen";
import Navbar from "./components/navbar";

function preload(z: Zero<Schema>) {
  // ✅ Delay preload() slightly to avoid blocking UI on first run
  setTimeout(() => {
    console.log("🚀 Starting strategic preload...");

    // Strategic preloading based on your app's usage patterns
    z.query.mealPlans.preload({ ttl: "1m" });
    z.query.shoppingLists.where("isActive", true).preload({ ttl: "1m" });
    z.query.commonGroceryItems.preload({ ttl: "1m" });
    z.query.meals.preload({ ttl: "1m" });
    z.query.shoppingListItems.preload({ ttl: "1m" });

    console.log("✅ Strategic preload completed!");
  }, 1_000);
}

function ZeroInit({ children }: { children: React.ReactNode }) {
  const opts = useMemo(() => {
    return {
      schema,
      userID: "anon",
      server: import.meta.env.VITE_ZERO_SERVER || "http://localhost:4848",
      init: (zero: Zero<Schema>) => {
        console.log("🚀 Zero initialized, starting preload...");
        preload(zero);
      },
    };
  }, []);

  return <ZeroProvider {...opts}>{children}</ZeroProvider>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ZeroInit>
      <Navbar />
      <App />
    </ZeroInit>
  </StrictMode>,
);

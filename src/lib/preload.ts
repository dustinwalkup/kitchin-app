import { Zero } from "@rocicorp/zero";
import type { Schema } from "../../zero-schema.gen";

export function preloadAllData(z: Zero<Schema>) {
  // Delay preload() slightly to avoid blocking UI on first run
  setTimeout(() => {
    console.log("🚀 Starting strategic preload...");

    // Strategic preloading for all essential data
    z.query.mealPlans.preload({ ttl: "1m" });
    z.query.shoppingLists.where("isActive", true).preload({ ttl: "1m" });
    z.query.commonGroceryItems.preload({ ttl: "1m" });
    z.query.meals.preload({ ttl: "1m" });
    z.query.shoppingListItems.preload({ ttl: "1m" });

    console.log("✅ Strategic preload completed!");
  }, 1_000);
}

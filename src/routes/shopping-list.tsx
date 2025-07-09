import { createFileRoute } from "@tanstack/react-router";
import { ShoppingList } from "@/components/shopping-list";
import { Zero } from "@rocicorp/zero";
import type { Schema } from "../../zero-schema.gen";

function preloadShoppingData(zero: Zero<Schema>) {
  // Strategic preloading for shopping-list route
  zero.query.shoppingLists.where("isActive", true).preload({ ttl: "1m" });
  zero.query.shoppingListItems.preload({ ttl: "1m" });
  zero.query.commonGroceryItems.preload({ ttl: "1m" });
}

export const Route = createFileRoute("/shopping-list")({
  loader: async ({ context }) => {
    const { zero } = context;
    preloadShoppingData(zero);

    // Return a promise that resolves when data is loaded
    return Promise.resolve();
  },
  component: () => <ShoppingList />,
});

import { useZero, useQuery } from "@rocicorp/zero/react";
import { useMutations } from "./use-mutations";
import type { Schema } from "../../zero-schema.gen";
import type { CategoryKey, ShoppingListViewMode } from "@/lib/types";

export function useShoppingListPreferences() {
  const z = useZero<Schema>();
  const { updateShoppingList } = useMutations();

  const shoppingListsQuery = useQuery(z.query.shoppingLists);
  const shoppingList = shoppingListsQuery[0]?.[0]; // Get the active shopping list

  const updateViewMode = (viewMode: ShoppingListViewMode) => {
    if (shoppingList?.id) {
      updateShoppingList(shoppingList.id, { viewMode });
    }
  };

  const updateActiveCategory = (activeCategory: CategoryKey) => {
    if (shoppingList?.id) {
      updateShoppingList(shoppingList.id, { activeCategory });
    }
  };

  return {
    viewMode: (shoppingList?.viewMode as ShoppingListViewMode) || "list",
    activeCategory: (shoppingList?.activeCategory as CategoryKey) || "produce",
    updateViewMode,
    updateActiveCategory,
  };
}

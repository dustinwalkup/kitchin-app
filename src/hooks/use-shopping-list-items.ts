import { useMemo } from "react";
import { useZero, useQuery } from "@rocicorp/zero/react";

import type { Schema } from "../../zero-schema.gen";
import { type CategoryKey, type ItemsByCategory } from "@/lib/types";

export function useShoppingListItems(shoppingListId?: string) {
  const z = useZero<Schema>();
  const shoppingListItemsQuery = useQuery(z.query.shoppingListItems);

  // Filter items for the specific shopping list
  const filteredItems = useMemo(() => {
    const items = shoppingListItemsQuery[0] || [];
    if (!shoppingListId) return [];

    return items.filter((item) => item.shoppingListId === shoppingListId);
  }, [shoppingListItemsQuery[0], shoppingListId]);

  // Group items by category
  const itemsByCategory = useMemo<ItemsByCategory>(() => {
    const itemsByCategory: ItemsByCategory = {
      produce: [],
      meat: [],
      dairy: [],
      pantry: [],
      frozen: [],
      bakery: [],
      other: [],
    };

    for (const item of filteredItems) {
      const category = item.category as CategoryKey;
      if (itemsByCategory[category]) {
        itemsByCategory[category].push({
          id: item.id!,
          name: item.name,
          completed: item.isCompleted || false,
          quantity: item.quantity || "1",
          unit: item.unit,
          notes: item.notes,
        });
      }
    }

    return itemsByCategory;
  }, [filteredItems]);

  const rawItems = shoppingListItemsQuery[0] || [];

  return {
    itemsByCategory,
    filteredItems,
    rawItems,
    totalItems: filteredItems.length,
    completedItems: filteredItems.filter((item) => item.isCompleted).length,
  };
}

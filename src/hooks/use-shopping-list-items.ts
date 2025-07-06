import { useMemo } from "react";
import { useZero, useQuery } from "@rocicorp/zero/react";

import type { Schema } from "../../zero-schema.gen";
import { type CategoryKey, type ItemsByCategory } from "@/lib/types";

export function useShoppingListItems() {
  const z = useZero<Schema>();
  const shoppingListItemsQuery = useQuery(z.query.shoppingListItems);

  // Zero handles user isolation through permissions
  // No need to filter by user here
  const items = useMemo(() => {
    return shoppingListItemsQuery[0] || [];
  }, [shoppingListItemsQuery[0]]);

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

    for (const item of items) {
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
  }, [items]);

  const rawItems = shoppingListItemsQuery[0] || [];

  return {
    itemsByCategory,
    items,
    rawItems,
    totalItems: items.length,
    completedItems: items.filter((item) => item.isCompleted).length,
  };
}

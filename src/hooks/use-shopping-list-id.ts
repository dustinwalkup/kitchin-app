import { useMemo } from "react";
import { useZero, useQuery } from "@rocicorp/zero/react";
import type { Schema } from "../../zero-schema.gen";

export function useShoppingListId() {
  const z = useZero<Schema>();
  const shoppingListsQuery = useQuery(z.query.shoppingLists);

  const shoppingListId = useMemo(() => {
    const lists = shoppingListsQuery[0] || [];

    // Since we initialize with exactly one shopping list, optimize for that case
    if (lists.length === 1) {
      return lists[0]?.id;
    }

    // Fallback for edge cases
    const activeList = lists.find((list) => list.isActive) || lists[0];
    return activeList?.id;
  }, [shoppingListsQuery]);

  return shoppingListId;
}

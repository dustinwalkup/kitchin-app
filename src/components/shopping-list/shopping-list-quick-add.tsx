import { Button } from "@/components/ui/button";
import { useMutations } from "@/hooks/use-mutations";
import { type CategoryKey } from "@/lib/types";
import { COMMON_ITEMS, LABELS } from "@/lib/constants";

interface ShoppingListQuickAddProps {
  category: CategoryKey;
  existingItems: string[];
  variant?: "compact" | "large";
  shoppingListId?: string;
}

export function ShoppingListQuickAdd({
  category,
  existingItems,
  variant = "compact",
  shoppingListId,
}: ShoppingListQuickAddProps) {
  const { createShoppingListItem } = useMutations();
  const isLarge = variant === "large";
  const commonItems = COMMON_ITEMS[category] || [];

  const handleAddItem = (itemName: string) => {
    if (!shoppingListId) return;
    createShoppingListItem(shoppingListId, category, itemName);
  };

  return (
    <div className={isLarge ? "mb-6" : "mb-4"}>
      <div
        className={`text-night-horizon/60 mb-2 ${isLarge ? "mb-3 text-sm" : "text-xs"}`}
      >
        {LABELS.QUICK_ADD}
      </div>
      <div className={`flex flex-wrap gap-1 ${isLarge ? "gap-2" : ""}`}>
        {commonItems.map((item) => {
          const exists = existingItems.some(
            (existingItem) => existingItem.toLowerCase() === item.toLowerCase(),
          );
          return (
            <Button
              key={item}
              variant="outline"
              size="sm"
              onClick={() => handleAddItem(item)}
              disabled={exists}
              className={`${
                isLarge ? "h-8 text-sm" : "h-7 text-xs"
              } ${exists ? "opacity-50" : "hover:bg-secondary/20 border-tertiary/30"}`}
            >
              {exists ? "✓ " : ""}
              {item}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

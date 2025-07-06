import { Badge } from "@/components/ui/badge";
import { type CategoryKey, type ItemsByCategory } from "@/lib/types";
import { CATEGORIES, LABELS } from "@/lib/constants";
import { ShoppingListItemComponent } from "./shopping-list-item";
import { ShoppingListAddItem } from "./shopping-list-add-item";
import { ShoppingListQuickAdd } from "./shopping-list-quick-add";
import { EmptyState } from "./empty-state";

interface ShoppingListCategoryProps {
  category: CategoryKey;
  items: ItemsByCategory[CategoryKey];
  newItemValue: string;
  onNewItemChange: (value: string) => void;
}

export function ShoppingListCategory({
  category,
  items,
  newItemValue,
  onNewItemChange,
}: ShoppingListCategoryProps) {
  const categoryInfo = CATEGORIES.find((c) => c.key === category);
  const remainingItems = items.filter((item) => !item.completed).length;
  const existingItemNames = items.map((item) => item.name);

  if (!categoryInfo) return null;

  return (
    <div className="border-tertiary/20 rounded-xl border bg-white p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{categoryInfo.emoji}</span>
          <div>
            <h3 className="text-night-horizon text-lg font-semibold">
              {categoryInfo.label}
            </h3>
            <p className="text-night-horizon/60 text-sm">
              {items.length} {LABELS.ITEMS}
            </p>
          </div>
        </div>
        <Badge className={`${categoryInfo.color} rounded-full px-3 py-1`}>
          {remainingItems} {LABELS.ITEMS_LEFT}
        </Badge>
      </div>

      {/* Add Item */}
      <div className="mb-4">
        <ShoppingListAddItem
          category={category}
          value={newItemValue}
          onChange={onNewItemChange}
          placeholder={`${LABELS.ADD_TO} ${categoryInfo.label}...`}
        />
      </div>

      {/* Quick Add */}
      <ShoppingListQuickAdd
        category={category}
        existingItems={existingItemNames}
      />

      {/* Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <ShoppingListItemComponent key={item.id} item={item} />
        ))}

        {items.length === 0 && <EmptyState />}
      </div>
    </div>
  );
}

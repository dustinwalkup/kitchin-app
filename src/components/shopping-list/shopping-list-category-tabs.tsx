import { Badge } from "@/components/ui/badge";
import { type CategoryKey, type ItemsByCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";

interface ShoppingListCategoryTabsProps {
  activeCategory: CategoryKey;
  itemsByCategory: ItemsByCategory;
  onCategoryChange: (category: CategoryKey) => void;
}

export function ShoppingListCategoryTabs({
  activeCategory,
  itemsByCategory,
  onCategoryChange,
}: ShoppingListCategoryTabsProps) {
  return (
    <div className="border-tertiary/20 rounded-xl border bg-white p-2">
      <div className="flex gap-1 overflow-x-auto">
        {CATEGORIES.map((category) => {
          const itemCount = itemsByCategory[category.key]?.length || 0;

          return (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-all ${
                activeCategory === category.key
                  ? "bg-cactus-flower text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              <span>{category.emoji}</span>
              <span className="hidden sm:inline">{category.label}</span>
              {itemCount > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {itemCount}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

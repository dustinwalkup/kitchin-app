import { useState } from "react";

import {
  useShoppingListId,
  useShoppingListItems,
  useShoppingListPreferences,
} from "@/hooks";

import { CATEGORIES, LABELS } from "@/lib/constants";
import { type CategoryKey } from "@/lib/types";

import { ShoppingListHeader } from "./shopping-list-header";
import { ShoppingListCategory } from "./shopping-list-category";
import { ShoppingListCategoryTabs } from "./shopping-list-category-tabs";
import { ShoppingListAddItem } from "./shopping-list-add-item";
import { ShoppingListQuickAdd } from "./shopping-list-quick-add";
import { ShoppingListItemComponent } from "./shopping-list-item";
import { EmptyState } from "./empty-state";

export function ShoppingList() {
  const shoppingListId = useShoppingListId() || "";
  const {
    itemsByCategory: groceryItems,
    totalItems,
    completedItems,
  } = useShoppingListItems();

  const { viewMode, activeCategory, updateViewMode, updateActiveCategory } =
    useShoppingListPreferences();

  const [newItems, setNewItems] = useState<Record<CategoryKey, string>>(
    {} as Record<CategoryKey, string>,
  );

  const handleNewItemChange = (category: CategoryKey, value: string) => {
    setNewItems((prev) => ({ ...prev, [category]: value }));
  };

  // List View
  const renderListView = () => (
    <div className="space-y-4">
      {CATEGORIES.map((category) => (
        <ShoppingListCategory
          key={category.key}
          category={category.key}
          items={groceryItems[category.key] || []}
          newItemValue={newItems[category.key] || ""}
          onNewItemChange={(value) => handleNewItemChange(category.key, value)}
          shoppingListId={shoppingListId}
        />
      ))}
    </div>
  );

  // Category View
  const renderCategoryView = () => {
    const category = CATEGORIES.find((c) => c.key === activeCategory);
    const items = groceryItems[activeCategory] || [];
    const existingItemNames = items.map((item) => item.name);

    if (!category) return null;

    return (
      <div className="space-y-4">
        <ShoppingListCategoryTabs
          activeCategory={activeCategory}
          itemsByCategory={groceryItems}
          onCategoryChange={updateActiveCategory}
        />

        <div className="border-tertiary/20 rounded-xl border bg-white p-4 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-3xl">{category.emoji}</span>
            <div>
              <h3 className="text-night-horizon text-xl font-semibold">
                {category.label}
              </h3>
              <p className="text-night-horizon/60 text-sm">
                {items.length} {LABELS.ITEMS}
              </p>
            </div>
          </div>

          {/* Add Item */}
          <div className="mb-4">
            <ShoppingListAddItem
              category={activeCategory}
              value={newItems[activeCategory] || ""}
              onChange={(value) => handleNewItemChange(activeCategory, value)}
              placeholder={`${LABELS.ADD_TO} ${category.label}...`}
              variant="large"
              shoppingListId={shoppingListId}
            />
          </div>

          {/* Quick Add */}
          <ShoppingListQuickAdd
            category={activeCategory}
            existingItems={existingItemNames}
            variant="large"
            shoppingListId={shoppingListId}
          />

          {/* Items List */}
          <div className="space-y-3">
            {items.map((item) => (
              <ShoppingListItemComponent
                key={item.id}
                item={item}
                variant="large"
              />
            ))}

            {items.length === 0 && (
              <EmptyState variant="large" description={LABELS.ADD_SOME_ITEMS} />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <ShoppingListHeader
        completedItems={completedItems}
        totalItems={totalItems}
        viewMode={viewMode}
        onViewModeChange={updateViewMode}
      />

      {viewMode === "list" ? renderListView() : renderCategoryView()}
    </div>
  );
}

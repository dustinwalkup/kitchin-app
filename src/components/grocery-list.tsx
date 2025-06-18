"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, ShoppingCart, Grid3X3, List } from "lucide-react";

const categories = [
  {
    key: "produce",
    label: "Produce",
    emoji: "🥬",
    color: "bg-tertiary/20 text-tertiary",
    border: "border-l-tertiary",
  },
  {
    key: "meat",
    label: "Meat",
    emoji: "🥩",
    color: "bg-accent/20 text-accent",
    border: "border-l-accent",
  },
  {
    key: "dairy",
    label: "Dairy",
    emoji: "🥛",
    color: "bg-primary/20 text-primary",
    border: "border-l-primary",
  },
  {
    key: "pantry",
    label: "Pantry",
    emoji: "🥫",
    color: "bg-cactus-flower/20 text-cactus-flower",
    border: "border-l-cactus-flower",
  },
  {
    key: "frozen",
    label: "Frozen",
    emoji: "🧊",
    color: "bg-secondary/30 text-cactus-flower",
    border: "border-l-secondary",
  },
  {
    key: "bakery",
    label: "Bakery",
    emoji: "🍞",
    color: "bg-pueblo-sand/60 text-night-horizon",
    border: "border-l-pueblo-sand",
  },
  {
    key: "other",
    label: "Other",
    emoji: "🛒",
    color: "bg-night-horizon/20 text-night-horizon",
    border: "border-l-night-horizon",
  },
];

const commonItems = {
  produce: ["Bananas", "Apples", "Onions", "Tomatoes", "Lettuce", "Carrots"],
  meat: ["Chicken", "Ground beef", "Eggs", "Bacon", "Salmon", "Turkey"],
  dairy: ["Milk", "Butter", "Cheese", "Yogurt", "Cream cheese", "Sour cream"],
  pantry: ["Rice", "Pasta", "Olive oil", "Salt", "Flour", "Sugar"],
  frozen: ["Berries", "Vegetables", "Ice cream", "Pizza", "Chicken"],
  bakery: ["Bread", "Bagels", "Tortillas", "Rolls"],
  other: ["Toilet paper", "Dish soap", "Toothpaste", "Paper towels"],
};

export function GroceryList() {
  const [viewMode, setViewMode] = useState<"all" | "category">("all");
  const [activeCategory, setActiveCategory] = useState("produce");
  const [newItems, setNewItems] = useState({});
  const [groceryItems, setGroceryItems] = useState({
    produce: [],
    meat: [],
    dairy: [],
    pantry: [],
    frozen: [],
    bakery: [],
    other: [],
  });

  const addItem = (category: string) => {
    const itemName = newItems[category]?.trim();
    if (itemName) {
      setGroceryItems((prev) => ({
        ...prev,
        [category]: [
          ...prev[category],
          {
            id: Date.now(),
            name: itemName,
            completed: false,
            quantity: "1",
          },
        ],
      }));
      setNewItems((prev) => ({ ...prev, [category]: "" }));
    }
  };

  const addCommonItem = (category: string, itemName: string) => {
    const exists = groceryItems[category]?.some(
      (item) => item.name.toLowerCase() === itemName.toLowerCase(),
    );

    if (!exists) {
      setGroceryItems((prev) => ({
        ...prev,
        [category]: [
          ...prev[category],
          {
            id: Date.now() + Math.random(),
            name: itemName,
            completed: false,
            quantity: "1",
          },
        ],
      }));
    }
  };

  const toggleItem = (category: string, itemId: number) => {
    setGroceryItems((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      ),
    }));
  };

  const removeItem = (category: string, itemId: number) => {
    setGroceryItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== itemId),
    }));
  };

  const updateQuantity = (
    category: string,
    itemId: number,
    quantity: string,
  ) => {
    setGroceryItems((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    }));
  };

  const getTotalItems = () => {
    return Object.values(groceryItems).reduce(
      (total, items: any) => total + items.length,
      0,
    );
  };

  const getCompletedItems = () => {
    return Object.values(groceryItems).reduce(
      (total, items: any) =>
        total + items.filter((item) => item.completed).length,
      0,
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Shopping Header */}
      <div className="border-tertiary/20 rounded-xl border bg-white p-4 sm:p-6">
        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="bg-cactus-flower/20 flex h-10 w-10 items-center justify-center rounded-lg">
              <ShoppingCart className="text-cactus-flower h-5 w-5" />
            </div>
            <div>
              <h2 className="text-night-horizon text-lg font-semibold sm:text-xl">
                Shopping List
              </h2>
              <p className="text-night-horizon/60 text-sm">
                {getCompletedItems()}/{getTotalItems()} items completed
              </p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex rounded-lg bg-gray-50 p-1">
            <button
              onClick={() => setViewMode("all")}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
                viewMode === "all"
                  ? "text-night-horizon bg-white shadow-sm"
                  : "text-night-horizon/60"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden sm:inline">All Categories</span>
            </button>
            <button
              onClick={() => setViewMode("category")}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
                viewMode === "category"
                  ? "text-night-horizon bg-white shadow-sm"
                  : "text-night-horizon/60"
              }`}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">By Category</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full rounded-full bg-gray-200">
          <div
            className="bg-cactus-flower h-3 rounded-full transition-all duration-500"
            style={{
              width: `${Math.round((getCompletedItems() / getTotalItems()) * 100) || 0}%`,
            }}
          />
        </div>
        <div className="mt-2 text-right">
          <span className="text-cactus-flower text-lg font-semibold">
            {Math.round((getCompletedItems() / getTotalItems()) * 100) || 0}%
          </span>
        </div>
      </div>

      {/* All Categories View */}
      {viewMode === "all" && (
        <div className="grid gap-4 sm:gap-6">
          {categories.map((category) => (
            <div
              key={category.key}
              className={`rounded-xl border-l-4 bg-white ${category.border} border-tertiary/20 border-t border-r border-b p-4 sm:p-6`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <div>
                    <h3 className="text-night-horizon text-lg font-semibold">
                      {category.label}
                    </h3>
                    <p className="text-night-horizon/60 text-sm">
                      {groceryItems[category.key]?.length || 0} items
                    </p>
                  </div>
                </div>
                <Badge className={`${category.color} rounded-full px-3 py-1`}>
                  {groceryItems[category.key]?.filter((item) => !item.completed)
                    .length || 0}{" "}
                  left
                </Badge>
              </div>

              {/* Add Item */}
              <div className="mb-4 flex gap-2">
                <Input
                  placeholder={`Add to ${category.label}...`}
                  value={newItems[category.key] || ""}
                  onChange={(e) =>
                    setNewItems((prev) => ({
                      ...prev,
                      [category.key]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && addItem(category.key)}
                  className="border-tertiary/30 h-9 flex-1"
                />
                <Button
                  onClick={() => addItem(category.key)}
                  size="sm"
                  className="bg-cactus-flower hover:bg-cactus-flower/90 h-9"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Add */}
              <div className="mb-4">
                <div className="text-night-horizon/60 mb-2 text-xs">
                  Quick add:
                </div>
                <div className="flex flex-wrap gap-1">
                  {commonItems[category.key]?.map((item) => {
                    const exists = groceryItems[category.key]?.some(
                      (groceryItem) =>
                        groceryItem.name.toLowerCase() === item.toLowerCase(),
                    );
                    return (
                      <Button
                        key={item}
                        variant="outline"
                        size="sm"
                        onClick={() => addCommonItem(category.key, item)}
                        disabled={exists}
                        className={`h-7 text-xs ${exists ? "opacity-50" : "hover:bg-secondary/20 border-tertiary/30"}`}
                      >
                        {exists ? "✓ " : ""}
                        {item}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {groceryItems[category.key]?.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
                      item.completed
                        ? "border-gray-200 bg-gray-50 opacity-60"
                        : "border-tertiary/20 hover:border-primary/30 bg-white"
                    }`}
                  >
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(category.key, item.id)}
                    />
                    <span
                      className={`flex-1 ${item.completed ? "text-gray-500 line-through" : ""}`}
                    >
                      {item.name}
                    </span>
                    <Input
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(category.key, item.id, e.target.value)
                      }
                      className="border-tertiary/30 h-7 w-12 text-center text-xs"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(category.key, item.id)}
                      className="text-accent hover:text-accent/80 hover:bg-accent/10 h-7 w-7 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}

                {(!groceryItems[category.key] ||
                  groceryItems[category.key].length === 0) && (
                  <div className="py-6 text-center text-gray-400">
                    <p className="text-sm">No items yet</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category View */}
      {viewMode === "category" && (
        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="border-tertiary/20 rounded-xl border bg-white p-2">
            <div className="flex gap-1 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-all ${
                    activeCategory === category.key
                      ? "bg-cactus-flower text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span>{category.emoji}</span>
                  <span className="hidden sm:inline">{category.label}</span>
                  {groceryItems[category.key]?.length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {groceryItems[category.key].length}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Category Content */}
          {(() => {
            const category = categories.find((c) => c.key === activeCategory);
            return (
              <div className="border-tertiary/20 rounded-xl border bg-white p-4 sm:p-6">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-3xl">{category?.emoji}</span>
                  <div>
                    <h3 className="text-night-horizon text-xl font-semibold">
                      {category?.label}
                    </h3>
                    <p className="text-night-horizon/60 text-sm">
                      {groceryItems[activeCategory]?.length || 0} items
                    </p>
                  </div>
                </div>

                {/* Add Item */}
                <div className="mb-4 flex gap-2">
                  <Input
                    placeholder={`Add to ${category?.label}...`}
                    value={newItems[activeCategory] || ""}
                    onChange={(e) =>
                      setNewItems((prev) => ({
                        ...prev,
                        [activeCategory]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && addItem(activeCategory)
                    }
                    className="border-tertiary/30 h-10 flex-1"
                  />
                  <Button
                    onClick={() => addItem(activeCategory)}
                    className="bg-cactus-flower hover:bg-cactus-flower/90 h-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Add */}
                <div className="mb-6">
                  <div className="text-night-horizon/60 mb-3 text-sm">
                    Quick add:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {commonItems[activeCategory]?.map((item) => {
                      const exists = groceryItems[activeCategory]?.some(
                        (groceryItem) =>
                          groceryItem.name.toLowerCase() === item.toLowerCase(),
                      );
                      return (
                        <Button
                          key={item}
                          variant="outline"
                          size="sm"
                          onClick={() => addCommonItem(activeCategory, item)}
                          disabled={exists}
                          className={`h-8 text-sm ${exists ? "opacity-50" : "hover:bg-secondary/20 border-tertiary/30"}`}
                        >
                          {exists ? "✓ " : ""}
                          {item}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {groceryItems[activeCategory]?.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${
                        item.completed
                          ? "border-gray-200 bg-gray-50 opacity-60"
                          : "border-tertiary/20 hover:border-primary/30 bg-white hover:shadow-sm"
                      }`}
                    >
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() =>
                          toggleItem(activeCategory, item.id)
                        }
                        className="h-5 w-5"
                      />
                      <span
                        className={`flex-1 text-lg ${item.completed ? "text-gray-500 line-through" : "text-night-horizon"}`}
                      >
                        {item.name}
                      </span>
                      <Input
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            activeCategory,
                            item.id,
                            e.target.value,
                          )
                        }
                        className="border-tertiary/30 h-9 w-16 text-center"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(activeCategory, item.id)}
                        className="text-accent hover:text-accent/80 hover:bg-accent/10 h-9 w-9 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {(!groceryItems[activeCategory] ||
                    groceryItems[activeCategory].length === 0) && (
                    <div className="py-12 text-center text-gray-400">
                      <ShoppingCart className="mx-auto mb-4 h-12 w-12 opacity-50" />
                      <p className="text-lg">No items yet</p>
                      <p className="text-sm">Add some items to get started</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

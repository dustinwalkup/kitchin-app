// Application Domain Types
export type CategoryKey =
  | "produce"
  | "meat"
  | "dairy"
  | "pantry"
  | "frozen"
  | "bakery"
  | "other";

export type MealType = "breakfast" | "lunch" | "dinner";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

// Component Types
export type ShoppingListItem = {
  id: string;
  name: string;
  completed: boolean;
  quantity: string;
  unit: string | null;
  notes: string | null;
};

export type ItemsByCategory = Record<CategoryKey, ShoppingListItem[]>;

// View Mode Types
export type ShoppingListViewMode = "list" | "category";
export type MealPlannerViewMode = "week" | "day";

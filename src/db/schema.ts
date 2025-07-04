import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  pgEnum,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

// Enums
export const mealTypeEnum = pgEnum("meal_type", [
  "breakfast",
  "lunch",
  "dinner",
]);
export const dayOfWeekEnum = pgEnum("day_of_week", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);
export const groceryCategoryEnum = pgEnum("grocery_category", [
  "produce",
  "meat",
  "dairy",
  "pantry",
  "frozen",
  "bakery",
  "other",
]);

// Meal plans table (weekly meal plans)
export const mealPlans = pgTable("meal_plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).default("Weekly Plan"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Individual meals
export const meals = pgTable("meals", {
  id: uuid("id").primaryKey().defaultRandom(),
  mealPlanId: uuid("meal_plan_id")
    .references(() => mealPlans.id, { onDelete: "cascade" })
    .notNull(),
  dayOfWeek: dayOfWeekEnum("day_of_week").notNull(),
  mealType: mealTypeEnum("meal_type").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Shopping lists
export const shoppingLists = pgTable("shopping_lists", {
  id: uuid("id").primaryKey().defaultRandom(),
  mealPlanId: uuid("meal_plan_id").references(() => mealPlans.id, {
    onDelete: "set null",
  }),
  name: varchar("name", { length: 255 }).default("Shopping List"),
  isActive: boolean("is_active").default(true).notNull(),
  estimatedBudget: integer("estimated_budget"), // in cents
  actualCost: integer("actual_cost"), // in cents
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Shopping list items
export const shoppingListItems = pgTable("shopping_list_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  shoppingListId: uuid("shopping_list_id")
    .references(() => shoppingLists.id, { onDelete: "cascade" })
    .notNull(),
  category: groceryCategoryEnum("category").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  quantity: varchar("quantity", { length: 50 }).default("1"),
  unit: varchar("unit", { length: 50 }),
  estimatedPrice: integer("estimated_price"), // in cents
  actualPrice: integer("actual_price"), // in cents
  notes: text("notes"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Common grocery items (for quick-add functionality)
export const commonGroceryItems = pgTable("common_grocery_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  category: groceryCategoryEnum("category").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  defaultQuantity: varchar("default_quantity", { length: 50 }).default("1"),
  defaultUnit: varchar("default_unit", { length: 50 }),
  estimatedPrice: integer("estimated_price"), // in cents
  useCount: integer("use_count").default(0),
  isGlobal: boolean("is_global").default(false), // Global items available to all households
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Type exports for use in the application
export type MealPlan = typeof mealPlans.$inferSelect;
export type NewMealPlan = typeof mealPlans.$inferInsert;
export type Meal = typeof meals.$inferSelect;
export type NewMeal = typeof meals.$inferInsert;
export type ShoppingList = typeof shoppingLists.$inferSelect;
export type NewShoppingList = typeof shoppingLists.$inferInsert;
export type ShoppingListItem = typeof shoppingListItems.$inferSelect;
export type NewShoppingListItem = typeof shoppingListItems.$inferInsert;
export type CommonGroceryItem = typeof commonGroceryItems.$inferSelect;
export type NewCommonGroceryItem = typeof commonGroceryItems.$inferInsert;

export const schema = {
  meals,
  mealPlans,
  shoppingLists,
  shoppingListItems,
  commonGroceryItems,
};

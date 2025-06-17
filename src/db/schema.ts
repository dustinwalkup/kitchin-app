import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// Meal ingredients (for recipe integration)
export const mealIngredients = pgTable("meal_ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const schema = {
  mealIngredients,
  // ... more tables
};

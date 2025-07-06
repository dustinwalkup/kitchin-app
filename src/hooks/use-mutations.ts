import { useZero } from "@rocicorp/zero/react";
import { v4 as uuidv4 } from "uuid";
import type { Schema } from "../../zero-schema.gen";

type MealType = "breakfast" | "lunch" | "dinner";
type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
type CategoryKey =
  | "produce"
  | "meat"
  | "dairy"
  | "pantry"
  | "frozen"
  | "bakery"
  | "other";

export function useMutations() {
  const z = useZero<Schema>();

  // Meal mutations
  const updateMeal = (mealId: string, notes: string) => {
    z.mutate.meals.update({ id: mealId, notes });
  };

  const createMeal = (
    mealPlanId: string,
    day: DayOfWeek,
    type: MealType,
    notes: string,
  ) => {
    const newMeal = {
      id: uuidv4(),
      mealPlanId,
      dayOfWeek: day,
      mealType: type,
      notes,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    z.mutate.meals.insert(newMeal);
  };

  // Shopping list item mutations
  const createShoppingListItem = (
    shoppingListId: string,
    category: CategoryKey,
    name: string,
    quantity: string = "1",
  ) => {
    const newItem = {
      id: uuidv4(),
      shoppingListId,
      category,
      name,
      quantity,
      isCompleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    z.mutate.shoppingListItems.insert(newItem);
  };

  const updateShoppingListItem = (
    itemId: string,
    updates: Partial<{
      isCompleted: boolean;
      quantity: string;
      notes: string;
    }>,
  ) => {
    z.mutate.shoppingListItems.update({
      id: itemId,
      ...updates,
      updatedAt: Date.now(),
    });
  };

  const toggleShoppingListItem = (itemId: string, isCompleted: boolean) => {
    z.mutate.shoppingListItems.update({
      id: itemId,
      isCompleted,
      completedAt: isCompleted ? Date.now() : null,
      updatedAt: Date.now(),
    });
  };

  const deleteShoppingListItem = (itemId: string) => {
    z.mutate.shoppingListItems.delete({ id: itemId });
  };

  // Meal plan mutations
  const createMealPlan = (name: string = "My Meal Plan") => {
    const newMealPlan = {
      id: uuidv4(),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    z.mutate.mealPlans.insert(newMealPlan);
    return newMealPlan;
  };

  // Shopping list mutations
  const createShoppingList = (
    mealPlanId: string,
    name: string = "My Shopping List",
  ) => {
    const newShoppingList = {
      id: uuidv4(),
      name,
      isActive: true,
      mealPlanId,
      estimatedBudget: null,
      actualCost: null,
      completedAt: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    z.mutate.shoppingLists.insert(newShoppingList);
    return newShoppingList;
  };

  return {
    // Meal operations
    updateMeal,
    createMeal,

    // Shopping list item operations
    createShoppingListItem,
    updateShoppingListItem,
    toggleShoppingListItem,
    deleteShoppingListItem,

    // Plan operations
    createMealPlan,
    createShoppingList,
  };
}

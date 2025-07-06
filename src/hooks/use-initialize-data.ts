import { useEffect, useRef } from "react";
import { useZero, useQuery } from "@rocicorp/zero/react";
import { v4 as uuidv4 } from "uuid";
import type { Schema } from "../../zero-schema.gen";

export function useInitializeData() {
  const z = useZero<Schema>();
  const mealPlansQuery = useQuery(z.query.mealPlans);
  const shoppingListsQuery = useQuery(z.query.shoppingLists);
  const hasInitialized = useRef(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check if we already have data
        const mealPlans = mealPlansQuery[0] || [];
        const shoppingLists = shoppingListsQuery[0] || [];

        // Only initialize if no data exists and we haven't initialized yet
        if (
          mealPlans.length === 0 &&
          shoppingLists.length === 0 &&
          !hasInitialized.current
        ) {
          hasInitialized.current = true;
          console.log("Initializing default data for new user...");

          // Create a default meal plan
          const defaultMealPlan = {
            id: uuidv4(),
            name: "My Meal Plan",
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          await z.mutate.mealPlans.insert(defaultMealPlan);

          // Create a default shopping list
          const defaultShoppingList = {
            id: uuidv4(),
            name: "My Shopping List",
            isActive: true,
            mealPlanId: defaultMealPlan.id,
            estimatedBudget: null,
            actualCost: null,
            completedAt: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          await z.mutate.shoppingLists.insert(defaultShoppingList);

          console.log("Default data initialized successfully!");
        }
      } catch (error) {
        console.error("Error initializing default data:", error);
      }
    };

    // Run initialization when queries change
    initializeData();
  }, [z, mealPlansQuery, shoppingListsQuery]);
}

import { createFileRoute } from "@tanstack/react-router";
import { MealPlanner } from "@/components/meal-planner";
import { Zero } from "@rocicorp/zero";
import type { Schema } from "../../zero-schema.gen";

function preloadMealsData(zero: Zero<Schema>) {
  // Strategic preloading for meals route
  zero.query.mealPlans.preload({ ttl: "1m" });
  zero.query.meals.preload({ ttl: "1m" });
}

export const Route = createFileRoute("/meals")({
  loader: async ({ context }) => {
    const { zero } = context;
    preloadMealsData(zero);

    // Return a promise that resolves when data is loaded
    // This ensures the route waits for critical data
    return Promise.resolve();
  },
  component: () => <MealPlanner />,
});

import { useMemo } from "react";
import { useZero, useQuery } from "@rocicorp/zero/react";
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

type MealsMap = Record<DayOfWeek, Record<MealType, string>>;

export function useMeals(mealPlanId?: string) {
  const z = useZero<Schema>();
  const mealsQuery = useQuery(z.query.meals);

  const meals = useMemo<MealsMap>(() => {
    const map = {
      monday: { breakfast: "", lunch: "", dinner: "" },
      tuesday: { breakfast: "", lunch: "", dinner: "" },
      wednesday: { breakfast: "", lunch: "", dinner: "" },
      thursday: { breakfast: "", lunch: "", dinner: "" },
      friday: { breakfast: "", lunch: "", dinner: "" },
      saturday: { breakfast: "", lunch: "", dinner: "" },
      sunday: { breakfast: "", lunch: "", dinner: "" },
    };

    const meals = mealsQuery[0] || [];

    // Filter by meal plan if provided
    const filteredMeals = mealPlanId
      ? meals.filter((meal) => meal.mealPlanId === mealPlanId)
      : meals;

    for (const meal of filteredMeals) {
      const day = meal.dayOfWeek as DayOfWeek;
      const type = meal.mealType as MealType;
      map[day][type] = meal.notes ?? "";
    }

    return map;
  }, [mealsQuery, mealPlanId]);

  const rawMeals = mealsQuery[0] || [];

  return {
    meals,
    rawMeals,
  };
}

import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { useMeals } from "@/hooks/use-meals";
import { useMutations } from "@/hooks/use-mutations";

import { DAYS, MEAL_TYPES, LABELS } from "@/lib/constants";
import { type DayOfWeek, type MealType } from "@/lib/types";

export function MealPlanner() {
  const { meals, rawMeals } = useMeals();
  const { updateMeal, createMeal } = useMutations();

  const handleMealChange = (day: string, type: string, notes: string) => {
    const existingMeal = rawMeals.find(
      (m) => m.dayOfWeek === day && m.mealType === type,
    );

    if (existingMeal) {
      updateMeal(existingMeal.id!, notes);
    } else {
      // Get the meal plan ID from the first meal (since there's only one meal plan)
      const mealPlanId = rawMeals[0]?.mealPlanId;
      if (!mealPlanId) {
        console.error("No meal plan found. Please refresh the page.");
        return;
      }

      createMeal(mealPlanId, day as DayOfWeek, type as MealType, notes);
    }
  };

  const getMealCount = (day: DayOfWeek) => {
    return Object.values(meals[day]).filter((meal) => meal && meal.trim())
      .length;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="border-tertiary/20 rounded-xl border bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-night-horizon text-lg font-semibold sm:text-xl">
            {LABELS.MEAL_PLANNING}
          </h2>
        </div>
      </div>

      <div className="grid gap-4">
        {DAYS.map((day) => (
          <div
            key={day.key}
            className={`rounded-xl border-l-4 bg-white ${day.color} border-secondary/20 border-b border-r border-t p-4 sm:p-6`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-night-horizon text-lg font-semibold">
                {day.full}
              </h3>
              <Badge variant="outline" className="text-xs">
                {getMealCount(day.key)}/3
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {MEAL_TYPES?.map((meal) => (
                <div key={meal.key} className="space-y-2">
                  <div
                    className={`flex items-center gap-2 rounded-lg p-2 ${meal.bg}`}
                  >
                    <meal.icon className={`h-4 w-4 ${meal.color}`} />
                    <span className="text-sm font-medium capitalize">
                      {meal.key}
                    </span>
                  </div>
                  <Textarea
                    placeholder={`${meal.key}...`}
                    value={meals[day.key][meal.key]}
                    onChange={(e) =>
                      handleMealChange(day.key, meal.key, e.target.value)
                    }
                    className="border-tertiary/30 min-h-[80px] resize-none text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

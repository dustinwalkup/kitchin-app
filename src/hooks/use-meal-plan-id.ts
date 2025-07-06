import { useMemo } from "react";
import { useZero, useQuery } from "@rocicorp/zero/react";
import type { Schema } from "../../zero-schema.gen";

export function useMealPlanId() {
  const z = useZero<Schema>();
  const mealPlansQuery = useQuery(z.query.mealPlans);

  const mealPlanId = useMemo(() => {
    const plans = mealPlansQuery[0] || [];

    // Since we initialize with exactly one meal plan, optimize for that case
    if (plans.length === 1) {
      return plans[0]?.id;
    }

    // Fallback for edge cases
    return plans[0]?.id;
  }, [mealPlansQuery[0]]); // Use the specific array instead of the entire query object

  return mealPlanId;
}

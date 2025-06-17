import { Schema, schema } from "./zero-schema.gen";
import { ANYONE_CAN_DO_ANYTHING, definePermissions } from "@rocicorp/zero";

export { schema };

export const permissions = definePermissions<unknown, Schema>(schema, () => ({
  mealIngredients: ANYONE_CAN_DO_ANYTHING,
}));

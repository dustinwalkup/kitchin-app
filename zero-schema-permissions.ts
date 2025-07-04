import { Schema, schema } from "./zero-schema.gen";
import { ANYONE_CAN_DO_ANYTHING, definePermissions } from "@rocicorp/zero";

export { schema };

export const permissions = definePermissions<unknown, Schema>(schema, () => ({
  meals: ANYONE_CAN_DO_ANYTHING,
  mealPlans: ANYONE_CAN_DO_ANYTHING,
  shoppingLists: ANYONE_CAN_DO_ANYTHING,
  shoppingListItems: ANYONE_CAN_DO_ANYTHING,
  commonGroceryItems: ANYONE_CAN_DO_ANYTHING,
}));

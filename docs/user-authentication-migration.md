# User Authentication Migration Guide

This guide explains how to migrate the app to support user authentication when you're ready to add it.

## Current State

The app is currently set up to work with a single user (anonymous) and is ready for multi-user support. Zero handles user isolation through permissions, not client-side filtering.

## How Zero Handles Users

Zero is designed to be user-aware from the start:

1. **Zero Client**: Each user gets their own Zero client instance with a unique `userID`
2. **Permissions**: Zero handles user isolation at the server level through permissions
3. **No Client-Side Filtering**: You don't need to filter data by user in your hooks

## Migration Steps

### 1. Update Database Schema

Add user fields to your tables in `src/db/schema.ts`:

```typescript
// Add userId field to meal plans
export const mealPlans = pgTable("meal_plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // Add this field
  name: varchar("name", { length: 255 }).default("Weekly Plan"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Add userId field to meals
export const meals = pgTable("meals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // Add this field
  mealPlanId: uuid("meal_plan_id")
    .references(() => mealPlans.id, { onDelete: "cascade" })
    .notNull(),
  // ... rest of fields
});

// Add userId field to shopping lists
export const shoppingLists = pgTable("shopping_lists", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // Add this field
  mealPlanId: uuid("meal_plan_id").references(() => mealPlans.id, {
    onDelete: "set null",
  }),
  // ... rest of fields
});

// Add userId field to shopping list items
export const shoppingListItems = pgTable("shopping_list_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(), // Add this field
  shoppingListId: uuid("shopping_list_id")
    .references(() => shoppingLists.id, { onDelete: "cascade" })
    .notNull(),
  // ... rest of fields
});
```

### 2. Update Zero Schema

After updating the Drizzle schema, regenerate the Zero schema:

```bash
npm run generate:zero
```

### 3. Update Permissions (Most Important)

Update `zero-schema-permissions.ts` to include user-based permissions:

```typescript
export const permissions = definePermissions<unknown, Schema>(
  schema,
  (ctx) => ({
    meals: {
      read: (meal) => meal.userId === ctx.userID,
      write: (meal) => meal.userId === ctx.userID,
    },
    mealPlans: {
      read: (plan) => plan.userId === ctx.userID,
      write: (plan) => plan.userId === ctx.userID,
    },
    shoppingLists: {
      read: (list) => list.userId === ctx.userID,
      write: (list) => list.userId === ctx.userID,
    },
    shoppingListItems: {
      read: (item) => item.userId === ctx.userID,
      write: (item) => item.userId === ctx.userID,
    },
    // Common items can be shared across users
    commonGroceryItems: ANYONE_CAN_DO_ANYTHING,
  }),
);
```

### 4. Enable User ID in Mutations

**In `src/hooks/use-mutations.ts`:**

```typescript
// Add userId field in all mutation functions:
const newMeal = {
  id: uuidv4(),
  userId, // Add this
  mealPlanId,
  // ... rest of fields
};
```

### 5. Update Zero Client

Update the Zero client in `src/main.tsx` to use the authenticated user ID:

```typescript
// Replace the hardcoded userID with dynamic user ID
const z = new Zero({
  userID: getCurrentUserId(), // Replace with your auth function
  server: import.meta.env.VITE_ZERO_SERVER || "http://localhost:4848",
  schema,
});
```

## Benefits of This Approach

1. **Zero-Native**: Follows Zero's built-in user isolation patterns
2. **Server-Side Security**: User isolation happens at the server level through permissions
3. **No Client-Side Filtering**: Zero automatically filters data based on user context
4. **Performance**: User filtering is handled efficiently by Zero's server
5. **Security**: Users can only access their own data through Zero's permission system

## Testing

After migration, test that:

- Each user only sees their own data
- Data is properly isolated between users
- Performance remains good with user filtering
- All mutations work correctly with user IDs

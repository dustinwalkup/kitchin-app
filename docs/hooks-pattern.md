# Senior-Level React Hooks Pattern

## Overview

This document outlines the hooks-based architecture pattern used in this application, which follows senior-level React development practices.

## Hook Categories

### 1. Data Hooks (Queries)

These hooks handle data fetching and provide optimized access to application state.

```typescript
// use-meals.ts
export function useMeals(mealPlanId?: string) {
  const z = useZero<Schema>();
  const mealsQuery = useQuery(z.query.meals);

  const meals = useMemo(() => {
    // Transform and filter data
    return processedMeals;
  }, [mealsQuery, mealPlanId]);

  return { meals, rawMeals };
}
```

**Benefits:**

- Centralized data transformation logic
- Memoized computations for performance
- Reusable across components
- Type-safe data access

### 2. ID Hooks (Caching)

These hooks provide efficient access to frequently-used IDs.

```typescript
// use-meal-plan-id.ts
export function useMealPlanId() {
  const z = useZero<Schema>();
  const mealPlansQuery = useQuery(z.query.mealPlans);

  return useMemo(() => {
    const mealPlans = mealPlansQuery[0] || [];
    return mealPlans[0]?.id || null;
  }, [mealPlansQuery]);
}
```

**Benefits:**

- Eliminates redundant queries
- Provides consistent caching
- Reduces component complexity

### 3. Mutation Hooks (Operations)

These hooks centralize all data modification operations.

```typescript
// use-mutations.ts
export function useMutations() {
  const z = useZero<Schema>();

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

  return { createMeal, updateMeal, deleteMeal };
}
```

**Benefits:**

- Centralized business logic
- Consistent error handling
- Easier testing and mocking
- Type-safe operations

## Component Usage

### Before (Junior Level)

```typescript
export function MealPlanner() {
  const z = useZero<Schema>();
  const mealsQuery = useQuery(z.query.meals);
  const mealPlanId = useMealPlanId();

  const meals = useMemo(() => {
    // Complex transformation logic inline
  }, [mealsQuery]);

  const handleMealChange = (day: string, type: string, notes: string) => {
    // Complex mutation logic inline
  };

  // Component logic mixed with data logic
}
```

### After (Senior Level)

```typescript
export function MealPlanner() {
  const mealPlanId = useMealPlanId();
  const { meals, rawMeals } = useMeals(mealPlanId || undefined);
  const { updateMeal, createMeal } = useMutations();

  const handleMealChange = (day: string, type: string, notes: string) => {
    const existingMeal = rawMeals.find(
      (m) => m.dayOfWeek === day && m.mealType === type,
    );

    if (existingMeal) {
      updateMeal(existingMeal.id!, notes);
    } else {
      createMeal(mealPlanId!, day as DayOfWeek, type as MealType, notes);
    }
  };

  // Pure UI logic
}
```

## Benefits of This Pattern

### 1. Separation of Concerns

- **Data Logic**: Isolated in hooks
- **UI Logic**: Focused in components
- **Business Logic**: Centralized in mutation hooks

### 2. Reusability

- Hooks can be used across multiple components
- Consistent data access patterns
- Shared business logic

### 3. Testability

- Hooks can be tested independently
- Easy to mock data and mutations
- Clear input/output contracts

### 4. Performance

- Optimized memoization
- Reduced redundant queries
- Better caching strategies

### 5. Maintainability

- Centralized data access
- Consistent error handling
- Type-safe operations
- Easier debugging

### 6. Developer Experience

- Clear API contracts
- Better IntelliSense
- Reduced cognitive load in components
- Easier onboarding for new developers

## Best Practices

1. **Single Responsibility**: Each hook should have one clear purpose
2. **Composition**: Combine simple hooks to create complex ones
3. **Memoization**: Use `useMemo` for expensive computations
4. **Type Safety**: Leverage TypeScript for better developer experience
5. **Error Handling**: Centralize error handling in hooks
6. **Documentation**: Document complex hooks with JSDoc

## File Organization

```
src/hooks/
├── index.ts              # Central exports
├── use-meals.ts          # Data hook
├── use-shopping-list-items.ts  # Data hook
├── use-meal-plan-id.ts   # ID hook
├── use-shopping-list-id.ts     # ID hook
├── use-mutations.ts      # Mutation hook
└── use-initialize-data.ts      # Initialization hook
```

This pattern scales well as the application grows and provides a solid foundation for maintainable, performant React applications.

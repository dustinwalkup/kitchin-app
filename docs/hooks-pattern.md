# Senior-Level React Hooks Pattern

## Overview

This document outlines the hooks-based architecture pattern used in this application, which follows senior-level React development practices.

## File Organization

```
src/
├── lib/
│   ├── types.ts        # All application type definitions
│   ├── constants.ts    # All application constants and labels
│   └── utils.ts        # Utility functions
├── hooks/
│   ├── index.ts        # Central exports
│   ├── use-meals.ts    # Data hook
│   ├── use-shopping-list-items.ts  # Data hook
│   ├── use-meal-plan-id.ts   # ID hook
│   ├── use-shopping-list-id.ts     # ID hook
│   └── use-mutations.ts      # Mutation hook
└── components/
    ├── meal-planner.tsx
    └── shopping-list/
        ├── index.ts                    # Main export
        ├── shopping-list.tsx           # Main container component
        ├── shopping-list-header.tsx    # Header with progress
        ├── shopping-list-item.tsx      # Individual item component
        ├── shopping-list-category.tsx  # Category section (list view)
        ├── shopping-list-category-tabs.tsx # Category tabs
        ├── shopping-list-add-item.tsx  # Add item form
        ├── shopping-list-quick-add.tsx # Quick add buttons
        └── empty-state.tsx             # Empty state component
```

## Text Label Organization

### Strategy for Organizing Text Labels

Text labels are organized using a **hybrid approach** based on scope and reusability:

#### 1. **Global Labels → `src/lib/constants.ts`**

Labels used across multiple components or representing core application concepts:

```typescript
// src/lib/constants.ts
export const LABELS = {
  // App-wide labels
  APP_NAME: "Kitchin",
  MEAL_PLANNING: "Meal Planning",
  SHOPPING_LIST: "Shopping List",

  // Common UI labels
  QUICK_ADD: "Quick add:",
  ITEMS: "items",
  ITEMS_LEFT: "left",
  ITEMS_COMPLETED: "items completed",
  ADD_TO: "Add to",

  // Empty states
  NO_ITEMS_YET: "No items yet",
  ADD_SOME_ITEMS: "Add some items to get started",
} as const;
```

#### 2. **Component-Specific Labels → Top of Component File**

Labels used only within a single component:

```typescript
// At the top of shopping-list-header.tsx
const LABELS = {
  PROGRESS_PERCENTAGE: "progress",
  VIEW_MODE_LIST: "List",
  VIEW_MODE_CATEGORY: "Category",
} as const;
```

#### 3. **Dynamic Labels → Inline**

Labels that depend on dynamic data (like category names) stay inline since they're contextual:

```typescript
// Dynamic labels remain inline
placeholder={`${LABELS.ADD_TO} ${categoryInfo.label}...`}
```

### Benefits of This Approach

1. **Centralized Management**: Global labels are in one place
2. **Type Safety**: TypeScript provides autocomplete and error checking
3. **Consistency**: Ensures consistent terminology across the app
4. **Internationalization Ready**: Easy to replace with i18n system
5. **Maintainability**: Single source of truth for common labels
6. **Performance**: No unnecessary prop drilling for static text

### Usage Examples

```typescript
// ✅ Good: Using global labels
import { LABELS } from "@/lib/constants";

<h2>{LABELS.MEAL_PLANNING}</h2>
<p>{completedItems}/{totalItems} {LABELS.ITEMS_COMPLETED}</p>

// ✅ Good: Component-specific labels
const LABELS = {
  VIEW_MODE_LIST: "List",
  VIEW_MODE_CATEGORY: "Category",
} as const;

// ✅ Good: Dynamic labels remain inline
placeholder={`${LABELS.ADD_TO} ${category.label}...`}

// ❌ Bad: Hardcoded strings scattered throughout
<h2>Meal Planning</h2> // ❌ Hardcoded
<p>items completed</p> // ❌ Hardcoded
```

## Component Organization

### Component Breakdown Strategy

Large components are broken down into smaller, focused components following these principles:

1. **Single Responsibility**: Each component has one clear purpose
2. **Reusability**: Components can be reused across different views
3. **Props Interface**: Clear, typed interfaces for component communication
4. **Variant Support**: Components support different variants (compact/large)
5. **Composition**: Components compose together to create complex UIs
6. **Self-Contained**: Components import their own hooks and dependencies

### Example: Shopping List Component Breakdown

```typescript
// Main Container (shopping-list.tsx)
export function ShoppingList() {
  // State management and orchestration logic only
  const [viewMode, setViewMode] = useState<ShoppingListViewMode>("list");

  // Render methods
  const renderListView = () => (/* ... */);
  const renderCategoryView = () => (/* ... */);

  return (
    <div>
      <ShoppingListHeader {...headerProps} />
      {viewMode === "list" ? renderListView() : renderCategoryView()}
    </div>
  );
}

// Self-Contained Item Component (shopping-list-item.tsx)
interface ShoppingListItemProps {
  item: ShoppingListItem;
  variant?: "compact" | "large";
}

export function ShoppingListItemComponent({ item, variant }: ShoppingListItemProps) {
  // Component imports its own hooks
  const { updateShoppingListItem, deleteShoppingListItem } = useMutations();

  // Component handles its own business logic
  const handleToggle = () => {
    updateShoppingListItem(item.id, { isCompleted: !item.completed });
  };

  // Pure UI logic
}
```

### Hook Integration Pattern

**✅ Good: Components import their own hooks**

```typescript
// shopping-list-item.tsx
export function ShoppingListItemComponent({ item, variant }: ShoppingListItemProps) {
  const { updateShoppingListItem } = useMutations();

  const handleToggle = () => {
    updateShoppingListItem(item.id, { isCompleted: !item.completed });
  };

  return (
    <Checkbox onCheckedChange={handleToggle} />
  );
}
```

**❌ Bad: Prop drilling hooks**

```typescript
// shopping-list-item.tsx
interface ShoppingListItemProps {
  item: ShoppingListItem;
  onToggle: (itemId: string) => void; // ❌ Don't pass functions as props
  onRemove: (itemId: string) => void;
}

export function ShoppingListItemComponent({ item, onToggle, onRemove }: ShoppingListItemProps) {
  return (
    <Checkbox onCheckedChange={() => onToggle(item.id)} /> // ❌ Prop drilling
  );
}
```

## Type Organization

### `src/lib/types.ts`

Centralized type definitions for the entire application:

```typescript
// Application Domain Types
export type CategoryKey =
  | "produce"
  | "meat"
  | "dairy"
  | "pantry"
  | "frozen"
  | "bakery"
  | "other";
export type MealType = "breakfast" | "lunch" | "dinner";
export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

// Component Types
export type ShoppingListItem = {
  id: string;
  name: string;
  completed: boolean;
  quantity: string;
  unit: string | null;
  notes: string | null;
};

export type ItemsByCategory = Record<CategoryKey, ShoppingListItem[]>;

// View Mode Types
export type ShoppingListViewMode = "list" | "category";
export type MealPlannerViewMode = "week" | "day";
```

### `src/lib/constants.ts`

Application constants and data structures:

```typescript
import { type CategoryKey, type MealType, type DayOfWeek } from "./types";

export const CATEGORIES = [
  /* ... */
];
export const COMMON_ITEMS: Record<CategoryKey, string[]> = {
  /* ... */
};
export const DAYS = [
  /* ... */
];
export const MEAL_TYPES = [
  /* ... */
];

export const LABELS = {
  // App-wide labels
  APP_NAME: "Kitchin",
  MEAL_PLANNING: "Meal Planning",
  SHOPPING_LIST: "Shopping List",

  // Common UI labels
  QUICK_ADD: "Quick add:",
  ITEMS: "items",
  ITEMS_LEFT: "left",
  ITEMS_COMPLETED: "items completed",
  ADD_TO: "Add to",

  // Empty states
  NO_ITEMS_YET: "No items yet",
  ADD_SOME_ITEMS: "Add some items to get started",
} as const;
```

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
export function ShoppingList() {
  const z = useZero<Schema>();
  const itemsQuery = useQuery(z.query.shoppingListItems);
  const [viewMode, setViewMode] = useState("list");

  // Complex component with mixed concerns
  return (
    <div>
      {/* 200+ lines of JSX with inline logic */}
    </div>
  );
}
```

### After (Senior Level)

```typescript
export function ShoppingList() {
  const shoppingListId = useShoppingListId();
  const { itemsByCategory, totalItems, completedItems } = useShoppingListItems(shoppingListId);

  // Pure orchestration logic
  return (
    <div>
      <ShoppingListHeader {...headerProps} />
      {viewMode === "list" ? <ListView {...listProps} /> : <CategoryView {...categoryProps} />}
    </div>
  );
}

// Each component is self-contained
export function ShoppingListItemComponent({ item, variant }: ShoppingListItemProps) {
  const { updateShoppingListItem } = useMutations(); // ✅ Component imports its own hooks

  const handleToggle = () => {
    updateShoppingListItem(item.id, { isCompleted: !item.completed });
  };

  return <Checkbox onCheckedChange={handleToggle} />;
}
```

## Benefits of This Pattern

### 1. Separation of Concerns

- **Types**: Centralized in `lib/types.ts`
- **Constants**: Centralized in `lib/constants.ts`
- **Labels**: Organized by scope (global vs component-specific)
- **Data Logic**: Isolated in hooks
- **UI Logic**: Focused in components
- **Business Logic**: Centralized in mutation hooks
- **Component Logic**: Broken down into focused, reusable pieces
- **Hook Integration**: Components import their own dependencies

### 2. Reusability

- Hooks can be used across multiple components
- Constants can be imported anywhere
- Types provide consistent interfaces
- Components can be reused across different views
- Shared business logic
- Self-contained components with minimal props

### 3. Testability

- Hooks can be tested independently
- Constants can be mocked easily
- Components can be tested in isolation
- Clear input/output contracts
- Type-safe testing
- No prop drilling to mock

### 4. Performance

- Optimized memoization
- Reduced redundant queries
- Better caching strategies
- Efficient type checking
- Smaller component re-renders
- Reduced prop drilling overhead

### 5. Maintainability

- Centralized data access
- Consistent error handling
- Type-safe operations
- Easier debugging
- Single source of truth for types and constants
- Clear component boundaries
- Self-contained components

### 6. Developer Experience

- Clear API contracts
- Better IntelliSense
- Reduced cognitive load in components
- Easier onboarding for new developers
- Consistent patterns across the codebase
- Modular development
- No prop drilling complexity

## Best Practices

1. **Single Responsibility**: Each file should have one clear purpose
2. **Type Safety**: Use TypeScript for better developer experience
3. **Composition**: Combine simple hooks to create complex ones
4. **Memoization**: Use `useMemo` for expensive computations
5. **Error Handling**: Centralize error handling in hooks
6. **Documentation**: Document complex hooks with JSDoc
7. **File Organization**: Keep types, constants, and utilities separate
8. **Import Organization**: Import types from `lib/types.ts`, constants from `lib/constants.ts`
9. **Component Breakdown**: Break large components into smaller, focused pieces
10. **Props Interface**: Define clear, typed interfaces for component communication
11. **Variant Support**: Support different variants for flexible component usage
12. **Reusability**: Design components to be reusable across different contexts
13. **Self-Contained**: Components should import their own hooks and dependencies
14. **No Prop Drilling**: Avoid passing functions as props when components can import hooks directly
15. **Label Organization**: Use global labels for app-wide text, component-specific labels for local text
16. **Dynamic Labels**: Keep contextual labels inline when they depend on dynamic data

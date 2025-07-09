import { Coffee, Sun, Moon } from "lucide-react";
import { type CategoryKey, type MealType, type DayOfWeek } from "./types";

// Shopping List Categories
export const CATEGORIES = [
  {
    key: "produce" as CategoryKey,
    label: "Produce",
    emoji: "🥬",
    color: "bg-green-100 text-green-800",
  },
  {
    key: "meat" as CategoryKey,
    label: "Meat & Fish",
    emoji: "🥩",
    color: "bg-red-100 text-red-800",
  },
  {
    key: "dairy" as CategoryKey,
    label: "Dairy & Eggs",
    emoji: "🥛",
    color: "bg-blue-100 text-blue-800",
  },
  {
    key: "pantry" as CategoryKey,
    label: "Pantry",
    emoji: "🥫",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    key: "frozen" as CategoryKey,
    label: "Frozen",
    emoji: "🧊",
    color: "bg-cyan-100 text-cyan-800",
  },
  {
    key: "bakery" as CategoryKey,
    label: "Bakery",
    emoji: "🍞",
    color: "bg-orange-100 text-orange-800",
  },
  {
    key: "other" as CategoryKey,
    label: "Other",
    emoji: "🛒",
    color: "bg-gray-100 text-gray-800",
  },
] as const;

// Common Items by Category
export const COMMON_ITEMS: Record<CategoryKey, string[]> = {
  produce: [
    "Bananas",
    "Apples",
    "Spinach",
    "Tomatoes",
    "Onions",
    "Garlic",
    "Carrots",
    "Broccoli",
    "Avocado",
    "Lemons",
    "Limes",
    "Bell Peppers",
    "Cucumber",
    "Lettuce",
    "Potatoes",
  ],
  meat: [
    "Chicken Breast",
    "Ground Beef",
    "Salmon",
    "Bacon",
    "Pork Chops",
    "Turkey",
    "Shrimp",
    "Steak",
    "Sausage",
    "Tuna",
    "Ham",
    "Deli Meat",
  ],
  dairy: [
    "Milk",
    "Eggs",
    "Cheese",
    "Butter",
    "Yogurt",
    "Cream",
    "Sour Cream",
    "Cottage Cheese",
    "Heavy Cream",
    "Half & Half",
  ],
  pantry: [
    "Rice",
    "Pasta",
    "Olive Oil",
    "Salt",
    "Pepper",
    "Flour",
    "Sugar",
    "Canned Tomatoes",
    "Beans",
    "Broth",
    "Soy Sauce",
    "Vinegar",
    "Honey",
    "Peanut Butter",
    "Jelly",
  ],
  frozen: [
    "Frozen Vegetables",
    "Ice Cream",
    "Frozen Pizza",
    "Frozen Fish",
    "Frozen Fruit",
    "Frozen Waffles",
    "Frozen French Fries",
  ],
  bakery: [
    "Bread",
    "Bagels",
    "Croissants",
    "Muffins",
    "Tortillas",
    "English Muffins",
    "Buns",
    "Cake",
    "Cookies",
  ],
  other: [
    "Paper Towels",
    "Toilet Paper",
    "Dish Soap",
    "Laundry Detergent",
    "Trash Bags",
    "Aluminum Foil",
    "Plastic Wrap",
    "Ziploc Bags",
    "Batteries",
    "Light Bulbs",
  ],
} as const;

// Days of the Week
export const DAYS = [
  {
    key: "monday" as DayOfWeek,
    label: "Mon",
    full: "Monday",
    color: "border-l-primary",
  },
  {
    key: "tuesday" as DayOfWeek,
    label: "Tue",
    full: "Tuesday",
    color: "border-l-night-horizon",
  },
  {
    key: "wednesday" as DayOfWeek,
    label: "Wed",
    full: "Wednesday",
    color: "border-l-cactus-flower",
  },
  {
    key: "thursday" as DayOfWeek,
    label: "Thu",
    full: "Thursday",
    color: "border-l-secondary",
  },
  {
    key: "friday" as DayOfWeek,
    label: "Fri",
    full: "Friday",
    color: "border-l-tertiary",
  },
  {
    key: "saturday" as DayOfWeek,
    label: "Sat",
    full: "Saturday",
    color: "border-l-pueblo-sand",
  },
  {
    key: "sunday" as DayOfWeek,
    label: "Sun",
    full: "Sunday",
    color: "border-l-accent",
  },
] as const;

// Meal Types
export const MEAL_TYPES = [
  {
    key: "breakfast" as MealType,
    icon: Coffee,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    key: "lunch" as MealType,
    icon: Sun,
    color: "text-secondary",
    bg: "bg-secondary/20",
  },
  {
    key: "dinner" as MealType,
    icon: Moon,
    color: "text-primary",
    bg: "bg-primary/10",
  },
] as const;

// Helper Functions
export const getCategoryByKey = (key: CategoryKey) => {
  return CATEGORIES.find((category) => category.key === key);
};

export const getDayByKey = (key: DayOfWeek) => {
  return DAYS.find((day) => day.key === key);
};

export const getMealTypeByKey = (key: MealType) => {
  return MEAL_TYPES.find((mealType) => mealType.key === key);
};

export const LABELS = {
  // App-wide labels
  APP_NAME: "Kitchin",
  MEAL_PLANNING: "Meal Planning",
  MEALS: "Meals",
  SHOPPING_LIST: "Shopping List",
  SHOPPING: "Shopping",

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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  Sun,
  Moon,
  Grid3X3,
  Calendar,
  Plus,
} from "lucide-react";

const days = [
  {
    key: "monday",
    label: "Mon",
    full: "Monday",
    color: "border-l-primary",
  },
  {
    key: "tuesday",
    label: "Tue",
    full: "Tuesday",
    color: "border-l-accent",
  },
  {
    key: "wednesday",
    label: "Wed",
    full: "Wednesday",
    color: "border-l-cactus-flower",
  },
  {
    key: "thursday",
    label: "Thu",
    full: "Thursday",
    color: "border-l-secondary",
  },
  { key: "friday", label: "Fri", full: "Friday", color: "border-l-tertiary" },
  {
    key: "saturday",
    label: "Sat",
    full: "Saturday",
    color: "border-l-pueblo-sand",
  },
  {
    key: "sunday",
    label: "Sun",
    full: "Sunday",
    color: "border-l-night-horizon",
  },
];

const mealTypes = [
  {
    key: "breakfast",
    icon: Coffee,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    key: "lunch",
    icon: Sun,
    color: "text-secondary",
    bg: "bg-secondary/20",
  },
  {
    key: "dinner",
    icon: Moon,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

const quickMeals = [
  "Pasta",
  "Salad",
  "Tacos",
  "Stir fry",
  "Pizza",
  "Soup",
  "Sandwich",
  "Leftovers",
];

interface MealPlannerProps {
  meals: any;
  setMeals: (meals: any) => void;
  groceryItems: any;
  setGroceryItems: (items: any) => void;
}

export function MealPlanner() {
  const [viewMode, setViewMode] = useState<"week" | "day">("week");
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [quickAdd, setQuickAdd] = useState("");
  const [quickCategory, setQuickCategory] = useState("produce");
  const [meals, setMeals] = useState({
    monday: { breakfast: "", lunch: "", dinner: "" },
    tuesday: { breakfast: "", lunch: "", dinner: "" },
    wednesday: { breakfast: "", lunch: "", dinner: "" },
    thursday: { breakfast: "", lunch: "", dinner: "" },
    friday: { breakfast: "", lunch: "", dinner: "" },
    saturday: { breakfast: "", lunch: "", dinner: "" },
    sunday: { breakfast: "", lunch: "", dinner: "" },
  });
  const [groceryItems, setGroceryItems] = useState({
    produce: [],
    meat: [],
    dairy: [],
    pantry: [],
    frozen: [],
    bakery: [],
    other: [],
  });
  const updateMeal = (day: string, mealType: string, value: string) => {
    setMeals((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: value,
      },
    }));
  };

  const getMealCount = (day: string) => {
    return 0;
    // return Object.values(meals[day]).filter((meal: any) => meal && meal.trim())
    //   .length;
  };

  const addQuickMeal = (meal: string) => {
    if (viewMode === "day") {
      updateMeal(selectedDay, selectedMeal, meal);
    }
  };

  const addQuickItem = () => {
    if (quickAdd.trim()) {
      setGroceryItems((prev) => ({
        ...prev,
        [quickCategory]: [
          ...prev[quickCategory],
          {
            id: Date.now(),
            name: quickAdd.trim(),
            completed: false,
            quantity: "1",
          },
        ],
      }));
      setQuickAdd("");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mobile Quick Add */}
      {/* <div className="border-tertiary/20 rounded-xl border bg-white p-4 md:hidden">
        <div className="flex gap-2">
          <Input
            placeholder="Quick add to shopping..."
            value={quickAdd}
            onChange={(e) => setQuickAdd(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addQuickItem()}
            className="border-tertiary/30 h-9 flex-1"
          />
          <select
            value={quickCategory}
            onChange={(e) => setQuickCategory(e.target.value)}
            className="border-tertiary/30 h-9 rounded-md border bg-white px-2 text-sm"
          >
            <option value="produce">🥬</option>
            <option value="meat">🥩</option>
            <option value="dairy">🥛</option>
            <option value="pantry">🥫</option>
            <option value="frozen">🧊</option>
            <option value="bakery">🍞</option>
            <option value="other">🛒</option>
          </select>
          <Button
            onClick={addQuickItem}
            size="sm"
            className="bg-primary hover:bg-primary/90 h-9"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div> */}

      {/* View Toggle */}
      <div className="border-tertiary/20 rounded-xl border bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-night-horizon text-lg font-semibold sm:text-xl">
            Meal Planning
          </h2>
          <div className="flex rounded-lg bg-gray-50 p-1">
            <button
              onClick={() => setViewMode("week")}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
                viewMode === "week"
                  ? "text-night-horizon bg-white shadow-sm"
                  : "text-night-horizon/60"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden sm:inline">Week View</span>
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
                viewMode === "day"
                  ? "text-night-horizon bg-white shadow-sm"
                  : "text-night-horizon/60"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Day View</span>
            </button>
          </div>
        </div>

        {/* Week Navigation */}
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-night-horizon/60 text-sm">
              Dec 9-15, 2024
            </span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-night-horizon/60 text-sm">
            {days.reduce((total, day) => total + getMealCount(day.key), 0)}/21
            meals planned
          </div>
        </div> */}
      </div>

      {/* Week View */}
      {viewMode === "week" && (
        <div className="grid gap-4">
          {days.map((day) => (
            <div
              key={day.key}
              className={`rounded-xl border-l-4 bg-white ${day.color} border-secondary/20 border-t border-r border-b p-4 sm:p-6`}
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
                {mealTypes?.map((meal) => (
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
                        updateMeal(day.key, meal.key, e.target.value)
                      }
                      className="border-tertiary/30 min-h-[80px] resize-none text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Day View */}
      {viewMode === "day" && (
        <div className="space-y-4">
          {/* Day Selector */}
          <div className="border-tertiary rounded-xl border bg-white p-4">
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => {
                const mealCount = getMealCount(day.key);
                const isSelected = selectedDay === day.key;

                return (
                  <button
                    key={day.key}
                    onClick={() => setSelectedDay(day.key)}
                    className={`rounded-lg px-1.5 py-3 text-center transition-all ${
                      isSelected
                        ? "bg-primary text-white"
                        : "hover:bg-tertiary/10"
                    }`}
                  >
                    <div className="text-sm font-medium">{day.label}</div>
                    <div className="mt-1 text-xs opacity-75">{mealCount}/3</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Meal Planning */}
          <div className="border-tertiary/20 rounded-xl border bg-white p-4 sm:p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h3 className="text-night-horizon text-xl font-semibold">
                {days.find((d) => d.key === selectedDay)?.full}
              </h3>

              {/* Meal Type Selector */}
              <div className="flex rounded-lg bg-gray-50 p-1">
                {mealTypes.map((meal) => (
                  <button
                    key={meal.key}
                    onClick={() => setSelectedMeal(meal.key)}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
                      selectedMeal === meal.key
                        ? "text-night-horizon bg-white shadow-sm"
                        : "text-night-horizon/60 hover:text-night-horizon"
                    }`}
                  >
                    <meal.icon className={`h-4 w-4 ${meal.color}`} />
                    <span className="hidden sm:inline">
                      {meal.key.charAt(0).toUpperCase() + meal.key.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Input */}
            <div className="space-y-4">
              <Textarea
                placeholder={`What's for ${selectedMeal}?`}
                value={meals[selectedDay][selectedMeal]}
                onChange={(e) =>
                  updateMeal(selectedDay, selectedMeal, e.target.value)
                }
                className="border-tertiary/30 min-h-[120px] resize-none"
              />

              {/* Quick Meal Options */}
              <div className="space-y-2">
                <div className="text-night-horizon/60 text-sm">
                  Quick options:
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickMeals.map((meal) => (
                    <Badge
                      key={meal}
                      variant="outline"
                      className="hover:bg-secondary/20 border-tertiary/30 cursor-pointer transition-colors"
                      onClick={() => addQuickMeal(meal)}
                    >
                      {meal}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

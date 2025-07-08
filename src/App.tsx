import { useState, useEffect } from "react";

import { LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Icon } from "@/components/ui/icon";
import { MealPlanner } from "@/components/meal-planner";
import { ShoppingList } from "@/components/shopping-list";

const TABS = [
  {
    LABEL: LABELS.MEAL_PLANNING,
    SMALL_LABEL: "Meals",
    ICON: "Calendar",
    PATH: "/meals",
    ACTIVE_COLOR: "bg-accent",
  },
  {
    LABEL: LABELS.SHOPPING_LIST,
    SMALL_LABEL: "Shopping",
    ICON: "ShoppingCart",
    PATH: "/shopping-list",
    ACTIVE_COLOR: "bg-cactus-flower",
  },
];

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleTabClick = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  // Default to meals if no path or root
  const activePath = currentPath === "/" ? "/meals" : currentPath;

  return (
    <main className="bg-pueblo-sand/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        {/* Tab Navigation */}
        <div className="border-sagebrush/20 mx-auto mb-6 grid h-12 w-full max-w-md grid-cols-2 rounded-xl border bg-white/80 backdrop-blur-sm">
          {TABS.map((tab) => (
            <button
              key={tab.PATH}
              onClick={() => handleTabClick(tab.PATH)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all duration-200",
                activePath === tab.PATH
                  ? cn("text-white", tab.ACTIVE_COLOR)
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              <Icon name={tab.ICON} className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.LABEL}</span>
              <span className="sm:hidden">{tab.SMALL_LABEL}</span>
            </button>
          ))}
        </div>

        {/* Router Content */}
        <div>
          {activePath === "/meals" && <MealPlanner />}
          {activePath === "/shopping-list" && <ShoppingList />}
        </div>
      </div>
    </main>
  );
}

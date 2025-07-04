import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { MealPlanner } from "./components/meal-planner";
import { ShoppingList } from "./components/shopping-list";
import { Icon } from "./components/ui/icon";
import { cn } from "./lib/utils";

const DEFAULT_TAB = "meals";

const TABS = [
  {
    LABEL: "Meal Planning",
    SMALL_LABEL: "Meals",
    ICON: "Calendar",
    VALUE: "meals",
    ACTIVE_COLOR: "bg-accent",
    CONTENT: <MealPlanner />,
  },
  {
    LABEL: "Shopping List",
    SMALL_LABEL: "Shopping",
    ICON: "ShoppingCart",
    VALUE: "shopping",
    ACTIVE_COLOR: "bg-cactus-flower",
    CONTENT: <ShoppingList />,
  },
];

export default function App() {
  return (
    <main className="bg-pueblo-sand/30">
      <Tabs
        defaultValue={DEFAULT_TAB}
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"
      >
        {/* Tab Navigation */}
        <TabsList className="border-sagebrush/20 mx-auto mb-6 grid h-12 w-full max-w-md grid-cols-2 rounded-xl border bg-white/80 backdrop-blur-sm">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.VALUE}
              value={tab.VALUE}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 data-[state=active]:text-white",
                tab.VALUE === DEFAULT_TAB
                  ? "data-[state=active]:bg-accent"
                  : "data-[state=active]:bg-cactus-flower",
              )}
            >
              <Icon name={tab.ICON} className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.LABEL}</span>
              <span className="sm:hidden">{tab.SMALL_LABEL}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.VALUE} value={tab.VALUE} className="mt-0">
            {tab.CONTENT}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}

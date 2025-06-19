import { Calendar, ShoppingCart } from "lucide-react";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Tabs } from "./components/ui/tabs";
import { MealPlanner } from "./components/meal-planner";
import { GroceryList } from "./components/grocery-list";

function App() {
  return (
    <main className="bg-pueblo-sand/30">
      <Tabs
        defaultValue="meals"
        className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6"
      >
        {/* Tab Navigation */}
        <TabsList className="border-sagebrush/20 mx-auto mb-6 grid w-full max-w-md grid-cols-2 rounded-xl border bg-white/80 p-1 backdrop-blur-sm">
          <TabsTrigger
            value="meals"
            className="data-[state=active]:bg-accent flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Meal Planning</span>
            <span className="sm:hidden">Meals</span>
          </TabsTrigger>
          <TabsTrigger
            value="shopping"
            className="data-[state=active]:bg-cactus-flower flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 data-[state=active]:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Shopping List</span>
            <span className="sm:hidden">Shopping</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meals" className="mt-0">
          <MealPlanner />
        </TabsContent>

        <TabsContent value="shopping" className="mt-0">
          <GroceryList />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default App;

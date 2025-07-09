import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Link } from "@tanstack/react-router";
import { Zero } from "@rocicorp/zero";

import type { Schema } from "../../zero-schema.gen";
import { LABELS } from "@/lib/constants";
import { Icon } from "@/components/ui/icon";
import Navbar from "@/components/navbar";
// import { useInitializeData } from "@/hooks";

interface RouterContext {
  zero: Zero<Schema>;
}

function RootComponent() {
  // Initialize default data if needed
  // useInitializeData();

  return (
    <div>
      <Navbar />
      <main className="bg-pueblo-sand/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
          {/* Tab Navigation */}
          <div className="border-sagebrush/20 mx-auto mb-6 grid h-12 w-full max-w-md grid-cols-2 rounded-xl border bg-white/80 backdrop-blur-sm">
            <Link
              to="/meals"
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-all duration-200 hover:text-gray-900"
              activeProps={{
                className:
                  "flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 text-white bg-accent",
              }}
              preload="intent"
            >
              <Icon name="Calendar" className="h-4 w-4" />
              <span className="hidden sm:inline">{LABELS.MEAL_PLANNING}</span>
              <span className="sm:hidden">{LABELS.MEALS}</span>
            </Link>

            <Link
              to="/shopping-list"
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition-all duration-200 hover:text-gray-900"
              activeProps={{
                className:
                  "flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 text-white bg-cactus-flower",
              }}
              preload="intent"
            >
              <Icon name="ShoppingCart" className="h-4 w-4" />
              <span className="hidden sm:inline">{LABELS.SHOPPING_LIST}</span>
              <span className="sm:hidden">{LABELS.SHOPPING}</span>
            </Link>
          </div>

          {/* Router Content */}
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

import { createRouter } from "@tanstack/react-router";
import { Zero } from "@rocicorp/zero";
import type { Schema } from "../../zero-schema.gen";

// Import the generated route tree
import { routeTree } from "../routeTree.gen";

export interface RouterContext {
  zero: Zero<Schema>;
}

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    zero: undefined!, // This will be set by the ZeroProvider init callback
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

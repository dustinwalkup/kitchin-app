import { ChefHat } from "lucide-react";

const KITCHIN = "Kitchin";

export default function Navbar() {
  return (
    <header className="border-sagebrush/20 sticky top-0 z-10 border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10">
              <ChefHat className="h-5 w-5 text-white sm:h-6 sm:w-6" />
            </div>
            <h1 className="text-night-horizon text-xl font-bold sm:text-2xl">
              {KITCHIN}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

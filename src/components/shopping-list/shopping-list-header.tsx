import { Icon } from "@/components/ui/icon";
import { type ShoppingListViewMode } from "@/lib/types";
import { LABELS } from "@/lib/constants";

interface ShoppingListHeaderProps {
  completedItems: number;
  totalItems: number;
  viewMode: ShoppingListViewMode;
  onViewModeChange: (mode: ShoppingListViewMode) => void;
}

export function ShoppingListHeader({
  completedItems,
  totalItems,
  viewMode,
  onViewModeChange,
}: ShoppingListHeaderProps) {
  const progressPercentage =
    Math.round((completedItems / totalItems) * 100) || 0;

  return (
    <div className="border-tertiary/20 rounded-xl border bg-white p-4 sm:p-6">
      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="bg-cactus-flower/20 flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon name="ShoppingCart" className="text-cactus-flower h-5 w-5" />
          </div>
          <div>
            <h2 className="text-night-horizon text-lg font-semibold sm:text-xl">
              {LABELS.SHOPPING_LIST}
            </h2>
            <p className="text-night-horizon/60 text-sm">
              {completedItems}/{totalItems} {LABELS.ITEMS_COMPLETED}
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex rounded-lg bg-gray-50 p-1">
          <button
            onClick={() => onViewModeChange("list")}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
              viewMode === "list"
                ? "text-night-horizon bg-white shadow-sm"
                : "text-night-horizon/60"
            }`}
          >
            <Icon name="List" className="h-4 w-4" />
            <span className="hidden sm:inline">List View</span>
          </button>
          <button
            onClick={() => onViewModeChange("category")}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all ${
              viewMode === "category"
                ? "text-night-horizon bg-white shadow-sm"
                : "text-night-horizon/60"
            }`}
          >
            <Icon name="Grid3X3" className="h-4 w-4" />
            <span className="hidden sm:inline">Category View</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="bg-cactus-flower h-3 rounded-full transition-all duration-500"
          style={{
            width: `${progressPercentage}%`,
          }}
        />
      </div>
      <div className="mt-2 text-right">
        <span className="text-cactus-flower text-lg font-semibold">
          {progressPercentage}%
        </span>
      </div>
    </div>
  );
}

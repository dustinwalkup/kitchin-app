import { Icon } from "@/components/ui/icon";
import { LABELS } from "@/lib/constants";

interface EmptyStateProps {
  title?: string;
  description?: string;
  variant?: "compact" | "large";
}

export function EmptyState({
  title = LABELS.NO_ITEMS_YET,
  description = LABELS.ADD_SOME_ITEMS,
  variant = "compact",
}: EmptyStateProps) {
  const isLarge = variant === "large";

  return (
    <div className={`text-center text-gray-400 ${isLarge ? "py-12" : "py-6"}`}>
      <Icon
        name="ShoppingCart"
        className={`mx-auto mb-3 text-gray-300 ${
          isLarge ? "h-12 w-12" : "h-8 w-8"
        }`}
      />
      <p className={isLarge ? "text-lg" : "text-sm"}>{title}</p>
      {description && (
        <p
          className={`text-gray-400 ${isLarge ? "mt-2 text-base" : "mt-1 text-xs"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

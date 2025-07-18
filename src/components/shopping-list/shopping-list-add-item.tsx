import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useMutations } from "@/hooks/use-mutations";
import { type CategoryKey } from "@/lib/types";
import { LABELS } from "@/lib/constants";

interface ShoppingListAddItemProps {
  category: CategoryKey;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "compact" | "large";
  shoppingListId?: string;
}

export function ShoppingListAddItem({
  category,
  value,
  onChange,
  placeholder,
  variant = "compact",
  shoppingListId,
}: ShoppingListAddItemProps) {
  const { createShoppingListItem } = useMutations();
  const isLarge = variant === "large";

  const handleAdd = () => {
    const itemName = value.trim();
    if (!itemName || !shoppingListId) return;

    createShoppingListItem(shoppingListId, category, itemName);
    onChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder={placeholder || `${LABELS.ADD_TO} ${category}...`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`border-tertiary/30 flex-1 ${isLarge ? "h-10" : "h-9"}`}
      />
      <Button
        onClick={handleAdd}
        size={isLarge ? "default" : "sm"}
        className={`bg-cactus-flower hover:bg-cactus-flower/90 ${
          isLarge ? "h-10" : "h-9"
        }`}
      >
        <Icon name="Plus" className="h-4 w-4" />
      </Button>
    </div>
  );
}

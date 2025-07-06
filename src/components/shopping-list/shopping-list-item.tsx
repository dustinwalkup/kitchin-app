import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";
import { useMutations } from "@/hooks/use-mutations";
import { type ShoppingListItem } from "@/lib/types";

interface ShoppingListItemProps {
  item: ShoppingListItem;
  variant?: "compact" | "large";
}

export function ShoppingListItemComponent({
  item,
  variant = "compact",
}: ShoppingListItemProps) {
  const { updateShoppingListItem, deleteShoppingListItem } = useMutations();
  const isLarge = variant === "large";

  const handleToggle = () => {
    updateShoppingListItem(item.id, { isCompleted: !item.completed });
  };

  const handleQuantityChange = (quantity: string) => {
    updateShoppingListItem(item.id, { quantity });
  };

  const handleRemove = () => {
    deleteShoppingListItem(item.id);
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
        item.completed
          ? "border-gray-200 bg-gray-50 opacity-60"
          : "border-tertiary/20 hover:border-primary/30 bg-white"
      } ${isLarge ? "gap-4 p-4 hover:shadow-sm" : ""}`}
    >
      <Checkbox
        checked={item.completed}
        onCheckedChange={handleToggle}
        className={isLarge ? "h-5 w-5" : ""}
      />
      <span
        className={`flex-1 ${
          item.completed ? "text-gray-500 line-through" : ""
        } ${isLarge ? "text-night-horizon text-lg" : ""}`}
      >
        {item.name}
      </span>
      <Input
        value={item.quantity}
        onChange={(e) => handleQuantityChange(e.target.value)}
        className={`border-tertiary/30 text-center ${
          isLarge ? "h-9 w-16" : "h-7 w-12 text-xs"
        }`}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        className={`text-accent hover:text-accent/80 hover:bg-accent/10 p-0 ${
          isLarge ? "h-9 w-9" : "h-7 w-7"
        }`}
      >
        <Icon name="Trash2" className={isLarge ? "h-4 w-4" : "h-3 w-3"} />
      </Button>
    </div>
  );
}

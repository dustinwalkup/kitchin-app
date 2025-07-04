import { Calendar, ShoppingCart, ChefHat, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  ShoppingCart,
  ChefHat,
};

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon map`);
    return null;
  }

  return <IconComponent className={className} />;
}

// export { iconMap };

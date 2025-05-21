import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  className?: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  className,
}: CategoryFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2 pb-4", className)}>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "rounded-full border-green-300",
          !activeCategory && "bg-green-100 border-green-400"
        )}
        onClick={() => onSelectCategory(null)}
      >
        Todos
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full border-green-300",
            activeCategory === category && "bg-green-100 border-green-400"
          )}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

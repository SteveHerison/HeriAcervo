import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectCategoryProps = {
  category: number | null;
  onChange: (value: number) => void;
  options: { id: number; name: string }[];
};

export function SelectCategory({
  category,
  onChange,
  options,
}: SelectCategoryProps) {
  return (
    <Select
      onValueChange={(value) => onChange(Number(value))}
      value={category?.toString() || ""}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          {options.map((opt) => (
            <SelectItem key={opt.id} value={opt.id.toString()}>
              {opt.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

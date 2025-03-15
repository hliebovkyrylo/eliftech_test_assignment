import { Checkbox } from "@/components/checkbox";
import { Variant } from "@/lib/types/variant";
import { useState } from "react";

export const MultipleQuestion = ({
  variants,
  questionText,
  onChange,
}: {
  variants: Variant[];
  questionText: string;
  onChange: (values: string[]) => void;
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    const newSelectedValues = selectedValues.includes(id)
      ? selectedValues.filter((v) => v !== id)
      : [...selectedValues, id];

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  return (
    <div className="bg-slate-900 p-5 rounded-2xl">
      <div className="text-white mb-2">{questionText}</div>
      {variants.map((variant) => (
        <div key={variant.id} className="flex items-center gap-2">
          <Checkbox
            id={variant.id}
            checked={selectedValues.includes(variant.id)}
            onCheckedChange={() => handleCheckboxChange(variant.id)}
          />
          <label className="text-white" htmlFor={variant.id}>
            {variant.title}
          </label>
        </div>
      ))}
    </div>
  );
};

import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { Variant } from "@/lib/types/variant";
import { useState } from "react";

export const SingleQuestion = ({
  variants,
  questionText,
  onChange,
}: {
  variants: Variant[];
  questionText: string;
  onChange: (value: string) => void;
}) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="bg-slate-900 p-5 rounded-2xl">
      <div className="text-white mb-2">{questionText}</div>
      <RadioGroup value={selected} onValueChange={handleSelect}>
        {variants.map((variant) => (
          <div key={variant.id} className="flex items-center gap-2">
            <RadioGroupItem value={variant.id} id={variant.id} />
            <label className="text-white" htmlFor={variant.id}>
              {variant.title}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

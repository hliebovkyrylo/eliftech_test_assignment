import { Checkbox } from "@/components/checkbox";
import { Variant } from "@/lib/types/variant";

export const MultipleQuestion = ({
  variants,
  questionText,
  onChange,
  value,
}: {
  variants: Variant[];
  questionText: string;
  onChange: (values: string[]) => void;
  value: string[];
}) => {
  const handleCheckboxChange = (id: string) => {
    const newSelectedValues = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    onChange(newSelectedValues);
  };

  return (
    <div className="bg-slate-900 p-5 rounded-2xl">
      <div className="text-white mb-2">{questionText}</div>
      {variants.map((variant) => (
        <div key={variant.id} className="flex items-center gap-2">
          <Checkbox
            id={variant.id}
            checked={value.includes(variant.id)}
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

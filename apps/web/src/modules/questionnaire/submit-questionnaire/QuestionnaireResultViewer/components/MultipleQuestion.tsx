import { Checkbox } from "@/components/checkbox";
import { Variant } from "@/lib/types/variant";

export const ReadOnlyMultipleQuestion = ({
  variants,
  questionText,
  selectedVariantIds,
}: {
  variants: Variant[];
  questionText: string;
  selectedVariantIds: string[];
}) => {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl">
      <div className="text-white mb-2">{questionText}</div>
      {variants.map((variant) => (
        <div key={variant.id} className="flex items-center gap-2">
          <Checkbox
            id={variant.id}
            checked={selectedVariantIds.includes(variant.id)}
            disabled={true}
            className="cursor-not-allowed"
          />
          <label
            className={`text-white ${selectedVariantIds.includes(variant.id) ? "font-bold" : ""}`}
            htmlFor={variant.id}
          >
            {variant.title}
          </label>
        </div>
      ))}
    </div>
  );
};

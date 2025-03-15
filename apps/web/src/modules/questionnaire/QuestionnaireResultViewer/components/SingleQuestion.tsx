import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import { Variant } from "@/lib/types/variant";

export const ReadOnlySingleQuestion = ({
  variants,
  questionText,
  selectedVariantId,
}: {
  variants: Variant[];
  questionText: string;
  selectedVariantId: string;
}) => {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl">
      <div className="text-white mb-2">{questionText}</div>
      <RadioGroup value={selectedVariantId} onValueChange={() => {}}>
        {variants.map((variant) => (
          <div key={variant.id} className="flex items-center gap-2">
            <RadioGroupItem
              value={variant.id}
              id={variant.id}
              disabled={true}
              className="cursor-not-allowed"
            />
            <label
              className={`text-white ${variant.id === selectedVariantId ? "font-bold" : ""}`}
              htmlFor={variant.id}
            >
              {variant.title}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

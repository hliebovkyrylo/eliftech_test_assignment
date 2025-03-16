import { Input } from "@/components/input";

export const TextQuestion = ({
  questionText,
  onChange,
  value,
}: {
  questionText: string;
  onChange: (value: string) => void;
  value: string;
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="bg-slate-900 p-5 rounded-2xl">
      <div className="text-white mb-2">{questionText}</div>
      <Input
        placeholder="Enter your answer"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

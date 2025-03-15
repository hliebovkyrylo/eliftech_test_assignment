import { Input } from "@/components/input";
import { useState } from "react";

export const TextQuestion = ({
  questionText,
  onChange,
}: {
  questionText: string;
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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

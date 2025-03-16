import { Input } from "@/components/input";

export const ReadOnlyTextQuestion = ({
  questionText,
  answer,
}: {
  questionText: string;
  answer: string;
}) => {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl">
      <div className="text-white mb-2">{questionText}</div>
      <Input
        placeholder="No answer provided"
        value={answer}
        disabled={true}
        className="opacity-75 cursor-not-allowed"
      />
    </div>
  );
};

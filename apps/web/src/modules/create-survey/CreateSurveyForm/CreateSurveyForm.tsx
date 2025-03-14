import { Input } from "@/components/input";
import { QuestionTypeSelect } from "./components/QuestionTypeSelect";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/button";

export const CreateSurveyForm = () => {
  return (
    <form className="flex flex-col gap-3 max-w-[700px] w-full h-full">
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <div className="flex gap-3 justify-between items-center">
            <div className="text-white">{index + 1}</div>
            <Input placeholder="Enter question" />
            <QuestionTypeSelect />
            <button className="cursor-pointer">
              <TrashIcon className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="mx-10 my-4">
            <div className="text-white">Variants:</div>
            <div className="flex gap-3 justify-between">
              <Input placeholder="Enter question" />
              <button className="cursor-pointer">
                <TrashIcon className="w-6 h-6 text-white" />
              </button>
            </div>
            <Button className="cursor-pointer mt-2">Add new one variant</Button>
          </div>
        </div>
      ))}
      <Button className="cursor-pointer">
        <PlusIcon className="text-white w-4 h-4" /> <div>Add question</div>
      </Button>
      <Button className="cursor-pointer">Create</Button>
    </form>
  );
};

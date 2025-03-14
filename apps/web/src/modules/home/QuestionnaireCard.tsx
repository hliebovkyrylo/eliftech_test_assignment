import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/card";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";

interface QuestionnaireCardProps {
  title: string;
  description: string;
  numOfQuestions: number;
  numOfFillings: number;
}

export const QuestionnaireCard = ({
  title,
  description,
  numOfQuestions,
  numOfFillings,
}: QuestionnaireCardProps) => {
  return (
    <Card>
      <CardTitle className="flex justify-between">
        <p>{title}</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisHorizontalIcon className="h-5 w-5" />
            <DropdownMenuContent>
              <DropdownMenuItem>Run</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </CardTitle>
      <CardContent>{description}</CardContent>
      <CardFooter className="block">
        <p>Questions: {numOfQuestions}</p>
        <p>Fillings: {numOfFillings}</p>
      </CardFooter>
    </Card>
  );
};

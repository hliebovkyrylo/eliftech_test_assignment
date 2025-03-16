import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/card";
import { GetQuestionnaires } from "@/lib/types/questionnaire";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export const QuestionnaireCard = ({ data }: { data: GetQuestionnaires }) => {
  return (
    <Link href={`/questionnaire/${data.id}`}>
      <Card>
        <CardTitle className="flex justify-between">
          <p>{data.title}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisHorizontalIcon className="h-5 w-5" />
              <DropdownMenuContent>
                <DropdownMenuItem>Run</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/questionnaire/${data.id}/update`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </CardTitle>
        <CardContent className="truncate">{data.description}</CardContent>
        <CardFooter className="block">
          <p>Questions: {data._count.questions}</p>
          <p>Fillings: {data._count.results}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

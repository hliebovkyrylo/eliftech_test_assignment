import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { GetQuestionnaires } from "@/lib/types/questionnaire";
import { User } from "@/lib/types/user";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/api";

interface DraggableQuestionnaireCardProps {
  data: GetQuestionnaires;
  index: number;
  moveCard: (fromIndex: number, toIndex: number) => void;
  user?: User;
}

export const DraggableQuestionnaireCard = ({
  data,
  index,
  moveCard,
  user,
}: DraggableQuestionnaireCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      await api.deleteQuestionnaire(data.id);
    },
    onSuccess: () => {
      window.location.reload();
    },
  });

  const handleDeleteQuestionnaire = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutation.mutate();
  };

  const [{ isDragging }, drag] = useDrag({
    type: "QUESTIONNAIRE",
    item: { id: data.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "QUESTIONNAIRE",
    hover(item: { id: string; index: number }) {
      if (item.index === index) return;
      moveCard(item.index, index);
      item.index = index;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card>
        <CardTitle className="flex justify-between truncate">
          <p>{data.title}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href={`/questionnaire/${data.id}`}>
                <DropdownMenuItem>Run</DropdownMenuItem>
              </Link>
              {user && user.id === data.userId ? (
                <>
                  <Link href={`/questionnaire/${data.id}/update`}>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    onClick={handleDeleteQuestionnaire}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem disabled>
                  No actions available
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <CardContent className="truncate">{data.description}</CardContent>
        <CardFooter className="block">
          <p>Questions: {data._count.questions}</p>
          <p>Fillings: {data._count.results}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

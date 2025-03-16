import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { GetQuestionnaires } from "@/lib/types/questionnaire";
import { QuestionnaireCard } from "@/modules/home";

interface DraggableQuestionnaireCardProps {
  data: GetQuestionnaires;
  index: number;
  moveCard: (fromIndex: number, toIndex: number) => void;
}

export const DraggableQuestionnaireCard = ({
  data,
  index,
  moveCard,
}: DraggableQuestionnaireCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

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
      <QuestionnaireCard data={data} />
    </div>
  );
};

import { QuestionnaireCard } from "@/modules/home";

export default function Home() {
  return (
    <section className="grid grid-cols-3 gap-4">
      {[...Array(8)].map((_, index) => (
        <QuestionnaireCard
          key={index}
          title="Questionnaire Title"
          description="Questionnaire Description"
          numOfQuestions={5}
          numOfFillings={10}
        />
      ))}
    </section>
  );
}

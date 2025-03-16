export const QuestionnaireCardSkeleton = () => {
  return (
    <div className="w-full p-5 bg-slate-900 h-[188px] rounded-2xl animate-pulse flex flex-col justify-between">
      <div className="w-full bg-slate-800 h-5 rounded-lg" />
      <div className="w-2/3 bg-slate-800 h-5 rounded-lg" />
      <div>
        <div className="w-2/7 bg-slate-800 h-5 rounded-lg mb-2" />
        <div className="w-2/8 bg-slate-800 h-5 rounded-lg" />
      </div>
    </div>
  );
};

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full h-screen flex justify-center items-center z-50 dark:bg-bg-c bg-bg-c-7 ${className}`}
    >
      <div className="border-slate-800 h-8 w-8 animate-spin rounded-full border-4 border-t-white" />
    </div>
  );
};

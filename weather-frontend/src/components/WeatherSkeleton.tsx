export function WeatherSkeleton() {
  return (
    <div className="w-full max-w-md bg-slate-800/50 rounded-3xl p-6 border border-slate-700/40 mt-6 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-6 w-36 bg-slate-700 rounded-md" />
          <div className="h-4 w-24 bg-slate-700/60 rounded-md" />
        </div>
        <div className="w-12 h-12 bg-slate-700 rounded-full" />
      </div>

      <div className="my-6 space-y-2">
        <div className="h-14 w-28 bg-slate-700 rounded-lg" />
        <div className="h-4 w-40 bg-slate-700/60 rounded-md" />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/40">
        <div className="h-12 bg-slate-900/60 rounded-2xl" />
        <div className="h-12 bg-slate-900/60 rounded-2xl" />
      </div>
    </div>
  );
}
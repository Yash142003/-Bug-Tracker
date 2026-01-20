import { Bug } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
        <Bug className="text-white" size={20} />
      </div>

      <div className="leading-tight">
        <p className="font-extrabold text-white text-lg tracking-tight">
          BugDector
        </p>
        <p className="text-xs text-slate-300">Issue Tracker</p>
      </div>
    </div>
  );
}

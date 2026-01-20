import { useLocation } from "react-router-dom";
import { Search } from "lucide-react";

export default function Topbar() {
  const location = useLocation();

  const pageTitle = () => {
    if (location.pathname.includes("/user/projects/")) return "Project Board";
    if (location.pathname.includes("/user/projects")) return "Projects";
    if (location.pathname.includes("/user/dashboard")) return "Dashboard";
    return "BugDector";
  };

  return (
    <header className="w-full px-4 md:px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500 font-semibold">BugDector</p>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
            {pageTitle()}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Search (optional UI) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50">
            <Search size={18} className="text-slate-500" />
            <input
              placeholder="Search tickets..."
              className="bg-transparent outline-none text-sm w-44"
            />
          </div>

          {/* User Chip */}
          <div className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200">
            <p className="text-sm font-bold text-slate-800">Team Member</p>
            <p className="text-xs text-slate-500">Active</p>
          </div>
        </div>
      </div>
    </header>
  );
}

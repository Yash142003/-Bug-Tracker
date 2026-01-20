import DashboardLayout from "../layouts/DashboardLayout";
import { FolderKanban, Bug, Columns3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Hero */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Welcome back 👋
        </h2>
        <p className="text-slate-600 mt-2">
          Manage bugs, track tasks, and collaborate with your team — like Jira.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            to="/user/projects"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-3 rounded-xl transition shadow shadow-indigo-600/20"
          >
            Go to Projects →
          </Link>

          <button className="px-5 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition">
            View Analytics
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <StatCard icon={<FolderKanban size={18} />} title="Projects" desc="Organize workspaces & teams" />
        <StatCard icon={<Bug size={18} />} title="Tickets" desc="Report and resolve issues faster" />
        <StatCard icon={<Columns3 size={18} />} title="Kanban" desc="Drag issues across statuses" />
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, title, desc }) {
  return (
    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-700 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-extrabold text-slate-900">{title}</h3>
      <p className="text-slate-600 text-sm mt-1">{desc}</p>
    </div>
  );
}

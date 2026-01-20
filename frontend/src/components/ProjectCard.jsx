import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/user/projects/${project._id}`}
      className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition group"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900">{project.title}</h3>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
            {project.description || "No description provided."}
          </p>
        </div>
        <ArrowRight className="text-slate-400 group-hover:text-indigo-600 transition" size={18} />
      </div>

      <div className="mt-4 flex gap-2">
        <span className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold">
          Active
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
          Team Project
        </span>
      </div>
    </Link>
  );
}

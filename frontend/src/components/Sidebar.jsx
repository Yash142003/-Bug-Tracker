import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FolderKanban, LogOut } from "lucide-react";
import Logo from "./Logo";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition font-semibold
     ${isActive ? "bg-indigo-600 text-white shadow shadow-indigo-600/20" : "text-slate-300 hover:bg-white/10 hover:text-white"}`;

  return (
    <aside className="w-72 hidden md:flex flex-col bg-slate-900 border-r border-white/10 px-5 py-6">
      <Logo />

      <div className="mt-10 space-y-2">
        <NavLink to="/user/dashboard" className={navClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/user/projects" className={navClass}>
          <FolderKanban size={18} />
          Projects
        </NavLink>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                     bg-white/10 text-slate-200 font-bold hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

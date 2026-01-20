import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass =
    "block px-4 py-2 rounded-md hover:bg-white/20 transition text-white";

  return (
    <aside className="w-64 hidden md:block p-4 bg-black/30 backdrop-blur-md">
      <h1 className="text-xl font-bold text-white mb-6">Bug Dector</h1>

      <nav className="space-y-2">
        <NavLink
          to="/user/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-white/20 font-bold" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/user/projects"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-white/20 font-bold" : ""}`
          }
        >
          Projects
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md"
      >
        Logout
      </button>
    </aside>
  );
}

import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  const pageTitle = () => {
    if (location.pathname.includes("/user/projects/")) return "Project Details";
    if (location.pathname.includes("/user/projects")) return "Projects";
    if (location.pathname.includes("/user/dashboard")) return "Dashboard";
    return "Bug Tracker";
  };

  return (
    <header className="w-full px-4 md:px-8 py-4 bg-white/20 backdrop-blur-md border-b border-white/20">
      <h2 className="text-white font-bold text-lg md:text-xl">
        {pageTitle()}
      </h2>
    </header>
  );
}

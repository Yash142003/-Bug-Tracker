import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Welcome 👋</h2>
        <p className="text-gray-600 mt-2">
          Track bugs, create tickets, and move tasks in Kanban.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            to="/user/projects"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md"
          >
            View Projects
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="font-bold text-gray-800">Projects</h3>
          <p className="text-gray-600 text-sm mt-1">
            Create and manage team projects.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="font-bold text-gray-800">Tickets</h3>
          <p className="text-gray-600 text-sm mt-1">
            Report bugs and assign tickets.
          </p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="font-bold text-gray-800">Kanban</h3>
          <p className="text-gray-600 text-sm mt-1">
            Drag tickets between statuses.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

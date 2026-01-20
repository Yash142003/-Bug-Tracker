import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api";
import KanbanBoard from "../components/KanbanBoard";
import TicketModal from "../components/TicketModal";
import { toast } from "react-toastify";

export default function ProjectDetails() {
  const { projectId } = useParams();

  const [tickets, setTickets] = useState([]);
  const [project, setProject] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchProject = async () => {
    try {
      const { data } = await API.get(`/projects/${projectId}`);
      setProject(data);
    } catch {
      toast.error("Project not found / access denied");
    }
  };

  const fetchTickets = async () => {
    try {
      const { data } = await API.get(`/tickets/project/${projectId}`);
      setTickets(data);
    } catch {
      toast.error("Failed to load tickets");
    }
  };

  const createTicket = async (ticketData) => {
    try {
      await API.post("/tickets", { ...ticketData, projectId });
      toast.success("Ticket created!");
      setOpenModal(false);
      fetchTickets();
    } catch {
      toast.error("Ticket creation failed");
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTickets();
  }, [projectId]);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm w-full">
          <h2 className="text-xl font-extrabold text-slate-900">
            {project?.title || "Project"}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {project?.description || "No description"}
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-4 rounded-2xl transition shadow shadow-indigo-600/20"
        >
          + Create Ticket
        </button>
      </div>

      <KanbanBoard tickets={tickets} setTickets={setTickets} />

      <TicketModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={createTicket}
      />
    </DashboardLayout>
  );
}

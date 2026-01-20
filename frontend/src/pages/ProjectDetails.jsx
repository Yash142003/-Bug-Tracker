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
    } catch (err) {
      toast.error("Project not found / access denied");
    }
  };

  const fetchTickets = async () => {
    try {
      const { data } = await API.get(`/tickets/project/${projectId}`);
      setTickets(data);
    } catch (err) {
      toast.error("Failed to load tickets");
    }
  };

  const createTicket = async (ticketData) => {
    try {
      await API.post("/tickets", {
        ...ticketData,
        projectId,
      });
      toast.success("Ticket created!");
      setOpenModal(false);
      fetchTickets();
    } catch (err) {
      toast.error("Ticket creation failed");
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTickets();
  }, [projectId]);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <div className="bg-white p-4 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-bold text-gray-800">
            {project?.title || "Project"}
          </h2>
          <p className="text-gray-600 text-sm">
            {project?.description || "No description"}
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-md"
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

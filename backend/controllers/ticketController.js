import Ticket from "../models/Ticket.js";
import Project from "../models/Project.js";

export const createTicket = async (req, res) => {
  try {
    const { projectId, title, description, priority, assignee } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const isMember = project.teamMembers.includes(req.user._id);
    if (!isMember) return res.status(403).json({ message: "Not in project" });

    const ticket = await Ticket.create({
      projectId,
      title,
      description,
      priority,
      assignee: assignee || null,
      createdBy: req.user._id,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTicketsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tickets = await Ticket.find({ projectId })
      .populate("assignee", "name email")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = status;
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

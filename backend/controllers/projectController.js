import Project from "../models/Project.js";
import User from "../models/User.js";

export const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      owner: req.user._id,
      teamMembers: [req.user._id],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ teamMembers: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("teamMembers", "name email");
    if (!project) return res.status(404).json({ message: "Project not found" });

    const isMember = project.teamMembers.some((m) => m._id.toString() === req.user._id.toString());
    if (!isMember) return res.status(403).json({ message: "Access denied" });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { email } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only owner can add members" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (project.teamMembers.includes(user._id)) {
      return res.status(400).json({ message: "User already in project" });
    }

    project.teamMembers.push(user._id);
    await project.save();

    res.json({ message: "Member added", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

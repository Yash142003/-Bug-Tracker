import Project from "../models/Project.js";

export const getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate(
      "teamMembers",
      "name email"
    );

    if (!project) return res.status(404).json({ message: "Project not found" });

    // only team members can view
    const isMember = project.teamMembers.some(
      (m) => m._id.toString() === req.user._id.toString()
    );
    if (!isMember) return res.status(403).json({ message: "Access denied" });

    res.json(project.teamMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../api/api";
import ProjectCard from "../components/ProjectCard";
import { toast } from "react-toastify";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.warning("Project title required");

    try {
      await API.post("/projects", form);
      toast.success("Project created!");
      setForm({ title: "", description: "" });
      fetchProjects();
    } catch (err) {
      toast.error("Project creation failed");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Create Project</h2>

        <form onSubmit={createProject} className="grid gap-3">
          <input
            className="border p-2 rounded-md"
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="border p-2 rounded-md"
            placeholder="Project Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md">
            Create
          </button>
        </form>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-white mb-3">Your Projects</h2>

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="text-white">No projects found.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

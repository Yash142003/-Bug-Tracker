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
    } catch {
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
    } catch {
      toast.error("Project creation failed");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <DashboardLayout>
      {/* Create project */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 mb-4">
          Create Project
        </h2>

        <form onSubmit={createProject} className="grid gap-3">
          <input
            className="border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Project Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow shadow-indigo-600/20">
            Create Project
          </button>
        </form>
      </div>

      {/* Projects list */}
      <div className="mt-6">
        <h2 className="text-xl font-extrabold text-slate-900 mb-3">
          Your Projects
        </h2>

        {loading ? (
          <div className="text-slate-700">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="text-slate-600">No projects found.</div>
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

import { useEffect, useState } from "react";
import API from "../api/api";

export default function TicketModal({ open, onClose, onCreate, projectId }) {
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignee: "",
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (!projectId) return;
        const { data } = await API.get(`/users/project/${projectId}/members`);
        setMembers(data);
      } catch (err) {
        console.log("Member fetch error:", err?.response?.data?.message || err.message);
      }
    };

    if (open) fetchMembers();
  }, [open, projectId]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onCreate({
      ...form,
      assignee: form.assignee ? form.assignee : null,
    });

    setForm({ title: "", description: "", priority: "Medium", assignee: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-extrabold text-slate-900">Create Ticket</h3>
          <button onClick={onClose} className="text-slate-700 font-bold text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="grid gap-3">
          <input
            className="border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Ticket Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            className="border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Ticket Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          {/* ✅ Assignee Dropdown */}
          <select
            className="border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600"
            value={form.assignee}
            onChange={(e) => setForm({ ...form, assignee: e.target.value })}
          >
            <option value="">Unassigned</option>
            {members.map((m) => (
              <option value={m._id} key={m._id}>
                {m.name} ({m.email})
              </option>
            ))}
          </select>

          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow shadow-indigo-600/20">
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

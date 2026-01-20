import { useState } from "react";

export default function TicketModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({ title: "", description: "", priority: "Medium" });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Create Ticket</h3>
          <button onClick={onClose} className="text-gray-600 font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="grid gap-3">
          <input
            className="border p-2 rounded-md"
            placeholder="Ticket Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            className="border p-2 rounded-md"
            placeholder="Ticket Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="border p-2 rounded-md"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-md">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

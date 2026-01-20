export default function TicketCard({ ticket }) {
  const priorityColor = {
    Low: "bg-slate-100 text-slate-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-extrabold text-slate-900 text-sm leading-tight">
          {ticket.title}
        </h4>

        <span
          className={`text-xs px-2 py-1 rounded-full font-bold ${
            priorityColor[ticket.priority] || "bg-slate-100 text-slate-700"
          }`}
        >
          {ticket.priority}
        </span>
      </div>

      <p className="text-xs text-slate-500 mt-2">
        Status: <span className="font-semibold">{ticket.status}</span>
      </p>

      {ticket.assignee?.name && (
        <p className="text-xs text-slate-500 mt-1">
          Assignee: <span className="font-semibold">{ticket.assignee.name}</span>
        </p>
      )}
    </div>
  );
}

export default function TicketCard({ ticket }) {
  return (
    <div className="bg-white p-3 rounded-md shadow">
      <h4 className="font-bold text-gray-800 text-sm">{ticket.title}</h4>

      <p className="text-xs text-gray-500 mt-1">
        Priority: <span className="font-semibold">{ticket.priority}</span>
      </p>

      <p className="text-xs text-gray-500">
        Status: <span className="font-semibold">{ticket.status}</span>
      </p>

      {ticket.assignee?.name && (
        <p className="text-xs text-gray-500 mt-1">
          Assignee: <span className="font-semibold">{ticket.assignee.name}</span>
        </p>
      )}
    </div>
  );
}

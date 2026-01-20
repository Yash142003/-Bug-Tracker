export default function TicketCard({ ticket }) {
  return (
    <div className="bg-white p-3 rounded-md shadow cursor-grab active:cursor-grabbing">
      <h4 className="font-bold text-gray-800 text-sm">{ticket.title}</h4>

      <p className="text-xs text-gray-500 mt-1">
        Priority: <span className="font-semibold">{ticket.priority}</span>
      </p>

      <p className="text-xs text-gray-500">
        Status: <span className="font-semibold">{ticket.status}</span>
      </p>
    </div>
  );
}

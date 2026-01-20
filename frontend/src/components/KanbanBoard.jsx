import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TicketCard from "./TicketCard";
import API from "../api/api";
import { toast } from "react-toastify";

const columns = ["To Do", "In Progress", "Done"];

export default function KanbanBoard({ tickets, setTickets }) {
  const grouped = {};
  columns.forEach((c) => (grouped[c] = []));
  tickets.forEach((t) => grouped[t.status]?.push(t));

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const ticketId = result.draggableId;
    const newStatus = result.destination.droppableId;

    // update UI first
    const updated = tickets.map((t) =>
      t._id === ticketId ? { ...t, status: newStatus } : t
    );
    setTickets(updated);

    try {
      await API.put(`/tickets/${ticketId}/status`, { status: newStatus });
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <Droppable droppableId={col} key={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-white/20 backdrop-blur-md p-4 rounded-lg min-h-[450px]"
              >
                <h3 className="text-white font-bold mb-3">{col}</h3>

                <div className="space-y-3">
                  {grouped[col].map((ticket, index) => (
                    <Draggable
                      key={ticket._id}
                      draggableId={ticket._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TicketCard ticket={ticket} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

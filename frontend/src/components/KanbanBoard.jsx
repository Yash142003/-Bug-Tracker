import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TicketCard from "./TicketCard";
import API from "../api/api";
import { toast } from "react-toastify";

const columns = ["To Do", "In Progress", "Done"];

export default function KanbanBoard({ tickets, setTickets }) {
  const grouped = { "To Do": [], "In Progress": [], "Done": [] };

  tickets.forEach((t) => {
    const status = t.status || "To Do";
    grouped[status]?.push(t);
  });

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const toCol = destination.droppableId;
    const ticketId = String(draggableId);

    // update UI
    const updatedTickets = tickets.map((t) =>
      String(t._id) === ticketId ? { ...t, status: toCol } : t
    );
    setTickets(updatedTickets);

    try {
      await API.put(`/tickets/${ticketId}/status`, { status: toCol });
    } catch {
      toast.error("Failed to update status");
      setTickets(tickets);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid md:grid-cols-3 gap-4">
        {columns.map((col) => (
          <Droppable droppableId={col} key={col}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-4 rounded-2xl border border-slate-200 bg-white shadow-sm min-h-[500px]
                  ${snapshot.isDraggingOver ? "ring-2 ring-indigo-500" : ""}`}
              >
                <h3 className="font-extrabold text-slate-900 mb-4">{col}</h3>

                <div className="space-y-3">
                  {grouped[col].map((ticket, index) => (
                    <Draggable
                      key={String(ticket._id)}
                      draggableId={String(ticket._id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            zIndex: snapshot.isDragging ? 9999 : "auto",
                          }}
                          className={snapshot.isDragging ? "opacity-90" : ""}
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

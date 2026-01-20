import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TicketCard from "./TicketCard";
import API from "../api/api";
import { toast } from "react-toastify";

const columns = ["To Do", "In Progress", "Done"];

export default function KanbanBoard({ tickets, setTickets }) {
  const grouped = { "To Do": [], "In Progress": [], "Done": [] };

  tickets.forEach((t) => {
    const status = t.status || "To Do";
    if (!grouped[status]) grouped[status] = [];
    grouped[status].push(t);
  });

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const fromCol = source.droppableId;
    const toCol = destination.droppableId;

    if (fromCol === toCol && source.index === destination.index) return;

    const ticketId = String(draggableId);

    const updatedTickets = tickets.map((t) =>
      String(t._id) === ticketId ? { ...t, status: toCol } : t
    );
    setTickets(updatedTickets);

    try {
      await API.put(`/tickets/${ticketId}/status`, { status: toCol });
    } catch (err) {
      toast.error("Failed to update status");
      setTickets(tickets); // rollback
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
                className={`p-4 rounded-lg min-h-[450px] transition border border-white/20 
                  ${snapshot.isDraggingOver ? "bg-white/25" : "bg-white/15"}`}
                style={{
                  // IMPORTANT: prevent blur/filter stacking context problems
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <h3 className="text-white font-bold mb-3">{col}</h3>

                <div className="space-y-3">
                  {grouped[col].map((ticket, index) => (
                    <Draggable
                      key={String(ticket._id)}
                      draggableId={String(ticket._id)}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        const style = {
                          ...provided.draggableProps.style,

                          // ✅ This fixes the "go behind other columns" issue
                          zIndex: snapshot.isDragging ? 9999 : "auto",

                          // ✅ Keeps it above everything
                          position: snapshot.isDragging ? "relative" : "relative",
                        };

                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={style}
                            className={`rounded-md ${
                              snapshot.isDragging ? "shadow-2xl scale-[1.02]" : ""
                            }`}
                          >
                            <TicketCard ticket={ticket} />
                          </div>
                        );
                      }}
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

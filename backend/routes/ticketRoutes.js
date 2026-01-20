import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTicket, getTicketsByProject, updateTicketStatus } from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", protect, createTicket);
router.get("/project/:projectId", protect, getTicketsByProject);
router.put("/:id/status", protect, updateTicketStatus);

export default router;

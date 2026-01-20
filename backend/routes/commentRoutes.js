import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addComment, getComments } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", protect, addComment);  //not done
router.get("/:ticketId", protect, getComments);   //not done

export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProjectMembers } from "../controllers/userController.js";

const router = express.Router();

// GET members of a project
router.get("/project/:projectId/members", protect, getProjectMembers);

export default router;

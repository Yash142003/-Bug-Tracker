import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { ticketId, text } = req.body;

    const comment = await Comment.create({
      ticketId,
      userId: req.user._id,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ ticketId: req.params.ticketId })
      .populate("userId", "name email")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

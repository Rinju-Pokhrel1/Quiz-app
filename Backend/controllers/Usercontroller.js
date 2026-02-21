import UserQuizAssign from "../models/userQuizassign.js";

export const getAssignedQuizzes = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const assignments = await UserQuizAssign
      .find({ userId})
      .populate("quizId")
      .exec();

    res.status(200).json({
      message: "Assigned quizzes fetched successfully",
      assignments
    });
  } catch (error) {
    console.error("Get Assigned Quizzes Error:", error);
    res.status(500).json({ message: error.message });
  }
};
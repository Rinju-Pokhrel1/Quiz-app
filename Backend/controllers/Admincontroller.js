import UserQuizAssign from "../models/userQuizassign.js";  


 export const assignQuizToUser = async (req, res) => {
  try {
    const { userId, quizId } = req.body;
const userObjectId = mongoose.Types.ObjectId(userId);
    const quizObjectId = mongoose.Types.ObjectId(quizId);
    const exists = await UserQuizAssign.findOne({ userId, quizId });
  if (exists) {
     return res.status(400).json({ message: "Quiz already assigned" });
       }

 const assignment = await UserQuizAssign.create({
      userId: userObjectId,
      quizId: quizObjectId,
      status: "assigned",
      score: 0,
      assignedAt: new Date()
    });

    res.status(201).json({
      message: "Quiz assigned successfully",
      assignment
    });
  } catch (error) {
    console.error("Assign Quiz Error:", error);
    res.status(500).json({ message: error.message });
  }
};

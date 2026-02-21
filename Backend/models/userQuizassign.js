import mongoose from "mongoose";
const userQuizAssignSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
      },    
      status:{
        type: String,
        enum: ["assigned","attempted","completed"],
        default: "assigned"
      },
      score:{
        type: Number,
        default:0
      },
      assignedAt:{
        type: Date,
        default: Date.now
      }});

export default mongoose.model("UserQuizAssign", userQuizAssignSchema);
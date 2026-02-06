import connectDB from "./connect.js";
import Quiz from "./models/Quiz.js";
import User from "./models/user.js";
import data from "./data/data.json" assert { type: "json" };

async function seedDB() {
  try {
    await connectDB();
    console.log("DB connected for seeding...");

    // Clear existing data
    await Quiz.deleteMany({});
    await User.deleteMany({});
    console.log("Old data cleared");

    // Insert quiz data
    await Quiz.insertMany(data);
    console.log("Quiz data inserted successfully!");

    process.exit(0);
  } catch (err) {
    console.log("Error seeding DB:", err);
    process.exit(1);
  }
}

seedDB();

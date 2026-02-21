// import connectDB from "./connect.js";
// import Quiz from "./models/Quiz.js";
// import User from "./models/user.js";
// import data from "./data/data.json" assert { type: "json" };

// async function seedDB() {
//   try {
//     await connectDB();
//     console.log("DB connected for seeding...");

//     // Clear existing data
//     await Quiz.deleteMany({});
//     await User.deleteMany({});
//     console.log("Old data cleared");

//     // Insert quiz data
//     await Quiz.insertMany(data);
//     console.log("Quiz data inserted successfully!");

//     process.exit(0);
//   } catch (err) {
//     console.log("Error seeding DB:", err);
//     process.exit(1);
//   }
// }

// seedDB();

// seed.js
import connectDB from "./connect.js";
import Quiz from "./models/Quiz.js";
import User from "./models/user.js";
import data from "./data/data.json" assert { type: "json" };
import bcrypt from "bcryptjs";

async function seedDB() {
  try {
    await connectDB();
    console.log("DB connected for seeding...");

   
    await Quiz.deleteMany({});
    await User.deleteMany({});
    console.log("Old quiz and user data cleared");

   
    await Quiz.insertMany(data);
    console.log("Quiz data inserted successfully!");

   
    const adminPassword = bcrypt.hashSync("admin123", 10); // change password if needed
    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: adminPassword,
    });
    console.log("Default admin user created!");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding DB:", err);
    process.exit(1);
  }
}

seedDB();

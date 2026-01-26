const connectDB = require("./connect");
const Quiz = require("./models/Quiz");
const data = require("./data/data.json");

async function seedDB() {
  try {
    await connectDB();
    console.log("DB connected for seeding...");

    await Quiz.deleteMany({});//clear data
    await Quiz.insertMany(data);

    console.log("Quiz data inserted successfully!");
    process.exit(); // exit script
  } catch (err) {
    console.log("Error seeding DB:", err);
    process.exit(1);
  }
}

seedDB();

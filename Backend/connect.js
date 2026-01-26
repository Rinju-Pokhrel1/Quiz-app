//for db connection

const mongoose = require("mongoose");
uri="mongodb+srv://rinjup:sC24U2CjYbNZ4qeN@cluster0.8ez4x5j.mongodb.net/?appName=Cluster0"
const connectDB=()=>
{
    console.log("connect db");
    return mongoose.connect(uri);
};
module.exports =connectDB;
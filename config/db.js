const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB is connected to host:" + conn.connection.host.green.bold);
}

module.exports = connectDB;
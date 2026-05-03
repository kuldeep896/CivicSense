require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB(); // 🔥 ye line missing hoti hai usually
// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
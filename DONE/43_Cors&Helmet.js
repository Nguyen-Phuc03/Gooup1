const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
require("dotenv").config();
// CORS options cho phép các yêu cầu từ giao diện người dùng người dùng
const corsOptions = {
  origin: "*", // CHo phép truy cập tất cả các nguồn
  methods: "GET,POST", // chỉ cho phép dùng các phương thức GET,POST
  allowedHeaders: ["Content-Type", "Authorization"], //chỉ cho phép các Content-Typevà Authorization
};
app.use(cors(corsOptions));
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/data", (req, res) => {
  res.json({ message: "Database" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

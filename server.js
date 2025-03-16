const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const limit = require("express-rate-limit");

// routes
const barangRoutes = require("./routes/barang.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");

// config
dotenv.config();
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  limit.rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    message: "Too many request, Try again after 30 sec",
  })
);

// route
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/barang", barangRoutes);
app.use("/api/barang", orderRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`Server run on port ${PORT}`));

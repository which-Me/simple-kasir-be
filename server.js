const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// routes
const barangRoutes = require("./routes/barang.routes");
const userRoutes = require("./routes/user.routes");

// config
dotenv.config();
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// route
app.get("/", (req, res) => {
  res.send("API is Working");
});

app.use("/api/barang", barangRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => console.log(`Server run on port ${PORT}`));

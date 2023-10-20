const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const productsRoutes = require("./routes/products");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Change this to your actual frontend origin
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
app.use(morgan("dev"));
app.use("/docs", express.static("docs"));
// After defining other middleware

const dbUrl = "mongodb+srv://johnsegs:Johnsegs123@cluster0.ovzu5x7.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbUrl)
  .then((result) => app.listen(port, () => console.log("connected")))
  .catch((err) => console.log(err));

app.use("/api/products", productsRoutes);
app.use("/api/user", userRoutes);

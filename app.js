const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// const authJwt = require("./helper/jwt");
// const errorHandler = require("./helper/error-handler");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middleware
//checking everything going to the server before it gets excuted
app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt);
// app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categoriesRoute");
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
const orderRoutes = require("./routes/orderRoute");
const api = process.env.API_URL;

app.use(`${api}/categoriesRoute`, categoriesRoutes);
app.use(`${api}/productRoute`, productRoutes);
app.use(`${api}/userRoute`, userRoutes);
app.use(`${api}/orderRoute`, orderRoutes);

//Database
const CONNECTION_STRING = process.env.CONNECTION_STRING;
mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "exponect-database",
  })
  .then(() => {
    console.log("DB connection is ready");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(3000, () => {
  console.log("server is running");
});

const express = require("express");
const PORT = 8001;
const app = express();
const urlRoute = require("./routes/url.routes");
const { connectToMongoose } = require("./connection");
connectToMongoose("mongodb://localhost:27017").then(() =>
  console.log("db connected")
);
app.set('trust-proxy',true)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", urlRoute);
app.listen(PORT, () => {
  console.log(`server listning on ${PORT}`);
});

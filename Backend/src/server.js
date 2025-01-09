const dotenv = require("dotenv");
dotenv.config({
  path: "./.env"
})
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/index.js");
const cookieParser = require("cookie-parser");

const port = process.env.PORT;

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(express.static("public"));
app.use(cookieParser());


// Routes
const userRouter = require("./routes/user.routes.js");
const healthCheckRouter = require("./routes/healthCheck.routes.js");


app.use("/narrato/api/v1/user", userRouter);
app.use("/narrato/api/v1/health-check", healthCheckRouter);


connectDB()
.then(() => {

  app.on("error", (error) => {
    console.log("Error in express app", error);
  })

  app.listen(port, async() => {
    console.log(`server running on port: ${port}`);
  })

});





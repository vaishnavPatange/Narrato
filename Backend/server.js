const express = require("express");
const app = express();
const port = 8080;
// const dotenv = require("")
require("dotenv").config();
const mongoose = require("mongoose");
const mongo_URL = process.env.MONGO_URL;
const userRouter = require("./Routes/userRoutes");
const cors = require("cors");


const corsOptions = {
  origin: "http://localhost:5173/",
  methods: ["POST", "GET", "PUT", "DELETE"],
  headers: ["Content-Type", "Authorizatioin"],
  credentials: true
}

app.use(cors(corsOptions));


main()
.then(() => console.log("Database connected ")
)
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(String(mongo_URL));
}

app.use(express.json());

//user routes
app.use("/user",userRouter);

app.get("/", (req, res) => {
    res.send("server works fine !!!");
})

app.listen(port, () => {
    console.log("server is listening on http://localhost:", port);
    
})
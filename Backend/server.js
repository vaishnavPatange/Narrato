const express = require("express");
const app = express();
const mongoose = require("mongoose");
const conf = require("./conf");
const userRouter = require("./Routes/userRoutes");
const postRouter = require("./Routes/postRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./Model/user");
const ExpressError = require("./utils/ExpressError");


const corsOptions = {
  origin: String(conf.cors_origin),
  methods: ["POST", "GET", "PUT", "DELETE"],
  headers: ["Content-Type", "Authorizatioin"],
  credentials: true
}
app.use(cors(corsOptions));

const sessionOpt = {
  secret: conf.session_secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 1000 * 60 * 60 * 24 * 10,
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true
  }
}






main()
.then(() => console.log("Database connected ")
)
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(String(conf.mongoUrl));
}


//expression session
app.use(session(sessionOpt));

//passport usage
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//to parse data to json
app.use(express.json());

//user routes
app.use("/user",userRouter);

//post routes
app.use("/post", postRouter);

app.get("/", (req, res) => {
    res.send(`server works fine !!!`);
})

app.use((err, req, res, next) => {
  const{statusCode= 500, message="something went wrong !"} = err;
  return res.status(statusCode).json({success:false, message:message})
})

app.listen(conf.port, () => {
    console.log("server is listening on http://localhost:", conf.port);
    
})
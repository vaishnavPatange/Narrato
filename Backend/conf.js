require("dotenv").config();

module.exports =  {
    port: process.env.PORT,
    mongoUrl : process.env.MONGO_URL,
    session_secret: process.env.SESSION_SECRET,
    cors_origin: process.env.CORS_ORIGIN
}
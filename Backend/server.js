const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("server works fine !!!");
})

app.listen(port, () => {
    console.log("server is listening on http://localhost:", port);
    
})
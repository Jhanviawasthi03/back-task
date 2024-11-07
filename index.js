const express = require("express");

const connectwithdb = require("./config/database.js"); 
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 6000;


app.use(express.json());

const blog = require("./routes/blog");
const user=require("./routes/user");

app.use("/api/v1", blog);
app.use("/api/v1",user);

connectwithdb(); 

app.listen(PORT, () => {
    console.log(`App is started at port no ${PORT}`);
});

app.get("/", (req, res) => {
    res.send('<h1>This is my homepage</h1>');
});
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api_post",(req,res) => {
    res.send("Hello World");
});

app.get("/api_get",(req,res)=>{
    res.send("Its a GET request");
});

app.listen(process.env.PORT || 3000);
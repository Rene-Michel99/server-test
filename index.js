const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api",(req,res) => {
    console.log(req.body);
    res.send("Hello World");
});

app.listen(process.env.PORT || 3000);
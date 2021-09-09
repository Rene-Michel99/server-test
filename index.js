const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/db');

app.use(express.json());
app.use(cors());

app.post("/api_post",async (req,res) => {
    var exists = await db.find_user(req.body.nome);

    if(exists == null) {
        var response = await db.create_user(req.body);

        res.send(response);
    }else{
        res.send("logged");
    }

});

app.post("/api_post_msg",async (req,res) => {
    var response = await db.create_message(req.body.nome);

    res.send(response);
});

app.get("/api_get",async (req,res)=>{
    var response = await db.get_msgs(req.query.nome);

    res.send(response);
});

app.listen(process.env.PORT || 3000);
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app= express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect(process.env.MONGO);
const db = mongoose.connection
db.on('error', ()=> console.log("Error in connecting to the Database"))
db.once('open', () => console.log("Connected to Database"))

app.post("/add", (req,_) =>{
    const category_select = req.body.category_select;
    const amount_input= req.body.amount_input;
    const info = req.body.info;
    const date_input = req.body.date_input;

    const data={
        "Category": category_select,
        "Amount" : amount_input,
        "Info": info,
        "Date": date_input
    }
    db.collection('users').insertOne(data, (err,_) => {
        if(err) throw err;
        console.log("Record Inserted Successfully")
    })
})
app.get("/",(_,res) =>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(5000)
console.log("Listening on port 5000")

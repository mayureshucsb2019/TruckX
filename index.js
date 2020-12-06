'use strict';

/*
    packages mongodb, mongoose, express, bodyParser, url, jsonwebtoken
*/

const express =  require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dashcamRoutes = require("./routes/dashcamRoutes");
const uiRoutes = require("./routes/uiRoutes");
const errorController = require("./controllers/errorController");
const uri = "mongodb+srv://truckx:SIHerzZhds43dbhx@cluster0.x8ie4.mongodb.net/truckx?retryWrites=true&w=majority"

app.use(bodyParser.json());

app.use("/dashcam", dashcamRoutes);

app.use("/ui", uiRoutes);

app.use(errorController.get404);

mongoose
    .connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log("Database Connected");
        app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    }).catch(err => {
        console.log(err);
        console.log("Connection refused!");
        });
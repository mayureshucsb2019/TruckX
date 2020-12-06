const utils = require("../utils/constants")
const AlarmMessage = require("../models/alarmMessage")
const LocationMessage = require("../models/locationMessage");
const Video = require("../models/video");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const SOME_RANDOM_SECRET = utils.SOME_RANDOM_SECRET;

// client is provided with JWT token after logging in
const checkLogin = function(req, res){
    const imei = Number(req.body.imei);
    const token = jwt.sign({imei: imei},
                            SOME_RANDOM_SECRET,
                            {expiresIn: '6h'}
                          );
    // We are asuming here that backend has the logic to store the random secret by encrypting 
    // it with some secret key and then it can retrieve them later when needed to verify.
    User.findOne({imei: imei}).
        then(user=>{
            user.secret = token;
            console.log("user is:",user);
            user.save()
            .then( ()=> console.log("secret data updated"))
            .catch(() => console.log("secret not updated"));
    }).catch(`Unable to find the user for given imei: ${imei}`);
    // this token can be sent back and forth and must be verified for all API calls
    res.status(200).send({token: token, imei: imei});
}

const postAlarm =  function(req, res){
    /*
        alarmType, alarmTime, latitude, longitude, fileList
    */
    // fetch user imei from the session
    const imei = Number(req.params.imei);
    
    const alarmMessage = new AlarmMessage({ imei: imei,
                                            alarmType: req.body.alarmType,
                                            alarmTime: req.body.alarmTime,
                                            latitude: req.body.latitude,
                                            longitude:req.body.longitude,
                                            fileList: req.body.fileList
                                        });
    alarmMessage.save()
        .then(result =>{
            console.log("Alarm message stored!!");
            res.status(201).send(`Result \n\n ${result}`);
        }).catch(err =>{
            console.log("error in pushing alarm message\n");
            console.log(err);
            resu.status(400).send("Error!!!")
        });
}

const postLocation = function(req, res){
    const imei = Number(req.params.imei);
    const locationMessage = new LocationMessage({ imei: imei,
                                            locationTime: req.body.locationTime,
                                            latitude: req.body.latitude,
                                            longitude: req.body.longitude,
                                        });
    locationMessage.save()
        .then(result =>{
            console.log("Location message stored!!");
            res.status(201).send(`Result \n\n ${result}`);
        }).catch(err =>{
            console.log("error in pushing location message\n");
            console.log(err);
            res.status(400).send("Error!!!")
        });
}

const postVideos = function(req, res){
    const imei = Number(req.body.imei);
    const video = new Video({   
                                imei: imei,
                                filename:req.body.filename,
                                data: req.body.data,
                            });
    video.save()
        .then(result =>{
            console.log("Video message stored!!");
            res.status(201).send(`Result \n\n ${result}`);
        }).catch(err =>{
            console.log("error in pushing video message\n");
            console.log(err);
            res.status(400).send("Error!!!")
        });
}

const receiveCommandResponse = function(req, res){
    // need to update this to store the command response and response time
    console.log(req.params.imei)
    console.log(req.body);
    res.send("Response received!");
}

exports.checkLogin = checkLogin;
exports.postAlarm = postAlarm;
exports.postLocation = postLocation;
exports.postVideos = postVideos;
exports.receiveCommandResponse = receiveCommandResponse;
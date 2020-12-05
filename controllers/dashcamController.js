const AlarmMessage = require("../models/alarmMessage")
const LocationMessage = require("../models/locationMessage");
const Video = require("../models/video");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const url = require('url');
const ALARM_PER_PAGE = 20;
const VIDEO_PER_PAGE = 5;

// client is provided with JWT token after logging in
const checkLogin = function(req, res){
    const imei = req.body.imei;
    const token = jwt.sign({imei: imei},
                            "somerandomsecret",
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
    const date = new Date();
    
    const locationMessage = new LocationMessage({ imei: req.body.imei,
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
    const date = new Date();
    //req.body = {imei: 1234, filename: "123_timestamp_1", data: "DATA_SAMPLE"}
    
    const video = new Video({   
                                imei:req.body.imei,
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
            resu.status(400).send("Error!!!")
        });
}

const sendCommand = function(req, res){
    // send command to a particular dashcam with the given IMEI number
};

const receiveCommandResponse = function(req, res){
    console.log(req);
    res.send("received!");
}

/*
    Pagination added for all the fetch logic to limit data.
*/

const fetchAllAlarms = function(req, res){
    const page = url.parse(req.url,true).query.page; 
    const imei = Number(req.params.imei);
    console.log(imei);
    AlarmMessage.find({imei: imei})
        .skip((page-1)*ALARM_PER_PAGE)
        .limit(ALARM_PER_PAGE)
        .then(messages => {
            console.log(messages);
            res.status(200).send(messages)
        }).catch(err =>{
            console.log("Error in finding products!!!")
            console.log(err);
            res.status(400).send(err);
        });
}

const fetchAllVideos = function(req, res){
    const page = url.parse(req.url,true).query.page;
    const imei = Number(req.params.imei);
    console.log(imei);
    Video.find({imei: imei})
        .skip((page-1)*VIDEO_PER_PAGE)
        .limit(VIDEO_PER_PAGE)
        .then(messages => {
            console.log(messages);
            res.status(200).send(messages)
        }).catch(err =>{
            console.log("Error in finding videos!!!")
            console.log(err);
            res.status(400).send(err);
        });
}

/*
    We are assuming that all the parameters will be given
*/
const filterAlarms = function(req, res){
    const page = url.parse(req.url,true).query.page;
    const imei = Number(req.params.imei);
    const startTime = new Date("2020-12-04T13:13:26.839+00:00");
    const endTime = new Date("2020-12-06T13:13:26.839+00:00");
    const alarmType = req.params.alarmtype;
    console.log(imei, startTime, endTime, alarmType)
    AlarmMessage.find({
                        imei: imei, 
                        alarmTime: {$gt: startTime, $lt: endTime},
                        alarmType: alarmType,
                    })
                .skip((page-1)*ALARM_PER_PAGE)
                .limit(ALARM_PER_PAGE)
                .then(messages => {
                    res.status(200).send(messages)
                }).catch(err =>{
                    console.log("Error in finding products!!!")
                    console.log(err);
                    res.status(400).send(err);
                });
}

exports.checkLogin = checkLogin;
exports.postAlarm = postAlarm;
exports.postLocation = postLocation;
exports.postVideos = postVideos;
exports.sendCommand = sendCommand;
exports.receiveCommandResponse = receiveCommandResponse;
exports.fetchAllAlarms = fetchAllAlarms;
exports.filterAlarms = filterAlarms;
exports.fetchAllVideos = fetchAllVideos;

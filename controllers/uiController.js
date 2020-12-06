const utils = require("../utils/constants");
const url = require('url');
const AlarmMessage = require("../models/alarmMessage");
const Video = require("../models/video");
const Command = require("../models/commandMessage");
const User = require("../models/user");

const ALARM_PER_PAGE = utils.ALARM_PER_PAGE;
const VIDEO_PER_PAGE = utils.VIDEO_PER_PAGE;

const addUser = function(req, res){
    console.log(req.params);
    const user = new User({imei: Number(req.params.imei)})
    user.save().then(result =>{
                    console.log("User added");
                    res.status(201).send(result);
                })
                .catch(err => {
                    console.log("User addition failed!");
                    res.status(400).send(err);
                })
    
}

const sendCommand = function(req, res){
    const imei = req.body.imei;
    const commandMessage = req.body.command;
    const command = new Command({ 
        imei: imei,
        command: commandMessage,
    });
    command.save()
        .then(result =>{
            console.log(`Sent command: ${command} to dashcam: ${imei}`);
            res.status(201).send({result});
        }).catch(err =>{
            console.log("error in pushing command message\n");
            console.log(err);
            res.status(400).send("Error!!!")
        });
};

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
    // const startTime = Date("2020-12-04T13:13:26.839+00:00");
    // const endTime = new Date("2020-12-06T13:13:26.839+00:00");
    // const alarmType = req.params.alarmtype;
    // console.log("Alarm type is: ",alarmType);
    console.log(page,imei, req.params.starttime, req.params.endtime, req.params.alarmtype)
    AlarmMessage.find({
                        imei: imei, 
                        alarmTime: {$gt: Date(req.params.starttime), $lt: Date(req.params.endtime)},
                        alarmType: req.params.alarmtype,
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

exports.sendCommand = sendCommand;
exports.fetchAllAlarms = fetchAllAlarms;
exports.filterAlarms = filterAlarms;
exports.fetchAllVideos = fetchAllVideos;
exports.addUser = addUser;
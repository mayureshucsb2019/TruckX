const express = require("express");
const router = express.Router();

const uiController = require("../controllers/uiController");

router.post("/sendcommand", uiController.sendCommand);

router.get("/fetchallalarms/imei/:imei", uiController.fetchAllAlarms);

router.get("/filteralarms/imei/:imei/starttime/:starttime/endtime/:endtime/alarmtype/:alarmtype", 
            uiController.filterAlarms);

router.get("/fetchvideo/:imei",uiController.fetchAllVideos);

// this has been added just to add user to simulate login and build up database easily
router.get("/adduser/imei/:imei",uiController.addUser);

module.exports = router;
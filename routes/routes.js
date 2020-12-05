const express = require("express");
const dashcamController = require("../controllers/dashcamController");
const router = express.Router();
//const isAuth = require("../middleware/isAuth");
/*
    For login all the dashcams must have some authentication token aswell.
    This token can be used for login to the system alongwith the imei number.
 */
router.post("/login", dashcamController.checkLogin);

router.post("/alarm", dashcamController.postAlarm);

// Location is sent by the dashcam every minute
router.post("/location", dashcamController.postLocation);

router.post("/video", dashcamController.postVideos);

router.post("/sendcommand", dashcamController.sendCommand);

router.get("/allalarms/imei/:imei", dashcamController.fetchAllAlarms);

router.get("/filteralarms/imei/:imei/starttime/:starttime/endtime/:endtime/alarmtype/:alarmtype", 
            dashcamController.filterAlarms);

router.get("/video/:imei",dashcamController.fetchAllVideos);

module.exports = router;
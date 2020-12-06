const express = require("express");
const router = express.Router();

const dashcamController = require("../controllers/dashcamController");
const isAuth = require("../middleware/isAuth");

router.post("/login", dashcamController.checkLogin);

router.post("/postalarm/:imei", isAuth, dashcamController.postAlarm);

router.post("/postlocation/:imei", isAuth, dashcamController.postLocation);

router.post("/postvideos", isAuth, dashcamController.postVideos);

router.post("/getcommandresponse/:imei", isAuth, dashcamController.receiveCommandResponse);

module.exports = router;

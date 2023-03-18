const router = require("express").Router();
const location_controller = require("../controllers/location.controller");

router.get('/location',location_controller.getLocationByName);

module.exports = router;
const router = require("express").Router();
const lecture_controller = require("../controllers/lecture.controller");

router.put('/update',lecture_controller.updateLecture);

module.exports = router;
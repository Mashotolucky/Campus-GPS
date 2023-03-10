const router = require("express").Router();
const student_controller = require("../controllers/student.controller");

router.put('/update',student_controller.updateStudent);

module.exports = router;
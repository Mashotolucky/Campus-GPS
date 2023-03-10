const router = require("express").Router();
const auth = require("./auth");
const student = require('./student');
const lecture = require("./lecture");

router.use("/auth",auth);
router.use("/student",student);
router.use("/lecture",lecture);

module.exports = router;
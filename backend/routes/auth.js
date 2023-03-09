const router = require("express").Router();
const auth_controller = require("../controllers/auth.controller");

router.post("/register", auth_controller.register);

module.exports = router;
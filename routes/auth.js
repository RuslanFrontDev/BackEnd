const express = require("express");
const { register, getUser} = require("./controller/auth");
const { getAccessToRoute } = require("../middleware/authorization/auth");
const router = express.Router();
router.post("/user", register);
router.get("/tokentest", getAccessToRoute,getUser);
module.exports = router;

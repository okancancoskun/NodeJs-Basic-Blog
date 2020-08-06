const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const locals = require('../middleware/locals')

router.get("/",locals,userController.getIndex);
router.get("/skills",locals,userController.getSkill);
router.get("/myworks",locals,userController.getMyWorks);
router.get('/aboutme',locals,userController.getAbout);

module.exports = router;
const express = require("express");
const router = express.Router();
const dmcaController = require("../controllers/dmcaController");


router.post("/submit-dmca", dmcaController.submitDMCA);

module.exports = router;

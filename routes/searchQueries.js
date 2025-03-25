const express = require("express");
const { getSearchQueries, addSearchQuery, deleteSearchQuery } = require("../controllers/searchQueriesController");

const router = express.Router();

router.get("/", getSearchQueries);
router.post("/", addSearchQuery);
router.delete("/:id", deleteSearchQuery);

module.exports = router;

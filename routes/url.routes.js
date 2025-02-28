const express = require("express");
const { generateShortUrl, getUrl } = require("../controller/url.controller");
const { StrictMode } = require("react");
const router = express.Router();

router.get("/shorten/:shortId",getUrl);
router.post("/shorten", generateShortUrl);
module.exports = router;

const { redirect } = require("react-router-dom");
const URL = require("../models/url.model");
const shortid = require("shortid");

async function generateShortUrl(req, res) {
  const body = req.body;
  const ip = req.ip;
  let shortId = "";
  if (!body.url) {
    return res.status(400).json({ error: "url is requiered" });
  }
  try {
    shortId = body.customAlias != undefined ? body.customAlias : shortid();
    if (shortId) {
      await URL.create({
        shortUrl: shortId,
        longUrl: body.url,
        visitHistory: [],
      });
    }
    const entry = await URL.findOne({ shortUrl: shortId });
    return res
      .status(200)
      .json({ createdAt: entry.createdAt, shortUrl: entry.shortUrl });
  } catch {
    res.status(400).json({error:"unable to generate Link"})
  }
}
async function getUrl(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) {
    res.status(400).json({ error: "alias not found" });
  }

  try {
    const entry = await URL.findOneAndUpdate(
      { shortUrl: shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    if (entry) res.redirect(entry.longUrl);
  } catch {
    res.status(500).json({ error: "invalid Url" });
  }
}
async function getAnalytics(req, res) {
  const shortId = req.params.shortUrl;
  if (req.params.topic) {
    const topic = req.params.topic;
    const result = URL.findOne({ shortId }, URL.$where(topic));
  } else {
    const result = URL.findOne({ shortId });
  }
  res.json({
    totalClicks: result.visitHistory.length,
    analytics: visitHistory,
  });
}
module.exports = { generateShortUrl, getUrl };

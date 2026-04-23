const express = require("express");
const app = express();
const port = 3000;
const Url = require("./urlModel");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/urlShortner");

app.use(express.json()); //middle Ware for converting raw data to js object
const urls = {};

app.get("/", (req, res) => {
  res.send("The URL Shortner Is Live!!!!");
});

app.post("/short", async (req, res) => {
  const shorturl = Math.random().toString(36).substring(2, 8); //converting the long url into
  const entry = new Url({ longUrl: req.body.longUrl, shortUrl: shorturl });
  await entry.save();
  res.send({
    longUrl: req.body.longUrl,
    shortUrl: shorturl,
  });
});
app.get("/:url", async (req, res) => {
  const urlDoc = await Url.findOne({shortUrl:req.params.url}); //shorten link redirection
  res.redirect(urlDoc.longUrl);
  console.log(req.params.url)
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`); //this is the logic to listen to the server
});

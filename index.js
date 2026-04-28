const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Url = require("./urlModel");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/urlShortner");
app.use(cors()); //cors is used to allow the cross origin resource sharing
app.use(express.json()); //middle Ware for converting raw data to js object
const urls = {};

app.get("/", (req, res) => {
  res.send("The URL Shortner Is Live!!!!");
});

app.post("/short", async (req, res) => {
  // console.log("body recived :" ,req.body);
  const shorturl = Math.random().toString(36).substring(2, 8); //converting the long url into
  const entry = new Url({ longUrl: req.body.longUrl, shortUrl: shorturl });
  await entry.save();
  console.log("Saved:", entry);
  res.send({
    longUrl: req.body.longUrl,
    shortUrl: shorturl,
  });
});
app.get("/:url", async (req, res) => {
  //  console.log(req.params.url);
  const urlDoc = await Url.findOne({ shortUrl: req.params.url }); //shorten link redirection
  if (urlDoc == null) {
    return res.status(404).send("The Url Is Not Found");
  }
  res.redirect(urlDoc.longUrl);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`); //this is the logic to listen to the server
});

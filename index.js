const express = require("express");
const app = express();
const port = 3000;
const Url = require("./urlModel");
mongoose.connect("mongodb://localhost:27017/urlShortner");

app.use(express.json()); //middle Ware for converting raw data to js object
const urls = {};

app.get("/", (req, res) => {
  res.send("The URL Shortner Is Live!!!!");
});

app.post("/short",async (req, res) => {
   const shortUrl =await Math.random().toString(36).substring(2, 8); //converting the long url into
  urls[shortUrl] = req.body.longUrl;
  console.log(urls);
  res.send({
    longUrl: req.body.longUrl,
    shortUrl: shortUrl,
  });
});
app.get("/:url", (req, res) => {
  const longUrl = urls[req.params.url]; //shorten link redirection
  res.redirect(longUrl);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`); //this is the logic to listen to the server
});

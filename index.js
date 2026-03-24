const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
const url = {};
app.get("/", (req, res) => {
  res.send("The URL Shortner Is Live!!!!");
});

app.post("/short", (req, res) => {
  const short = Math.random().toString(36).substring(2, 8);
  url[short] = req.body.longUrl;
  console.log(req.body);
  console.log(url);

  res.send({
    longUrl: req.body.longUrl,
    shortUrl: short,f
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

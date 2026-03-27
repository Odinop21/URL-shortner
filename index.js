const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
const urls = {};

app.get("/", (req, res) => {
  res.send("The URL Shortner Is Live!!!!");
});

app.post("/short", (req, res) => {
  const short = Math.random().toString(36).substring(2, 8);
   urls[short]= req.body.longUrl ;
  console.log(urls);
  res.send({
    longUrl: req.body.longUrl,
    shortUrl: short,
  });
});
app.get("/:url",(req, res)=>{
  const longUrl= urls[req.params.url];
  res.redirect(longUrl);
})
 

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

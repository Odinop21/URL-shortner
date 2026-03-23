const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("The URL Shortner Is Live!!!!");
});

app.post("/short", (req, res) => {
  res.send({
    longUrl: "https://www.google.com",
  });
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

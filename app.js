const express = require("express");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 8880;

// viewed at http://localhost:3000
app.get("/", function(req, res) {
  // this does not exist
  fs.createReadStream("index.html");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require("express"),
  port = 3002,
  app = express(),
  path = require("path");

app.use(express.static(path.join(__dirname + "/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
app.listen(port, () => {
  console.log("Server listening on port", port);
});

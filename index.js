const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDBClass = require("./mongo");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("main"));

app.post("/passwords", mongoDBClass.createPassword);
app.get("/passwords/:email/:password", mongoDBClass.signInUser);

app.listen(process.env.PORT || 7000, () => {
  console.log("server hosted on port 7000");
});

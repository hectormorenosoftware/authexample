const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDBClass = require("./mongo");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("main"));

app.post("/passwords", mongoDBClass.createPassword);
app.get("/passwords/:email/:password", mongoDBClass.loginUser);

app.listen(process.env.PORT || 7000, () => {
  console.log("It's alive! on port 7000");
});

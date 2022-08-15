const express = require("express");

require("dotenv").config();
const app = express();
const cors = require("cors");
const axios = require("axios");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const PORT = 3000;
const HOST = "localhost";



let result = "";
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

app.post("/login", async function (req, res) {
  console.log(req.body);

  try {
    const value = await axios({
      url: "https://next.fugamusic.com/api/v2/login",
      method: "post",
      data: req.body,
    });

    const cookie = value.headers["set-cookie"][0];

    result = cookie.substring(cookie.indexOf("=") + 1, cookie.indexOf(";"));

    console.log(result, 51);

    res.json(value.data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/assets", async function (req, res) {
  console.log("52");
  try {
    console.log("54");

    const value = await axios.get("https://next.fugamusic.com/api/v2/assets", {
      headers: {
        Cookie: `connect.sid=${result};`,
      },
    });
    res.json(value.data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

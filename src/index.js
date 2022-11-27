const path = require("path");
const express = require("express");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const app = express();
const port = 3010;

const route = require("./routes");
const db = require("./config/db");

// Connect to database
db.connect();
// Đọc ảnh
app.use(express.static(path.join(__dirname, "public")));

// Add middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// HTTP logger
// app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    encoding: "utf8",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// function(req,res){res.send("Hello World!")};

// Routes init
route(app);

// 127.0.0.1 : localhost

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const hbs = require("express-handlebars");
const app = express();
const port = 3010;

const SortMiddleware = require("./app/middlewares/SortMiddleware");

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

app.use(methodOverride("_method"));

app.use(SortMiddleware);

// HTTP logger
// app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    encoding: "utf8",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";
        const icons = {
          default: "oi oi-elevator ",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };
        const types = {
          default: "asc",
          asc: "desc",
          desc: "asc",
        };
        const icon = icons[sortType];
        const type = types[sortType];
        return `<a href="?_sort&column=${field}&type=${type}">
        <span class="${icon}"></span>
        </a>`;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// function(req,res){res.send("Hello World!")};

// Routes init
route(app);

// 127.0.0.1 : localhost

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

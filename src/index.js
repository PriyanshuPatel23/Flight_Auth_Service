const express = require("express");
const bodyParser = require("body-parser");

const { PORT, DB_SYNC } = require("./config/ServerConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");

const app = express();

const PrepareandStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.get("/", (req, res) => {
    res.send("Welcome, your app is working well");
  });

  app.listen(PORT, async () => {
    console.log(`Server Started on Port : ${PORT}`);

    if (DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

PrepareandStartServer();

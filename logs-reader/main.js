const express = require("express");
const app = express();
const port = 3005;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/logs", (req, res) => {
  readFromDatabase(function (response) {
    res.send(response);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const nano = require("nano")("http://admin:admin@127.0.0.1:5984"), // Not for production use :)
  per_page = 50, // TODO: Make it a query string parameter
  params = { include_docs: true, limit: per_page, descending: true };

var config = require("./config").config;

var init = async function () {
  await nano.db
    .get(config.couch_db_name)
    .catch((err) => {
      if (err.error == "not_found") {
        nano.db.create(config.couch_db_name);
      } else {
        console.log(err);
        console.log("Is CouchDB running locally?");
        throw err;
      }
    })
    .finally(() => {
      console.log(config.couch_db_name + " database ready to be used.");
    });
};

var readFromDatabase = async function (callback) {
  const logsDatabase = nano.db.use(config.couch_db_name);
  await logsDatabase
    .list(params)
    .then((response) => {
      console.log(new Date() + " - Fetched " + response.rows.length + " logs");
      callback(response);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

init();

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

app.get("/", (req, res) => {
  //   res.send("Hello World!");

  readFromDatabase(function (response) {
    res.send(response);
  });

  //   res.send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const couchdb = require("./couchdb"),
const nano = require("nano")("http://admin:admin@127.0.0.1:5984"), // Not for production use :)
  per_page = 10,
  params = { include_docs: true, limit: per_page, descending: true };
// var cdb = new couchdb.Db("logs");

// const NodeCouchDb = require("node-couchdb");
// const parser = require("./log-parser");

// // node-couchdb instance with default options
// const couch = new NodeCouchDb();

// parser.process_logs("./logs/test_log.txt", parser.logParser, function (logs) {
//   for (var i = 0, l = logs.length; i < l; i++) {
//     var log = logs[i];
//     // couch.insert("logs", log, function (err, res) {
//     //   if (err) return console.log(err);
//     //   console.log(res);
//     // });
//     cdb.put(uuid, log, function (err, result) {});
//   }
// });

var config = require("./config").config;
// couchdb = require("./lib/node-couchdb-min/couchdb"),
// parser = require("./log-parser");

// TODO: I NEED THIS
// await checkDatabaseExists(async function () {
//   const logsDatabase = nano.db.use(config.couch_db_name);
//   await logsDatabase
//     .insert({ foo: "bar" })
//     .then((response) => {
//       // p.process ... // TODO
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });

//   var debug = false;
//   if (debug) parser.setDebug(debug);
// });

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
  //   console.log("Processing " + sessions.length + " sessions");

  //   for (var i = 0; i < sessions.length; i++) {
  //     console.log(
  //       "Processing " +
  //         sessions[i].length +
  //         " logs for session " +
  //         (i + 1) +
  //         " of " +
  //         sessions.length
  //     );

  // TODO: Pass DB in a better way
  const logsDatabase = nano.db.use(config.couch_db_name);

  // TODO: Batch read
  //   for (const log of sessions[i]) {
  await logsDatabase
    // .get("6b1de0ffe31b04474ec38a999e003b15") // ID
    .list(params)
    .then((response) => {
      // p.process ... // TODO
      console.log(response);
      callback(response);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  //   }
  //   }
};

init();

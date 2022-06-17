// const couchdb = require("./couchdb"),
const parser = require("./log-parser");
const nano = require("nano")("http://admin:admin@127.0.0.1:5984"); // Not for production use :)

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
      parser.processLogs(config.file, parser.logParser, saveToDatabase);
    });
};

var saveToDatabase = async function (sessions) {
  console.log("Processing " + sessions.length + " sessions");

  for (var i = 0; i < sessions.length; i++) {
    console.log(
      "Processing " +
        sessions[i].length +
        " logs for session " +
        (i + 1) +
        " of " +
        sessions.length
    );

    // TODO: Pass DB in a better way
    const logsDatabase = nano.db.use(config.couch_db_name);

    // TODO: Batch insert
    for (const log of sessions[i]) {
      await logsDatabase
        .insert(log)
        .then((response) => {
          // p.process ... // TODO
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }

    // logsDB.put(uuid, log, function (err, result) {
    //   if (err) return sys.error(err.stack);
    //   if (debug)
    //     sys.log(
    //       "Created doc at " + uuid + " with --> " + sys.inspect(result)
    //     );
    // });
  }

  // logsDB.get("/_uuids?count=" + logs.length, function (err, result) {
  //   if (err) {
  //     return sys.error(err.stack);
  //   }

  //   var uuids = result.uuids;

  //   for (var i = 0, l = logs.length; i < l; i++) {
  //     var uuid = uuids[i];
  //     var log = logs[i];

  //     logsDB.put(uuid, log, function (err, result) {
  //       if (err) return sys.error(err.stack);
  //       if (debug)
  //         sys.log(
  //           "Created doc at " + uuid + " with --> " + sys.inspect(result)
  //         );
  //     });
  //   }
  // });
};

init();

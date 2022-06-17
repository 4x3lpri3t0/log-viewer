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
var sys = require("sys");
// couchdb = require("./lib/node-couchdb-min/couchdb"),
// parser = require("./log-parser");

var init = async function () {
  // var logsDB = new couchdb.Db(config.couch_db_name);
  // await nano.db
  //   .create("test")
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     console.log("Is CouchDB running locally?");
  //     throw err;
  //   });

  const logsTable = nano.db.use("test"); // TODO: logs
  await logsTable.insert({ foo: "bar" }).then((response) => {
    console.log(response);
    // p.process ...
  });

  var debug = false;
  if (debug) parser.setDebug(debug);
};

var couchdb_save_func = function (logs) {
  if (debug) {
    sys.puts("Processing " + logs.length + " logs");
  }

  logsDB.get("/_uuids?count=" + logs.length, function (err, result) {
    if (err) {
      return sys.error(err.stack);
    }

    var uuids = result.uuids;

    for (var i = 0, l = logs.length; i < l; i++) {
      var uuid = uuids[i];
      var log = logs[i];

      logsDB.put(uuid, log, function (err, result) {
        if (err) return sys.error(err.stack);
        if (debug)
          sys.log(
            "Created doc at " + uuid + " with --> " + sys.inspect(result)
          );
      });
    }
  });
};

init();
// parser.process_logs(config.file, parser.logParser, couchdb_save_func);

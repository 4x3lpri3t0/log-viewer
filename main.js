const couchdb = require("./couchdb"),
  parser = require("./log-parser");

var cdb = new couchdb.Db("logs");

// const NodeCouchDb = require("node-couchdb");
// const parser = require("./log-parser");

// // node-couchdb instance with default options
// const couch = new NodeCouchDb();

parser.process_logs("./logs/log1.txt", parser.logParser, function (logs) {
  for (var i = 0, l = logs.length; i < l; i++) {
    var log = logs[i];
    // couch.insert("logs", log, function (err, res) {
    //   if (err) return console.log(err);
    //   console.log(res);
    // });
    cdb.put(uuid, log, function (err, result) {});
  }
});

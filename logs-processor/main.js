const parser = require("./log-parser");
const nano = require("nano")("http://admin:admin@127.0.0.1:5984"); // Not for production use :)
const fs = require("fs");

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

      // Get file names under /logs directory
      const files = fs.readdirSync(config.raw_log_files_dir);

      for (let sessionId = 1; sessionId <= files.length; sessionId++) {
        const fileName = files[sessionId - 1];
        parser.processLogs(
          `${config.raw_log_files_dir}/${fileName}`,
          parser.logParser,
          saveToDatabase,
          sessionId
        );
      }
    });
};

var saveToDatabase = async function (logs, sessionId) {
  console.log(`Session ${sessionId} - Saving ${logs.length} logs to database.`);

  const logsDatabase = nano.db.use(config.couch_db_name);

  let docs = {
    docs: logs,
  };

  // Batch insert
  await logsDatabase
    .bulk(docs)
    .then((response) => {
      console.log(
        `Session ${sessionId} - Successfully saved ${response.length} logs to database.`
      );
    })
    .catch((err) => {
      console.log(`Session ${sessionId} - Error saving logs to database.`);
      console.log(err);
      throw err;
    });
};

init();

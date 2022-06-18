const parser = require("./log-parser");
const nano = require("nano")("http://admin:admin@127.0.0.1:5984"); // Not for production use :)
const fs = require("fs");

var config = require("./config").config;

var init = async function () {
  // Sessions db
  await nano.db
    .get(config.couch_db_sessions_name)
    .catch((err) => {
      if (err.error == "not_found") {
        nano.db.create(config.couch_db_sessions_name);
      } else {
        console.log(err);
        console.log("Is CouchDB running locally?");
        throw err;
      }
    })
    .finally(() => {
      console.log(
        config.couch_db_sessions_name + " database ready to be used."
      );
    });

  // Logs db
  await nano.db
    .get(config.couch_db_logs_name)
    .catch((err) => {
      if (err.error == "not_found") {
        nano.db.create(config.couch_db_logs_name);
      } else {
        console.log(err);
        console.log("Is CouchDB running locally?");
        throw err;
      }
    })
    .finally(() => {
      console.log(config.couch_db_logs_name + " database ready to be used.");

      // Get file names under /logs directory
      const files = fs.readdirSync(config.raw_log_files_dir);

      for (let sessionId = 1; sessionId <= files.length; sessionId++) {
        const fileName = files[sessionId - 1];
        parser.processLogs(
          `${config.raw_log_files_dir}/${fileName}`,
          parser.logParser,
          saveToDatabase,
          String(sessionId)
        );
      }
    });
};

var saveToDatabase = async function (logParseResult, sessionId) {
  const logs = logParseResult.logs;

  console.log(`Session ${sessionId} - Saving ${logs.length} logs to database.`);

  // Insert to session db
  const sessionsDatabase = nano.db.use(config.couch_db_sessions_name);
  let sessionDoc = {
    _id: sessionId,
    sessionStartDate: logParseResult.minDate,
    sessionEndDate: logParseResult.maxDate,
    sessionDurationSeconds: logParseResult.sessionDurationSeconds,
  };
  await sessionsDatabase
    .insert(sessionDoc)
    .then(() => {
      console.log(
        `Session ${sessionId} - Successfully saved session to database.`
      );
    })
    .catch((err) => {
      if (err.error == "conflict") {
        console.log(
          `Session ${sessionId} - Session already exists in database.`
        );
      } else {
        console.log(`Session ${sessionId} - Error saving session to database.`);
        console.log(err);
        throw err;
      }
    });

  // Batch insert to logs db
  const logsDatabase = nano.db.use(config.couch_db_logs_name);
  let docs = {
    docs: logs,
  };
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

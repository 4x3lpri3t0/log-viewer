#!/usr/bin/env node

const fs = require("fs");
const debug = false;

exports.logParser = function (msg, sessionId) {
  const lines = msg.split(/\n/);
  let logs = [];
  let log = {};
  let line = null;

  while ((line = lines.shift()) !== undefined) {
    if (line === "") {
      continue;
    }

    if (
      line.match(
        /((?<=\[)(\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}:\d{3}).+?(?=\]))/g
      )
    ) {
      log = {};
      tmp = line.match(/((?<=\[).+?(?=\]))/g);
      log["sessionId"] = sessionId;
      log["date"] = tmp[0];
      metadata = tmp[1].split(/\s+/);
      log["file"] = metadata[0];
      log["line"] = metadata[1];
      log["function"] = metadata[2];
      text = line.split("]: ")[1];
      if (!text) {
        throw new Error("Text is undefined for log with date: " + tmp[0]);
      }
      log["text"] = text;
      logs.push(log);
    } else {
      // A line that is part of last log message. Needs to be appended to previous text blob.
      log["text"] += "\n" + line;
    }
  }

  return logs;
};

/*
 * Parser Dispatcher
 */
// Takes file path, log process function, save log function, and session id
exports.processLogs = function (file, parserFunction, saveFunction, sessionId) {
  fs.readFile(file, "utf8", function (read_error, content) {
    if (read_error) {
      return sys.error(read_error);
    }

    let parsedLogs = parserFunction(content, sessionId);

    saveFunction(parsedLogs, sessionId);
  });
};

#!/usr/bin/env node

const fs = require("fs");
const debug = false;

exports.logParser = function (msg, sessionId) {
  const lines = msg.split(/\n/);
  let logs = [];
  let log = {};
  let line = null;

  let maxDate = new Date(-8640000000000000);
  let minDate = new Date(8640000000000000);

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

      // Date formatting ('24-07-2017 21:02:15:595' -> '2017-07-24T21:02:15.595Z')
      // TODO: Find a more performant way to do this.
      let rawDate = log["date"].split(" ");
      let parsedDate = rawDate[0]
        .split("-")
        .reverse()
        .join("-")
        .concat("T" + rawDate[1]);
      const lastIndex = parsedDate.lastIndexOf(":");
      const replacement = ".";
      parsedDate =
        parsedDate.substring(0, lastIndex) +
        replacement +
        parsedDate.substring(lastIndex + 1);

      // Update session date info.
      let date = new Date(parsedDate);
      minDate = Math.min(date, minDate);
      maxDate = Math.max(date, maxDate);
    } else {
      // A line that is part of last log message. Needs to be appended to previous text blob.
      log["text"] += "\n" + line;
    }
  }

  return { logs, minDate, maxDate };
};

exports.processLogs = function (file, parserFunction, saveFunction, sessionId) {
  fs.readFile(file, "utf8", function (read_error, content) {
    if (read_error) {
      return sys.error(read_error);
    }

    let logParseResult = parserFunction(content, sessionId);

    // Add delta
    logParseResult.sessionDurationSeconds = new Date(
      logParseResult.maxDate - logParseResult.minDate
    ).getSeconds();

    saveFunction(logParseResult, sessionId);
  });
};

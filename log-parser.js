#!/usr/bin/env node

const fs = require("fs");
const sys = require("sys");
const debug = false;

exports.logParser = function (msg, index) {
  // DEBUG:: Comment this out to ease debugging as it can get noisy
  // request.full_log = msg;

  const lines = msg.split(/\n/);
  let logs = [];
  let log = {};
  let line = null;

  while ((line = lines.shift()) !== undefined) {
    if (line === "") {
      continue;
    }

    // - Date
    // - File
    // - Line
    // - Function
    // - Text blob
    // TODO: See TODO.md
    if (
      line.match(
        /((?<=\[)(\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}:\d{3}).+?(?=\]))/g
      )
    ) {
      //   request["date"] = exports.dateToArray(tmp[0]);
      //   request.processing = {
      //     controller: tmp[1],
      //     action: tmp[2],
      //     format: tmp[3],
      //     ip: tmp[4],
      //     date: tmp[5],
      //     method: tmp[6],
      //   };

      tmp = line.match(/((?<=\[).+?(?=\]))/g);
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
    } else {
      // TODO: Probably a blob message part of previous log. Needs to be appended to previous log text.
      //   throw new Error("Unhandled log type: " + tmp[1]);
    }

    // console.log(log["date"]);
    // console.log(log["text"]);

    logs.push(log);

    // if (line === "") continue;
    // // Controller, Action, Format, IP, Date, Method
    // if (
    //   (tmp = line.match(
    //     /^Processing (.*?)Controller#([^\s]+?)(?: to ([^\s]+?))? \(for ([0-9\.]+?) at ([^)]+?)\) \[([^\]]+)\]$/
    //   ))
    // ) {
    //   request["date"] = exports.dateToArray(tmp[5]);
    //   request.processing = {
    //     controller: tmp[1],
    //     action: tmp[2],
    //     format: tmp[3],
    //     ip: tmp[4],
    //     date: tmp[5],
    //     method: tmp[6],
    //   };
    //   // Params Ruby hash
    // } else if ((tmp = line.match(/^\s+Parameters: ([{].+[}])$/))) {
    //   request.params = JSON.parse(
    //     tmp[1].replace(/(['"])\s?=>\s?(['"{])/g, "$1 : $2")
    //   );
    // } else if (line.match(/^Rendering/)) {
    //   if (!request.render) {
    //     request.render = [];
    //   }
    //   if ((tmp = line.match(/^Rendering template within (.*)/))) {
    //     request.render.push({ type: "layout", file: tmp[1] });
    //   } else if ((tmp = line.match(/^Rendering ([^\s]+)$/))) {
    //     request.render.push({ type: "view", file: tmp[1] });
    //   } else if ((tmp = line.match(/^Rendering ([^\s]+) \(([^\)]+)\)$/))) {
    //     request.render.push({ type: "view", file: tmp[1], error: tmp[2] });
    //   } else {
    //     if (exports.isDebug()) {
    //       sys.puts("***ERROR:: Could not parse Render line***");
    //       sys.puts("\t" + line);
    //     }
    //   }
    // } else if ((tmp = line.match(/^Redirected to ([^\s]+)$/))) {
    //   request.redirect = tmp[1];
    // } else if ((tmp = line.match(/^Filter chain halted as \[([^\]]+)\]/))) {
    //   request.chain_filter = tmp[1];
    //   // TimeTaken, ViewTime, DBTime, HTTP Status, URL
    // } else if (
    //   (tmp = line.match(
    //     /^Completed in ([^\s]+) \((?:View: ([0-9]+))?(?:, )?(?:DB: ([0-9]+))\) \| ([0-9]{3} .+?) \[([^\]]+)\]$/
    //   ))
    // ) {
    //   request.success = {
    //     elapsed_time: tmp[1],
    //     view_time: tmp[2],
    //     db_time: tmp[3],
    //     http_status: tmp[4],
    //     request_url: tmp[5],
    //   };
    // } else if (
    //   (tmp = line.match(
    //     /^(?:([^:\s]+)::)?([^\s]+?Error|UnknownAction) \((.+?)\)?:$/
    //   ))
    // ) {
    //   var error = {
    //     klass: tmp[1],
    //     error_type: tmp[2],
    //     error_msg: tmp[3],
    //     stack_trace: [],
    //   };
    //   if (
    //     error.error_type == "RoutingError" &&
    //     (tmp_error = error.error_msg.match(
    //       /^No route matches "([^"]+)" with ([{].+[}])$/
    //     ))
    //   ) {
    //     error.route = tmp_error[1];
    //     error.params = JSON.parse(
    //       tmp_error[2]
    //         .replace(/:([^\s=,]+)/g, '"$1"')
    //         .replace(/(['"])\s?=>\s?(['"{])/g, "$1 : $2")
    //         .replace(/"=>/g, '" :')
    //     );
    //   } else if (
    //     error.error_type == "TemplateError" &&
    //     (tmp_error = error.error_msg.match(
    //       /^wrong number of arguments \((([0-9]+) for ([0-9]+))\)\) on line #([0-9]+) of (.+)$/
    //     ))
    //   ) {
    //     error.arguments_msg = tmp_error[1];
    //     error.arguments_one = tmp_error[2];
    //     error.arguments_two = tmp_error[3];
    //     error.line_number = tmp_error[4];
    //     error.file = tmp_error[5];
    //     error.view_trace = [];
    //     while ((line = lines.shift()) !== undefined && line !== "") {
    //       error.view_trace.push(line.trim());
    //     }
    //   } else {
    //     if (exports.isDebug())
    //       sys.puts(
    //         "Count not match error(" +
    //           error.error_type +
    //           "): " +
    //           error.error_msg
    //       );
    //   }
    //   while ((line = lines.shift()) !== undefined && line !== "") {
    //     error.stack_trace.push(line.trim());
    //   }
    //   request.error = error;
    // } else {
    //   if (exports.isDebug()) sys.puts("Could not process line: " + line);
    // }
  }

  return logs;

  // if (request) {
  //   if (exports.isDebug()) {
  //     sys.puts(sys.inspect(request));
  //     sys.puts("\n");
  //   }

  //   return request;
  //   // return false;
  // } else {
  //   if (exports.isDebug()) {
  //     sys.puts("\nERROR:: Could not process log message:\n\n");
  //     sys.puts(sys.inspect(request.full_log));
  //     sys.puts("\n");
  //   }
  //   return false;
  // }
};

/*
 * Parser Dispatcher
 */
// Takes file path, log process function and save log function
exports.processLogs = function (file, parserFunction, saveFunction) {
  fs.readFile(file, "utf8", function (read_error, content) {
    var logs = [];
    if (read_error) {
      return sys.error(read_error);
    }

    // TODO:: Remove these hardcode rails filters
    // switch filters and split functions to a nested helper in process func
    content
      .replace(/^Starting the New Relic Agent[^\n]+/, "")
      .replace(/^\*\*\s+vote_fu[^\n]+/, "")
      .split(/\n{3,}/)
      .forEach(function (msg, index) {
        if ((tmp = parserFunction(msg, index))) {
          logs.push(tmp);
        }
      });

    saveFunction(logs);
  });
};

/*
 * Utility Functions
 */
exports.setDebug = function (val) {
  debug = !!val;
};

exports.isDebug = function () {
  return debug;
};

exports.dateToArray = function (dateObj) {
  if (typeof dateObj !== "object") dateObj = new Date(dateObj);
  return [
    dateObj.getFullYear(),
    dateObj.getMonth() + 1,
    dateObj.getDate(),
    dateObj.getHours(),
    dateObj.getMinutes(),
    dateObj.getSeconds(),
  ];
};

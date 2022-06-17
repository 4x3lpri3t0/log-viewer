# TODO

# Website -> view log files.

Each file is 1 session.

Using the logs -> complete the following:
❏ parse sessions via script
❏ get information out of them
❏ put -> SQL database
❏ display results: very basic website (aesthetics don't matter)

The entries in the log files should be able to be parsed with a line parser (it's not xml or json).

A log entry contains a timestamp, file, line, function, and a blob of text (that can contain newlines) with the actual info in it.

# Additional requirements:

❏ a log should be able to be linked to a session (id, date, duration)
❏ for a certain amount of sessions (let's say the amount is dictated between 2 dates/times), we would like to see the top 10 most occurring log entries and the top 10 entries that occur most across all sessions
❏ we would like to see entries that are new since a certain date/time, so the first occurrence of that log entry should be after that specific date/time. The error cannot have occurred before the given date/time

# My NOTES:

Log breakdown:

- Timestamp
- File
- Line
- Function
- Text blob
- Session id
- Session date (start?)
- Session date (end?)
- Session duration

docker run -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=password -d couchdb
(src: https://hub.docker.com/_/couchdb)
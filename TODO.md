# TODO

# Website -> view log files.

Each file is 1 session.

Using the logs -> complete the following:
- [ ] parse sessions via script
- [ ] get information out of them
- [ ] put -> SQL database
- [ ] display results: very basic website (aesthetics don't matter)

The entries in the log files should be able to be parsed with a line parser (it's not xml or json).

A log entry contains a timestamp, file, line, function, and a blob of text (that can contain newlines) with the actual info in it.

# Additional requirements:

- [ ] a log should be able to be linked to a session (id, date, duration)
- [ ] for a certain amount of sessions (let's say the amount is dictated between 2 dates/times), we would like to see the top 10 most occurring log entries and the top 10 entries that occur most across all sessions
- [ ] we would like to see entries that are new since a certain date/time, so the first occurrence of that log entry should be after that specific date/time. The error cannot have occurred before the given date/time

# TODO
- [ ] Parallelize the parsing of the log files.
- [ ] Batch insert to CouchDB.

# My NOTES:

Log breakdown:

- Date
- File
- Line
- Function
- Text blob
- Session id
- Session date (start?)
- Session date (end?)
- Session duration

# Local Logs Processor

```sh
$ cd logs-processor
$ node main
```

# Local Logs Reader

```sh
$ cd logs-reader
$ node main
```

# Local Frontend

```sh
$ nvm use 17.0.0 # Or install node version 17.0.0 manually
$ cd frontend
$ yarn # install dependencies
$ yarn run build
$ yarn start
```

# CouchDB locally

Requirements:
* CouchDB
  - Installation guide: https://docs.couchdb.org/en/3.2.0/install/index.html
  - Enable CORS: http://localhost:5984/_utils/#_config/couchdb@localhost/cors

Check DB status after install:
```sh
$ curl -X GET http://admin:admin@127.0.0.1:5984/_users
```

# CouchDB on k8s

Requirements:
* Docker
* Minkube
* Kubectl
* Helm

```sh
$ helm repo add couchdb https://apache.github.io/couchdb-helm

$ helm install couchdb couchdb/couchdb --values kubernetes/helm/couchdb-values.yaml \
  --set allowAdminParty=true \
  --set couchdbConfig.couchdb.uuid=$(curl https://www.uuidgenerator.net/api/versio
n4 2>/dev/null | tr -d -)

$ kubectl get pods --namespace default -l "app=couchdb,release=couchdb"

$ kubectl exec --namespace default couchdb-couchdb-0 -c couchdb -- \
    curl -s \
    http://127.0.0.1:5984/_cluster_setup \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"action": "finish_cluster"}'
```
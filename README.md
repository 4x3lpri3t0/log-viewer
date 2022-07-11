# Log Processor (Parser + Saver) + Frontend (React) + CouchDB

Components:
* logs-processor:
  * Parses logs from a directory to JSON format.
  * Saves parsed files to a Couch database. It's fairly modular, so you can use it for other DBs.
* frontend:
  * Web interface that displays logs from the database.
* CouchDB:
  * Database that logs are saved to.

## Database Schema

Logs db:
- sessionId
- date
- file
- line
- function
- text

Sessions db:
- sessionStartDate
- sessionEndDate
- sessionDurationSeconds

## Running Locally

### logs-processor
```sh
$ cd logs-processor
$ yarn
$ node main
```

### logs-reader

```sh
$ cd logs-reader
$ yarn
$ node main
```

### frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```sh
$ nvm use 17.0.0 # Or install node version 17.0.0 manually
$ cd frontend
$ yarn # install dependencies
$ yarn run build
$ yarn start # runs the app in the dev mode
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### couch

- CouchDB installation guide: https://docs.couchdb.org/en/3.2.0/install/index.html
- Enable CORS using the Fauxton web interface: http://localhost:5984/_utils/#_config/couchdb@localhost/cors
- Check DB status after installation:
```sh
$ curl -X GET http://admin:admin@127.0.0.1:5984/_users
```

## Running CouchDB on Kubernetes

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

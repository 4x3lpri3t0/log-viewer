import { PouchDB } from "./imports.jsx";

class DB {
  constructor() {
    this.initDb = this.initDb.bind(this);
    this.initUserDb = this.initUserDb.bind(this);
    this.syncDb = this.syncDb.bind(this);
    this.syncUserDb = this.syncUserDb.bind(this);
    this.getDoc = this.getDoc.bind(this);

    this.remote = new PouchDB(
      `${WP_CONF_REMOTE_DB_URL}/${WP_CONF_REMOTE_DB_NAME}`,
      {
        skip_setup: true,
        fetch: (url, opts) => {
          opts.credentials = "include";
          return PouchDB.fetch(url, opts);
        },
      }
    );
  }

  initDb(name) {
    this[name] = {
      local: new PouchDB(name),
      remote: new PouchDB(`${WP_CONF_REMOTE_DB_URL}/${name}`, {
        skip_setup: true,
        fetch: (url, opts) =>
          PouchDB.fetch(url, { ...opts, credentials: "include" }),
      }),
    };
  }

  initUserDb(name) {
    this.user = {
      local: new PouchDB(name),
      remote: new PouchDB(`${WP_CONF_REMOTE_DB_URL}/${name}`, {
        skip_setup: true,
        fetch: (url, opts) =>
          PouchDB.fetch(url, { ...opts, credentials: "include" }),
      }),
    };
  }

  syncDb(name) {
    this[name].sync = this[name].local.sync(this[name].remote, {
      live: true,
      retry: false,
    });
  }

  syncUserDb() {
    this.user.sync = this.user.local.sync(this.user.remote, {
      live: true,
      retry: false,
    });
  }

  getDoc(dbName, _id) {
    return new Promise((resolve, reject) => {
      let doc = { _id: _id };
      this[dbName].local
        .get(_id)
        .then((d) => (doc = d))
        .catch(() => this[dbName].local.put(doc).catch(reject))
        .finally(() => resolve(doc));
    });
  }

  getDocs(dbName) {
    // import PouchDB from 'pouchdb-react-native';
    // const localDB = new PouchDB("albums", { adapter: "asyncstorage" });

    // var db = new PouchDB("logs", {
    //   fetch: function (url, opts) {
    //     return PouchDB.fetch(url, opts, { credentials: "include" });
    //   },
    // });

    // PouchDB.plugin(require("pouchdb-adapter-asyncstorage").default)

    var remote = new PouchDB(
      "http://admin:admin@localhost:5984/logs",
      {
        fetch: (url, opts) => {
          fetch(url, { ...opts, credentials: "include" });
        },
      },
      {
        skip_setup: true,
      }
    );

    const localDB = new PouchDB("logs", {
      adapter: "asyncstorage",
      fetch: (url, opts) => {
        return PouchDB.fetch(url, opts, { credentials: "include" });
      },
    });

    localDB.replicate
      .from(remote, {
        live: true,
        retry: true,
      })
      .on("change", function (change) {
        // yo, something changed!
        console.log(11330, " changes ", change);
      })
      .on("paused", function (info) {
        // replication was paused, usually because of a lost connection
        console.log("paused ", info);
      })
      .on("active", function (info) {
        // replication was resumed
        console.log("active ", info);
      })
      .on("error", function (err) {
        // totally unhandled error (shouldn't happen)
        console.log(1339, err);
      });

    return new Promise((resolve, reject) => {
      localDB
        .get("6b1de0ffe31b04474ec38a999e003b15", {
          include_docs: true,
          credentials: "include",
        })
        .then((result) => {
          console.log(result);

          return resolve(result);
        })
        .catch((err) => {
          if (err.status === 404) {
            console.log(
              " ???????????? getDoc not found: ",
              "6b1de0ffe31b04474ec38a999e003b15"
            );

            return resolve(null);
          } else {
            console.log("[!!!!======>!!!!!!] getDoc err: ", err);

            return reject(err);
          }
        });
    });

    // return new Promise((resolve, reject) => {
    //   var db = new PouchDB("albums");

    //   db.allDocs(
    //     {
    //       include_docs: true,
    //     },
    //     function (err, docs) {
    //       if (err) {
    //         return console.log(err);
    //       } else {
    //         console.log(docs);
    //         // console.log(docs.rows[1].doc);
    //       }
    //     }
    //   );

    //   let docs = {};
    //   this[dbName].local
    //     .allDocs({
    //       include_docs: true,
    //       attachments: true,
    //       //   binary: true,
    //       //   conflicts: true,
    //       //   descending: true,
    //       //   startkey: "",
    //       //   endkey: "",
    //       //   limit: 0,
    //       //   skip: 0,
    //       //   inclusive_end: true,
    //       //   rev: true,
    //       //   keys: [],
    //     })
    //     .then((d) => {
    //       console.log(d);
    //       docs = d;
    //     })
    //     .catch(() => {
    //       console.log("Recorcholis batman. Ni puta idea que hago aca!!!");
    //     })
    //     .finally(() => resolve(docs));
    // });
  }
}

export default new DB();

import { PouchDB } from "./imports.jsx"


class DB {

    constructor(){        
        this.initDb = this.initDb.bind(this)
        this.initUserDb = this.initUserDb.bind(this)
        this.syncDb = this.syncDb.bind(this)
        this.syncUserDb = this.syncUserDb.bind(this)
        this.getDoc = this.getDoc.bind(this)

        this.remote = new PouchDB(
            `${WP_CONF_REMOTE_DB_URL}/${WP_CONF_REMOTE_DB_NAME}`, { 
                skip_setup: true,
                fetch: (url, opts) => {
                    opts.credentials='include'
                    return PouchDB.fetch(url, opts)
                } })
    }
    
    initDb(name){
        this[name] = {
            local: new PouchDB(name) ,
            remote: new PouchDB(`${WP_CONF_REMOTE_DB_URL}/${name}`, { 
                        skip_setup: true,
                        fetch: (url, opts) => PouchDB.fetch(url, {...opts, credentials:'include'})
                    })
        }
    }

    initUserDb(name){
        this.user = {
            local: new PouchDB(name) ,
            remote: new PouchDB(`${WP_CONF_REMOTE_DB_URL}/${name}`, { 
                        skip_setup: true,
                        fetch: (url, opts) => PouchDB.fetch(url, {...opts, credentials:'include'})
                    })
        }
    }

    syncDb(name) {
        this[name].sync = this[name].local.sync(this[name].remote, { live: true, retry: false})
    }

    syncUserDb() {
        this.user.sync = this.user.local.sync(this.user.remote, 
            { live: true, retry: false})
    }


    getDoc(dbName, _id){
        return new Promise((resolve, reject) => {
            let doc = {_id: _id}
            this[dbName].local.get(_id).then(d => doc=d)
                .catch(()=>this[dbName].local.put(doc).catch(reject))
                    .finally(() => resolve(doc))
        })
    }
}

export default new DB()
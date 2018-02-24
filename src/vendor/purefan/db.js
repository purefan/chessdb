import PouchDB from 'pouchdb-browser'
const db_name = 'libase' + (process.env.NODE_ENV === 'test' ? '_text' : '')
const log = require('./logger')


const db = {}
db.init = () => {
    if (!db._conn) {
        const db_instance = PouchDB(db_name);
        db._conn = db_instance
    }
}

db.get = (name) => {
    return db._conn.get(name)
}

db.reset_db = () => {
    db._conn = require('pouchdb-browser')(db_name)
}

db._update = (doc, value) => {
    return db._conn.put(Object.assign(
        {},
        doc,
        value,
        { _rev: doc._rev }
    ))
}

db.set = (name, value) => {
    db.init()
    return db._conn
        .get(name)
        .then((doc) => {
            return db._conn.put(Object.assign({}, doc, { _rev: doc._rev, value: value }))
        })
        .catch((e) => {
            console.error('in catch', e.name)
            if (e.name === 'not_found') {
                return db._conn.put({
                    _id: name,
                    value: value
                })
            }
        })

}

export default db
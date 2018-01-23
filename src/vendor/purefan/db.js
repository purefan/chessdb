import PouchDB from 'pouchdb-browser'
const db_name = 'libase' + (process.env.NODE_ENV === 'test' ? '_text' : '')
const log = require('./logger')


const db = {}
db.init = () => {
    log(`db.init::db_name = ${db_name}`)
    if (!db._conn) {
        const db_instance = PouchDB(db_name);
        db._conn = db_instance
        console.log('db.init::check', {what: db})
    }

    log(`db.init::db_name done`)
}

db.get = (name) => {
    log(`db.get::name = ${name}`)
    return db._conn.get(name)
}

db.reset_db = () => {
    log(`db.reset_db::db_name = ${db_name}`)
    db._conn = require('pouchdb-browser')(db_name)
}

db._update = (doc, value) => {
    log('in _update')
    return db._conn.put(Object.assign(
        {},
        doc,
        value,
        { _rev: doc._rev }
    ))
}

db.set = (name, value) => {
    log(`db.set::${name} => ${value}`)
    return db._conn
        .get(name)
        .then((doc) => {
            log('in then')
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
const db_name = 'vogula' + (process.env.NODE_ENV === 'test' ? '_text': '')

vogula.db = {}
vogula.db.init = () => {
    vogula.log(`vogula.db.init::db_name = ${db_name}`)
    vogula.db._conn = require('pouchdb-browser')(db_name)
    vogula.log(`vogula.db.init::db_name done`)
}

vogula.db.get = (name) => {
    vogula.log(`vogula.db.get::name = ${name}`)
    return vogula.db._conn.get(name)
}

vogula.db.reset_db = () => {
    vogula.log(`vogula.db.reset_db::db_name = ${db_name}`)
    vogula.db._conn = require('pouchdb-browser')(db_name)
}

vogula.db._update = (doc, value) => {
    vogula.log('in _update')
    return vogula.db._conn.put(Object.assign(
        {},
        doc,
        value,
        {_rev: doc._rev}
    ))
}

vogula.db.set = (name, value) => {
    vogula.log(`vogula.db.set::${name} => ${value}`)
    return vogula.db._conn
        .get(name)
            .then((doc) => {
                vogula.log('in then')
                return vogula.db._conn.put(Object.assign({}, doc, {_rev: doc._rev, value: value}))
            })
            .catch((e) => {
                vogula.error('in catch', e.name)
                if (e.name === 'not_found') {
                    return vogula.db._conn.put({
                        _id: name,
                        value: value
                    })
                }
            })

}
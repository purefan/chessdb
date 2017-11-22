const db_name = 'vogula' + (process.env.NODE_ENV === 'test' ? '_text': '')

vogula.db = {}
vogula.db.init = () => {
    console.log(`vogula.db.init::db_name = ${db_name}`)
    vogula.db._conn = require('pouchdb-browser')(db_name)
}

vogula.db.get = (name) => {
    return vogula.db._conn.get(name)
}

vogula.db.reset_db = () => {
    console.log(`vogula.db.reset_db::db_name = ${db_name}`)
    vogula.db._conn = require('pouchdb-browser')(db_name)
}

vogula.db._update = (doc, value) => {
    console.log('in _update')
    return vogula.db._conn.put(Object.assign(
        {},
        doc,
        value,
        {_rev: doc._rev}
    ))
}

vogula.db.set = (name, value) => {
    return vogula.db._conn
        .get(name)
            .then((doc) => {
                console.log('in then')
                return vogula.db._conn.put(Object.assign({}, doc, {_rev: doc._rev, value: value}))
            })
            .catch((e) => {
                console.log('in catch', e.name)
                if (e.name === 'not_found') {
                    return vogula.db._conn.put({
                        _id: name,
                        value: value
                    })
                }
            })

}
console.log('on load')
const vogula_db = require('pouchdb-browser')('vogula')

function addTodo(text) {
    let todo = {
        _id: new Date().toISOString(),
        title: text,
        completed: false
    };
    vogula_db.put(todo, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a todo!');
        }
    });
}

function showTodos() {
    vogula_db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
        if (err) {
            return console.error(err)
        }
        console.log(doc);
    });
}

addTodo('Todo 1 at ' + (new Date()))
showTodos()
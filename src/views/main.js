// index.js
const m = require("mithril")
const chessboard = require('./chessboard')

console.log(chessboard)
m.mount(document.body, chessboard)
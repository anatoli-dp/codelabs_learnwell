const Path = require('path')
const Database = require('better-sqlite3')
const db = new Database(Path.join(Path.resolve('./'), "store.db3"))

export default db
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

const initDb = async () => {

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS acc (id INTEGER PRIMARY KEY AUTOINCREMENT,login TEXT NOT NULL,password TEXT NOT NULL)")
        db.run("CREATE TABLE IF NOT EXISTS tokens (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER NOT NULL,token TEXT NOT NULL,FOREIGN KEY(userId) REFERENCES users(id))")
        db.run("CREATE TABLE IF NOT EXISTS topics (id INTEGER PRIMARY KEY, theme TEXT NOT NULL,authorId INTEGER NOT NULL,createdAt TEXT NOT NULL,FOREIGN KEY(authorId) REFERENCES users(id))")
        db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL, topicId INTEGER NOT NULL, authorId INTEGER NOT NULL, createdAt TEXT NOT NULL, FOREIGN KEY(authorId) REFERENCES users(id))")
    });

    db.close();

}

 const getDb = () => db

 module.exports = {
     initDb,
     getDb
}


const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));

const sqlite3 = require('sqlite3').verbose();


const cors=require("cors");
const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))



const filePath = "users.json";
app.get("/api/users", function(req, res){
    const db = new sqlite3.Database('db.sqlite3');
    db.serialize(() => {
        db.all("SELECT * FROM acc", (err, row) => {
            let users = JSON.parse(JSON.stringify(row))
            res.send(users)
        });
    });
    db.close();
});
// получение одного пользователя по id
app.get("/api/users/:id", function(req, res){
    const db = new sqlite3.Database('db.sqlite3');
    db.serialize(() => {
        const id = req.params.id;
        db.get(`SELECT * FROM acc WHERE rowid=${id}`, (err, row) => {
            //console.log(row)
            res.send(JSON.parse(JSON.stringify(row)))
        });
    });
    db.close();
});
// // получение отправленных данных
app.post("/api/users", jsonParser, function (req, res) {
//
    if(!req.body) return res.sendStatus(400);
//
    console.log("проверка")

    const db = new sqlite3.Database('db.sqlite3');

    db.serialize(() => {

        const stmt = db.prepare("INSERT INTO acc VALUES (?,?)");
        stmt.run(req.body.login,req.body.password);
        stmt.finalize();

        db.all("SELECT * FROM acc", (err, row) => {
            let users = JSON.parse(JSON.stringify(row))
            res.send(users)
        });

    });
    db.close()
});
// // удаление пользователя по id
app.delete("/api/users/:id", function(req, res){
    const db = new sqlite3.Database('db.sqlite3');
    const id = req.params.id;
    //console.log(id)
    db.run(`DELETE FROM acc WHERE ROWID=${id}`);

    db.all("SELECT * FROM acc", (err, row) => {
        let users = JSON.parse(JSON.stringify(row))
        res.send(users)
    });
    db.close()
});
// // изменение пользователя
app.put("/api/users", jsonParser, function(req, res){
//
    if(!req.body) return res.sendStatus(400);
//
//     const userId = req.body.id;
//     const userName = req.body.name;
//     const userAge = req.body.age;
    const db = new sqlite3.Database('db.sqlite3');
    const id = req.body.id;
    console.log(id)
    db.run(`UPDATE acc SET password ='${req.body.password}'  WHERE ROWID=${id}`);

    db.all("SELECT rowid AS id, info FROM lorem", (err, row) => {
        let users = JSON.parse(JSON.stringify(row))
        res.send(users)
    });
    db.close()

});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});

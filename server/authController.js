const jwt = require("jsonwebtoken")

class authController{

    async registration(req,res){
        try{
            const bcrypt = require('bcryptjs')

            const sqlite3 = require('sqlite3').verbose();

            const {username, password} = req.body

            if(!req.body) return res.sendStatus(400);

            const hash = bcrypt.hashSync(password, 7)

            const db = new sqlite3.Database('db.sqlite3');

            db.serialize(() => {
                const stmt = db.prepare("INSERT INTO acc(login,password) VALUES (?,?)");
                stmt.run(req.body.login,hash);
                stmt.finalize();

                db.all("SELECT * FROM acc", (err, row) => {
                    let users = JSON.parse(JSON.stringify(row))
                    res.send(users)
                });});
            db.close()

        } catch (e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req,res){
        try {
            const fs = require("fs");
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database('db.sqlite3');
            const bcrypt = require('bcryptjs')

             db.serialize(() => {
                 db.all("SELECT * FROM acc", (err, row) => {
                     const users = JSON.parse(JSON.stringify(row))
                     for (let i=0; i<users.length;i++){
                         if (req.body.login===users[i].login){
                             const validPassword = bcrypt.compareSync(req.body.password, users[i].password)

                             if (validPassword){
                                 let token = ""
                                 token = jwt.sign({id: users[i].id},"secret",{expiresIn: "24h"})
                                 console.log(token)
                                 fs.open("temp.txt",'w',(err) => {})
                                 fs.writeFileSync("temp.txt",token)

                             }
                         }
                     }
                 });
                        setTimeout(e=> {
                            const token = fs.readFileSync("temp.txt","utf-8")
                            if (token===""){
                                res.status(400).json("Fail");
                            }
                            else {
                                fs.writeFileSync("temp.txt","")
                                try {
                                    const db = new sqlite3.Database('db.sqlite3');
                                    db.serialize(() => {
                                        const stmt = db.prepare("INSERT INTO tokens(userId,token) VALUES (?,?)");
                                        stmt.run(jwt.decode(token).id, token);
                                        stmt.finalize()
                                    })
                                    db.close()
                                }
                                catch {

                                }
                                res.status(200).json(token);
                            }
                        },1000)

             });
             db.close();

        } catch (e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req,res){
        try {
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database('db.sqlite3');
            db.serialize(() => {
                db.all("SELECT * FROM acc", (err, row) => {
                    let users = JSON.parse(JSON.stringify(row))
                    res.send(users)
                });
            });
            db.close();

        } catch (e){
            console.log(e)
            res.status(400).json({message: 'error'})
        }
    }

    async getUserbyId(req,res){
        try {
            const id = req.params.id
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database('db.sqlite3');
            db.serialize(() => {
                db.all(`SELECT * FROM acc INNER JOIN tokens on acc.id=tokens.userId where acc.id=${id}`, (err, row) => {
                    let users = JSON.parse(JSON.stringify(row))
                    res.send(users)
                    //res.status(200).json(users)
                });
            });
            db.close();
        }
        catch (e){
            console.log(e)
            res.status(400).json({message: 'error'})
        }
    }

    async CreateTheme(req,res){
        try{
            const {username, token,theme,body} = req.body
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database('db.sqlite3');
            db.serialize(() => {
                db.all(`SELECT * FROM acc INNER JOIN tokens on acc.id=tokens.userId where acc.login='${username}'`, (err, row) => {
                    let users = JSON.parse(JSON.stringify(row))
                    const db3 = new sqlite3.Database('db.sqlite3')
                    db3.all(`SELECT MAX(id) FROM topics`, (err, row) => {
                        if (users[users.length-1].token === req.body.token){
                            let topics = JSON.parse(JSON.stringify(row))
                            const sqlite3 = require('sqlite3').verbose();
                            const db2 = new sqlite3.Database('db.sqlite3');
                            const stmt = db2.prepare("INSERT INTO topics(id,theme,authorId,createdAt) VALUES (?,?,?,?)");
                            stmt.run(topics["MAX(id)"]+1,req.body.theme,users[0].userId,new Date().getDate() + "." + (new Date().getMonth()+1) + "." + new Date().getFullYear());
                            stmt.finalize();
                            console.log("hello4")
                            const sqlite4 = require('sqlite3').verbose();
                            const db4 = new sqlite4.Database('db.sqlite3');
                            const stmt2 = db4.prepare("INSERT INTO messages(body,topicId,authorId,createdAt) VALUES (?,?,?,?)");
                            stmt2.run(req.body.body, topics[0]["MAX(id)"]+1, users[0].userId, new Date().getDate() + "." + (new Date().getMonth()+1) + "." + new Date().getFullYear());
                            stmt2.finalize();
                            db4.close()
                        }
                    })
                });
            });
            db.close();

        }
        catch (e){
            console.log(e)
            res.status(400).json("Error")
        }
    }

    async CreateMessage(req,res){
        try{
            const {username, token,theme,body} = req.body

             const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database('db.sqlite3');
            db.serialize(() => {
                db.all(`SELECT * FROM acc INNER JOIN tokens on acc.id=tokens.userId where acc.login='${username}'`, (err, row) => {
                    let users = JSON.parse(JSON.stringify(row))
                    if (users[users.length-1].token === req.body.token) {
                        const sqlite3 = require('sqlite3').verbose();
                        const db2 = new sqlite3.Database('db.sqlite3');
                        db2.all(`SELECT * FROM topics Where theme='${req.body.theme}'`, (err, row) => {
                            //console.log(req.body.theme)
                            let topics = JSON.parse(JSON.stringify(row))
                            console.log(row)
                            const stmt = db2.prepare("INSERT INTO messages(body,topicId,authorId,createdAt) VALUES (?,?,?,?)");
                            stmt.run(req.body.body, topics[topics.length-1].id, users[0].userId, new Date().getDate() + "." + (new Date().getMonth()+1) + "." + new Date().getFullYear());
                            stmt.finalize();
                        })
                    }
                    else{
                        res.status(400).json({message: 'Invalid Token'})
                    }
                })
            })


            db.close()
        }
        catch (e){
            res.status(400).json({message: 'error'})
        }
    }

    async getTopics(req,res){
        try {
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database('db.sqlite3');
            db.serialize(() => {
                db.all(`SELECT topics.id,theme,authorId,createdAt,login FROM topics inner join acc on acc.id=authorId`, (err, row) => {
                    let users = JSON.parse(JSON.stringify(row))
                    res.send(users)
                });
            });
            db.close();

        } catch (e){
            console.log(e)
            res.status(400).json({message: 'error'})
        }
    }

    async getSearchTopics(req,res){
        //try {
            const {search} = req.body
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database('db.sqlite3');
            db.serialize(() => {
                db.all(`SELECT topics.id,theme,authorId,createdAt,login FROM topics inner join acc on acc.id=authorId where theme LIKE '%${req.body.search}%'`, (err, row) => {
                    //console.log(req.body.search)
                    let users = JSON.parse(JSON.stringify(row))
                    console.log(users)
                    res.send(users)
                });
            });
            db.close();

        //} catch (e){
         //   console.log(e)
         //   res.status(400).json({message: 'error'})
        //}
    }


    async getAllMessagesById(req,res){
        try{
            const id = req.params.id;
            const sqlite3 = require('sqlite3').verbose();
            const db = new sqlite3.Database('db.sqlite3');
            db.serialize(() => {
                db.all(`SELECT * FROM topics inner join acc on acc.id=messages.authorId inner join messages on messages.topicId=topics.id Where topicId=${id}`, (err, row) => {
                    let users = JSON.parse(JSON.stringify(row))
                    res.send(users)
                });
            });
            db.close();
        }
        catch (e){
            console.log(e)
            res.status(400).json({message: 'error'})
        }
    }

}

module.exports = new authController()

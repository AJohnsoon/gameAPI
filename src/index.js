import MongoClient, { url } from './database/db.js'
import express from 'express';
import mongoDB from 'mongodb';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const jwtSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

app.get('/api/v1/games', (req, res) => {
    try {
        const findAll = MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("gameAPI");
            dbo.collection("games").find({}).toArray(function (err, result) {
                return res.json(result)
            });
        });
        return findAll
    } catch (err) {
        console.info("Error when find game", err)
    }
})

app.get('/api/v1/games/:_id', (req, res) => {
    try {
        const findGame = MongoClient.connect(url, (err, db) => {
            const param = req.params._id
            if (isNaN(param)) {
                let dbo = db.db("gameAPI")
                dbo.collection("games").findOne({ _id: mongoDB.ObjectId(param) }, (err, result) => {
                    if (result != null) {
                        return res.json({ result })
                    }
                    return res.status(204).json({ data: "item does not exist in database" })
                })
            }
            else if (!isNaN(param)) {
                res.json({ data: "ID not found or invalid format" })
            }
        })
        return findGame
    } catch (err) {
        console.info("Error when search gameID", err)
    }
})

app.post('/api/v1/games', (req, res) => {
    try {
        const addNewGame = MongoClient.connect(url, (err, db) => {
            const { name, year } = req.body
            const items = { name, year }
            let dbo = db.db("gameAPI")
            if (items.name != null && items.year != null) {
                dbo.collection("games").insertOne(items, (err, result) => {
                    return res.json({ data: "sucess on create item", result })
                })
            }
            else {
                return res.status(400).json({ data: "Null param on body" })
            }
        })
        return addNewGame
    } catch (err) {
        console.info("Error when add game", err)
    }
})

app.delete('/api/v1/games/:_id', (req, res) => {
    try {
        const deleteGame = MongoClient.connect(url, (err, db) => {
            const param = req.params._id
            if (isNaN(param)) {
                let dbo = db.db("gameAPI")
                dbo.collection("games").findOne({ _id: mongoDB.ObjectId(param) }, (err, result) => {
                    if (result != undefined) {
                        dbo.collection("games").deleteOne(result, (err, object) => {
                            return res.json(object)
                        })
                    } else {
                        return res.status(204).json({})
                    }
                })
            }
            else if (!isNaN(param)) {
                res.json({ data: "ID not found or invalid format" })
            }
        })
        return deleteGame
    }
    catch (err) {
        console.info('Erro when delete game', err)
    }
})

app.put('/api/v1/games/:_id', (req, res) => {
    try {
        const putGame = MongoClient.connect(url, (err, db) => {
            const param = req.params._id
            if (isNaN(param)) {
                let dbo = db.db("gameAPI")
                dbo.collection("games").findOne({ _id: mongoDB.ObjectId(param) }, (err, result) => {
                    if (result != undefined) {
                        const newName = req.body.name
                        const newYear = req.body.year
                        const setValueName = { $set: { name: newName } }
                        const setValueYear = { $set: { year: newYear } }
                        const setValue = { $set: { name: newName, year: newYear } }

                        if (newName != undefined && newYear != undefined) {
                            dbo.collection("games").updateOne(result, setValue, (err, ok) => {
                                return ok
                            })
                        }

                        if (newName != undefined) {
                            dbo.collection("games").updateOne(result, setValueName, (err, ok) => {
                                return ok
                            })
                        }
                        if (newYear != undefined) {
                            dbo.collection("games").updateOne(result, setValueYear, (err, ok) => {
                                return ok
                            })
                        }

                        return res.json({ data: "items updated successfully" })
                    }
                })
            }
            if (!isNaN(param)) {
                res.json({ data: "ID not found or invalid format" })
            }

        })
        return putGame
    } catch (err) {
        console.info("Error when update game ", err)
    }
})

app.post('/api/v1/auth/login', (req, res) => {
    try {
        const loggin = MongoClient.connect(url, (err, db) => {
            let { username, password } = req.body
            let item = { username, password }

            if (item.username != "" && item.password != "") {
                let dbo = db.db("gameAPI")
                dbo.collection("users").findOne({username: item.username,  password:item.password }, function (err, result){
                    const findUser = result
                    if(findUser == null){
                        res.status(401).json({statusCode: 401, message: "Invalid JWT"})
                    }
                    else{
                        const time = 3600
                        jwt.sign({id: findUser.id, email: findUser.email}, jwtSecret, {expiresIn: time }, (err, token) => {
                            if(err){
                                res.status(400).json({err: "Internal server error"})
                            }
                            else{
                                res.json({"gameTokenAPI":{
                                    acessToken: token, 
                                    expiresIn: time, 
                                    tokenType: "Bearer" }})
                            }
                        })
                        
                    }
                    
                })                
            }
            else {
                res.status(400).json({ data: "Error on username or password sintax" })
            }
        })

        return loggin

    } catch (err) {
        console.log('Error to try loggin')
    }
})

app.listen(3000, () => {
    console.info("Server is runner in port 3000")
})
import MongoClient, { url } from './database/db.js'
import express from 'express';
import mongoDB from 'mongodb';


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/v1/games', (req, res) => {
    try {
        const mongoReturn = MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("gameAPI");
            dbo.collection("games").find({}).toArray(function (err, result) {
                return res.json(result)
            });
        });
        return mongoReturn
    } catch (err) {
        console.log(err)
    }
})

app.get('/api/v1/games/:_id', (req, res) => {
    try {
        const findGame = MongoClient.connect(url, (err, db) => {
            const param = req.params._id
            const status = req.statusCode
            if (isNaN(param)) {
                let dbo = db.db("gameAPI")
                dbo.collection("games").findOne({ _id: mongoDB.ObjectId(param) }, (err, result) => {
                    if(result != null){
                        return res.json({ result })
                    }
                    return res.json({data: "item does not exist in database"})
                })
            }
            else if (!isNaN(param)) {
                res.json({ data: "ID not found or invalid format" })
            }
        })
        return findGame
    } catch (err) {
        console.log("Error")
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
        console.log(err, "Error to add game")
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
                        return res.status(204)
                    }
                })
            }
            else if (!isNaN(param)) {
                res.json({ data: "ID not found" })
            }
        })
        return deleteGame
    }
    catch (err) {
        console.log('erro')
    }
})

app.put('/api/v1/games/:id', (req, res) => {
    const param = req.params.id
    const status = res.statusCode
    if (!isNaN(param)) {
        const id = parseInt(param)
        const findGame = db.find(game => game.id === id)
        if (findGame != undefined) {
            const { name, year } = req.body
            if (name != undefined) {
                findGame.name = name
            }
            if (year != undefined) {
                findGame.year = year
            }
            return res.json({ data: `updated item id: ${id} to: ${name}` })
        }
        return res.sendStatus(204)
    }
})

app.listen(3000, () => {
    console.info("Server is runner in port 3000")
})
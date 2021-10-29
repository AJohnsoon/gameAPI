import MongoClient, {url} from './database/db.js'
import express from 'express';
import mongoDB from 'mongodb';


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/games', (req, res) => {
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

app.get('/games/:_id', (req, res) => {
    try {
        const findGame = MongoClient.connect(url, (err, db) => {           
            const param = req.params._id
            if (isNaN(param)) {
                let dbo = db.db("gameAPI")
                dbo.collection("games").findOne({_id:mongoDB.ObjectId(param)}, (err, result) => {
                    return res.json(result)
                })
            }
        })
        return findGame
    } catch (err) {
        console.log("Error")
    }
})


app.post('/game', (req, res) => {
    const { id, name, year } = req.body
    const items = { id, name, year }
    if (items.id != null && items.name != null && items.year != null) {
        db.push({ id: items.id, name: items.name, year: items.year })
        return res.status(201).json({ data: "sucess on create item" })
    }
    else {
        return res.status(400).json({ data: "Null param on body" })
    }
})


app.delete('/game/:id', (req, res) => {
    const param = req.params.id
    if (!isNaN(param)) {
        const id = parseInt(param)
        const findGameById = db.findIndex(game => game.id == id)

        if (findGameById < 0) {
            return res.sendStatus(204)
        } else {
            db.splice(findGameById, 1);
            res.status(200).json({ Data: "item deleted successfully" })
        }
    } else {
        return res.sendStatus(404)
    }
})


app.put('/games/:id', (req, res) => {
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
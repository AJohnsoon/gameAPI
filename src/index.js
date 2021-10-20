import express from 'express';
import database from './database/db.js'

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const db = database

app.get('/games', (req, res) => {
    try {
        let status = res.statusCode
        if (status == 200) {
            return res.status(status).json(db)
        }
        return res.status(status).json({ data: "error" })
    } catch (err) {
        console.log(err)
    }
})

app.get('/games/:id', (req, res) => {
    const param = req.params.id
    const status = res.statusCode
    if (!isNaN(param)) {
        const id = parseInt(param)
        const findGame = db.find(game => game.id === id)
        if (findGame != undefined) {
            return res.status(status).json(findGame)
        }
        return res.sendStatus(204)
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
        }else{
            db.splice(findGameById, 1);
            res.status(200).json({ Data: "item deleted successfully" })
        }
    }else{
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
            if(name != undefined) {
                findGame.name = name
            }
            if(year != undefined) {
                findGame.year = year
            }
            return res.json({data: `updated item id: ${id} to: ${name}`})
        }
        return res.sendStatus(204)
    }
})

app.listen(3000, () => {
    console.info("Server is runner in port 3000")
})
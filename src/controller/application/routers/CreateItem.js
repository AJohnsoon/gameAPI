import {application} from "./index.js"
import MongoClient, { url } from '../../../database/db.js'
import auth from'../../../middleware/auth.js';

export const createItem = application
createItem.post('/api/v1/games', auth, (req, res) => {
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
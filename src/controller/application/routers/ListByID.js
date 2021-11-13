import {application} from "./index.js"
import MongoClient, { url } from '../../../database/db.js'
import mongoDB from 'mongodb';

export const listByID = application

listByID.get('/api/v1/games/:_id', (req, res) => {
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


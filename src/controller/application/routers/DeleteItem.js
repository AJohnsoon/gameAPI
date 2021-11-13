import {application} from "./index.js"
import MongoClient, { url } from '../../../database/db.js'
import auth from'../../../middleware/auth.js';
import mongoDB from 'mongodb';

export const deleteItem = application
deleteItem.delete('/api/v1/games/:_id', auth, (req, res) => {
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
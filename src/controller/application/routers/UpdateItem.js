import {application} from "./index.js"
import MongoClient, { url } from '../../../database/db.js'
import auth from'../../../middleware/auth.js';
import mongoDB from 'mongodb';

export const updateItem = application

updateItem.put('/api/v1/games/:_id', auth, (req, res) => {
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

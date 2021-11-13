import {application} from "./index.js"
import MongoClient, { url } from '../../../database/db.js'

export const listAll = application
listAll.get('/api/v1/games', (req, res) => {
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

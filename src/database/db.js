import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;
export let url = "mongodb://localhost:27017/gameAPI";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database runner!");
    db.close();
});



export default MongoClient
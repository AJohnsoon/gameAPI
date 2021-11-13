import { default as mongodb } from 'mongodb';
import {config} from '../config/index.js'

let MongoClient = mongodb.MongoClient;

export let url = `mongodb://${config.database.host}:${config.database.port}/${config.database.name}`;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database runner!");
    db.close();
});



export default MongoClient
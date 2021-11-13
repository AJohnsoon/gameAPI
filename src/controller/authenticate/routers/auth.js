import {authenticate} from './index.js'
import MongoClient, { url } from '../../../database/db.js'
import jwt from 'jsonwebtoken'
import {config} from '../../../config/index.js'
export const auth = authenticate 

auth.post('/api/v1/auth/login', (req, res) => {
    try {
        const loggin = MongoClient.connect(url, (err, db) => {
            let { username, password } = req.body
            let item = { username, password }

            if (item.username != "" && item.password != "") {
                let dbo = db.db("gameAPI")
                dbo.collection("users").findOne({username: item.username,  password:item.password }, function (err, result){
                    const findUser = result
                    if(findUser == null){
                        res.status(401).json({statusCode: 401, message: "Invalid JWT or userName"})
                    }
                    else{
                        const time = '300s'
                        jwt.sign({id: findUser.id, email: findUser.email}, config.token.secret, {expiresIn: time }, (err, token) => {
                            if(err){
                                res.status(400).json({err: "Internal server error"})
                            }
                            else{
                                res.json({"gameTokenAPI":{
                                    acessToken: token, 
                                    expiresIn: time, 
                                    tokenType: "Bearer" }})
                            }
                        })
                        
                    }
                    
                })                
            }
            else {
                res.status(400).json({ data: "Error on username or password sintax" })
            }
        })

        return loggin

    } catch (err) {
        console.log('Error to try loggin')
    }
})

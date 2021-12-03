import jwt from 'jsonwebtoken';
import {config} from '../config/index.js'

const JWToken = config.token.secret

export default function auth(req, res, next){
    const authToken = req.headers['authorization']
    if(!authToken){
        res.status(401).json({satatusCode: 401, Data: 'Invalid Token Format.'})
    }
    else{
        const splitToken = authToken.split(' ')
        const token = splitToken[1]
        jwt.verify(token, JWToken, (err, sucess)=>{
            if(err){
                res.status(401).json({error: 'You must be logged. Invalid JWT'})
            }
            else{
                next()                       
            }
        })        
    } 
}
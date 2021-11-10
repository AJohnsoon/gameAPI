import jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwtSecret.js'


export default function auth(req, res, next){
    const authToken = req.headers['authorization']
    if(!authToken){
        res.status(401).json({satatusCode: 401, Data: 'Invalid JWToken.'})
    }
    else{
        const splitToken = authToken.split(' ')
        const token = splitToken[1]
        jwt.verify(token, jwtSecret, (err, sucess)=>{
            if(err){
                res.status(401).json({error: 'Unexpected token error.'})
            }
            else{
                next()                       
            }
        })        
    } 
}
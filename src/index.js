import express from 'express';
import database from './database/db.js'

const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const db = database 

app.get('/games', (req,res)=>{   
    try{
        let status = res.statusCode
        if(status == 200){
            return res.status(status).json(db)
        }
        return res.status(status).json({data: "error"})
    }catch(err){
        console.log(err)
    }
})

app.get('/games/:id', (req,res)=>{ 
    const param = req.params.id
    const status = res.statusCode
    if( !isNaN(param)){
        const id = parseInt(param)
        const findGame = db.find(game => game.id === id)
        if(findGame != undefined){
           return res.status(status).json(findGame)
        }
      return res.status(status).json({data: 'Not found'})
    }    
})


app.listen(3000,  ()=>{
    console.info("Server is runner in port 3000")
})
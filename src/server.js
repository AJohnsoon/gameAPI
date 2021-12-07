import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { listAllController } from './controller/index.js'
import { listByIdController } from './controller/index.js'
import { createController } from './controller/index.js'
import { deleteController } from './controller/index.js'
import { updateController } from './controller/index.js'
import { authController } from './controller/index.js'

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Game API",
            version: "1.0.0",    
            description: "This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization filters."        
        },  
        schemes:["http", "https"],
    },
    apis: ['src/swagger/index.js']
}

export const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
app.use('/', listAllController)
app.use('/', listByIdController)
app.use('/', createController)
app.use('/', deleteController)
app.use('/', updateController)
app.use('/', authController)

console.log(swaggerDocs.paths)
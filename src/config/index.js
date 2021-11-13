import * as dotenv from 'dotenv';

dotenv.config()

export const config = {
    application: {
        host: process.env.SERVICE_PORT
    },
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME
    },
    token: {
        secret: process.env.JWT_SECRET
    }
        
}
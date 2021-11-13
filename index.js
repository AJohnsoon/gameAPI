import {app} from './src/server.js'

app.listen(process.env.SERVICE_PORT, () => {
    console.info(`Server is runner in port ${process.env.SERVICE_PORT}`)
})
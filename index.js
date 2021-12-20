const express = require('express')
const bcrypt = require ('bcrypt')
const bodyparser = require('body-parser')
const cors = require('cors')
const DBconnection = require("./config/")
require('dotenv').config()
const {uri} = process.env
const router = require("./router")

async function main() {
    try {
        await DBconnection(uri)
        const app = express()
        const port = process.env.port || 5000
        app.use(bodyparser.json())
        app.use(bodyparser.urlencoded({extended: false}))
        app.use(cors())
        app.use(router)
        app.listen(port, ()=>{
            console.log(`listening on http://localhost:${port}`)
        })
    } catch (error) {
        console.log("main:", error)
    }
}

main()
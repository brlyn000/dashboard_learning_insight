import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Router from "./routes/route.js"
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(Router)

app.listen(process.env.PORT, () => {
    console.log(`Server sedang berjalan guys di port ${process.env.PORT}`)
})


        
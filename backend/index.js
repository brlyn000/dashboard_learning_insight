import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import Router from "./routes/route.js"
import authRoutes from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()

app.use(cors({
    credentials: true,
    origin: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(Router)
app.use("/api/auth", authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server sedang berjalan guys di port ${process.env.PORT}`)
})


        
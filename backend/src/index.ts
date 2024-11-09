import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import analyzeRoute from "./routes/AnalyzeRoute"

dotenv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.use("/job-details", analyzeRoute)
app.get('/', () => {
    console.log(`Hello World`);
    
})
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

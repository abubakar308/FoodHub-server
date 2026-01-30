import express from "express";
import cors  from "cors"

const app = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000" || "http://localhost:4000"
}))

app.use(express.json());

app.get("/",(req, res) =>{
    res.send("Create a new post")
})

export default app;
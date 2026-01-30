import express from "express";
import cors  from "cors"
import userRouter from "./modules/users/users.route";

const app = express();

app.use(cors({
    origin:"*"
}))

app.use(express.json());
app.use(userRouter);


app.get("/",(req, res) =>{
    res.send("foodhub server running")
})

export default app;
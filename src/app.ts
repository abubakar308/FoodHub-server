import express from "express";
import cors  from "cors"
import { userRouter } from "./modules/users/users.route";
import { providerRouter } from "./modules/providers/provider.route";

const app = express();

app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/provider", providerRouter)


app.get("/",(req, res) =>{
    res.send("foodhub server running")
})

export default app;
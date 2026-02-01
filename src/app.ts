import express from "express";
import cors  from "cors"
import { userRouter } from "./modules/users/users.route";
import { providerRouter } from "./modules/providers/provider.route";
import { MealRouter } from "./modules/meals/meal.route";
import { categoryRoutes } from "./modules/category/category.router";

const app = express();

app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/", providerRouter);
app.use("/", MealRouter)
app.use("/", categoryRoutes)


app.get("/",(req, res) =>{
    res.send("foodhub server running")
})

export default app;
import express from "express";
import cors  from "cors"
import { userRouter } from "./modules/users/users.route";
import { providerRouter } from "./modules/providers/provider.route";
import { MealRouter } from "./modules/meals/meal.route";
import { categoryRoutes } from "./modules/category/category.router";
import { orderRoutes } from "./modules/orders/order.router";

const app = express();

app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api", providerRouter);
app.use("/api", MealRouter)
app.use("/api", categoryRoutes)
app.use("/api", orderRoutes)


app.get("/",(req, res) =>{
    res.send("foodhub server running")
})

export default app;
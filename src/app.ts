import express from "express";
import cors  from "cors"
import { providerRouter } from "./modules/providers/provider.route";
import { MealRouter } from "./modules/meals/meal.route";
import { categoryRoutes } from "./modules/category/category.router";
import { orderRoutes } from "./modules/orders/order.router";
import { adminRouter } from "./modules/admin/admin.router";
import { reviewRoutes } from "./modules/review/review.route";
import { errorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import { authRouter } from "./modules/auth/auth.route";
import { userRouter } from "./modules/users/users.route";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://foodhub-client-six.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/providers", providerRouter);
app.use("/api/v1/meals", MealRouter);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/reviews", reviewRoutes)
app.use("/api/v1/admin", adminRouter);


app.get("/",(req, res) =>{
    res.send("foodhub server running")
})

app.use(errorHandler);
app.use(notFound);


export default app;
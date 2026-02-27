import express from "express";
import cors from "cors";
import { userRouter } from "./modules/users/users.route";
import { providerRouter } from "./modules/providers/provider.route";
import { MealRouter } from "./modules/meals/meal.route";
import { categoryRoutes } from "./modules/category/category.router";
import { orderRoutes } from "./modules/orders/order.router";
import { adminRouter } from "./modules/admin/admin.router";
import { reviewRoutes } from "./modules/review/review.route";
import { errorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
const app = express();
app.use(cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
}));
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api", providerRouter);
app.use("/api", MealRouter);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", reviewRoutes);
app.use("/api/admin", adminRouter);
app.use(errorHandler);
app.use(notFound);
app.get("/", (req, res) => {
    res.send("foodhub server running");
});
export default app;
//# sourceMappingURL=app.js.map
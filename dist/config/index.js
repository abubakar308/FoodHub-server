import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "devsecret",
};
export default config;
//# sourceMappingURL=index.js.map
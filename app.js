import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import testRoute from "./routes/test.route.js";
import profileRoutes from "./routes/profile.routes.js"
import adminRoutes from "./routes/admin.routes.js"
import cors from "cors";
import categoryRoutes from "./routes/category.routes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("api is working!");
})
app.use('/api/auth', authRoutes );
app.use('/api/test', testRoute );
app.use('/api', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);


export default app;
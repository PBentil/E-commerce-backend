import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import testRoute from "./routes/test.route.js";
import profileRoutes from "./routes/profile.routes.js"
import adminRoutes from "./routes/admin.routes.js"


const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("api is working!");
})
app.use('/api/auth', authRoutes );
app.use('/api/test', testRoute );
app.use('/api', profileRoutes)
app.use('/api/admin', adminRoutes)


export default app;
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/admin/auth.routes.js";
import testRoute from "./routes/test.route.js";
import profileRoutes from "./routes/admin/profile.routes.js"
import adminRoutes from "./routes/admin/admin.routes.js"
import cors from "cors";
import categoryRoutes from "./routes/admin/category.routes.js";
import cartRoutes from "./routes/customer/cart.routes.js";
import checkoutRoutes from "./routes/customer/checkout.routes.js";
import allProductsRoutes from "./routes/allProducts.routes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api', allProductsRoutes)
app.use('/api/auth', authRoutes );
app.use('/api/test', testRoute );
app.use('/api', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', checkoutRoutes);


export default app;
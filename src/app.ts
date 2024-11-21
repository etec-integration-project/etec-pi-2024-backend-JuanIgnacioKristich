import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import ProductsRoutes from "./routes/Products.routes";
import registerCart from "./routes/Cart.routes";
import login from "./routes/login.routes";

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());



app.use("/api", userRoutes);
app.use("/api", ProductsRoutes);
app.use("/api", registerCart);
app.use("/api", login);

export default app;

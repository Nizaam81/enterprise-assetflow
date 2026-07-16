import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employRoutes from "./routes/Employ-Routes/employ-Routes.js";

import passport from "./config/passport.js";
import employRoutes from "./routes/Employ-Routes/employ-Routes.js";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.use("/", employRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

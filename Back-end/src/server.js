import express from "express";
import dotenv from "dotenv";
import passport from "./config/passport.js"
import employRoutes from "./routes/Employ-Routes/employ-Routes.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.use("/",employRoutes);


const PORT = process.env.PORT || 3000;

console.log("PORT =", process.env.PORT);

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});

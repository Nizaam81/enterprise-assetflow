import express from "express";
const router = express.Router();
import { signup } from "../../controller/Employ-controller/employ-Auth.js";

router.get("/employ-signup", signup);


export default router
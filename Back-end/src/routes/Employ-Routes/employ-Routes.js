import express from "express";
const router = express.Router();
import passport from "../../config/passport.js";
import { signup } from "../../controller/Employ-controller/employ-Auth.js";
import { googleCallback } from "../../controller/Employ-controller/authController.js";

router.post("/employ-signup", signup);
router.post("/employ-signup", signup);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleCallback,
);

export default router;

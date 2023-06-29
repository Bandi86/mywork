import express from "express";
import loginUser from "../controller/login.js";
import registerUser from "../controller/register.js";
import logoutUser from "../controller/logout.js";
import verifySession from "../controller/verify_session.js";
import { userImageUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", userImageUpload.single("file"), registerUser);
router.get("/logout/:sessionID", logoutUser);
router.post("/verify-session", verifySession);

export default router;

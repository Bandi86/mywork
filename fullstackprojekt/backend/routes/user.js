import express from "express";
import getUserProfile from "../controller/user/get_user_profile.js";


const router = express.Router();

router.get("/profile/:localId", getUserProfile);



export default router;
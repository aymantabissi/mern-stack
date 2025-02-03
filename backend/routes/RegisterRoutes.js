import express from "express";

import { registerUser ,getUsers,login } from "../Controller/RegisterController.js";

const router=express.Router()


router.post("/register", registerUser);
router.post("/Login", login); // Route pour s'inscrire
router.get("/users", getUsers); 




export default router 
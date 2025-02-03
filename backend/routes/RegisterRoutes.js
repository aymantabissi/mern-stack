import express from "express";

import { registerUser ,getUsers } from "../Controller/RegisterController.js";

const router=express.Router()


router.post("/register", registerUser); // Route pour s'inscrire
router.get("/users", getUsers); 




export default router 
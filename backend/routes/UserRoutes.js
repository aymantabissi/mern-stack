import  express from 'express'
import { verifyToken } from '../middlwares/AuthMiddlwares.js'
import { authorizeRole } from '../middlwares/roleMiddlware.js'

const router=express.Router()

// onlu admin can acces this router
router.get("/admin",verifyToken,authorizeRole("admin"),(req,res)=>{
    res.json({message:"welcom admin"})
})

//only admin manager can acces  this router

router.get("/manager",verifyToken,authorizeRole("manager","admin"),(req,res)=>{
    res.json({message:"welcom manager"})
})


//only users can accses this router 
router.get("/user",verifyToken,authorizeRole("admin","manager","user"),(req,res)=>{
    res.json({message:"welcom user"})
})


export default router 

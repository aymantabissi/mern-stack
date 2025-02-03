import express from  'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { ConnectDB } from './config/db.js';
import ProductRoutes from './routes/ProductRoutes.js'
import RegisterRoutes from './routes/RegisterRoutes.js'
import Register from './models/Register.js';

dotenv.config()

const app=express()
app.use(express.json())
app.use(cors());
app.use('/api' ,RegisterRoutes)
app.use('/api/products' ,ProductRoutes)
app.use("/api", RegisterRoutes);


app.listen(5000,()=>{
    ConnectDB();
    console.log('Server started at : http://localhost:5000 ')

})


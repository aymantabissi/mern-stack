import express from  'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { ConnectDB } from './config/db.js';
import ProductRoutes from './routes/ProductRoutes.js'
import AuthRoutes from './routes/AuthRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

const app=express()
app.use(express.json())
app.use(cors());

app.use('/api/products' ,ProductRoutes)
app.use("/api/orders", orderRoutes);
app.use('/api/users' ,UserRoutes )
app.use("/api", AuthRoutes);



app.listen(5000,()=>{
    ConnectDB();
    console.log('Server started at : http://localhost:5000 ')

    
})


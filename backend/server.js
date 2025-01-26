import express from  'express';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js';
import ProductRoutes from './routes/ProductRoutes.js'

dotenv.config()

const app=express()
app.use(express.json())

app.use('/api/products' ,ProductRoutes)



app.listen(5000,()=>{
    ConnectDB();
    console.log('Server started at : http://localhost:5000 ')

})


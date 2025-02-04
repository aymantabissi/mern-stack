import express from "express";

import { createProduct , getProducts , updateProduct , deleteProduct ,deleteAllProducts,searchProducts} from "../Controller/ProductController.js";

const router=express.Router()



router.get('/' , getProducts)
router.delete('/' , deleteAllProducts)
router.get('/search', searchProducts);

router.post('/', createProduct)
router.put('/:id' , updateProduct)
router.delete('/:id' , deleteProduct)



export default router 
import { Router } from "express"
import ProductController from "../controllers/prodController"


const prod = Router()
prod.post('/add', ProductController.saveProduct);
prod.get('/all', ProductController.getAllproducts)
prod.get('/:id', ProductController.getsingleproducts)


export default prod
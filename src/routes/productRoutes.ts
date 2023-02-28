import { Router } from "express"
import ProductController from "../controllers/prodController"


const prod = Router()
prod.post('/add', ProductController.saveProduct);


export default prod
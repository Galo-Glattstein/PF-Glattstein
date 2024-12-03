import express from "express"
import routerProducts from "./routes/products.router.js"
import routerCarts  from "./routes/carts.router.js"

const PORT = 8080
const app = express()

app.use(express.urlencoded({ extended:true}))
app.use(express.json())
app.use("/api/products", routerProducts)


app.listen (PORT, () => {
    console.log("Running on http://localhost:8080");
    
    
})  
import {Router} from "express"

const router = Router()
const products = []

router.get("/", (req, res) => {
    res.status(200).json({status: "success", payload: products})
})
export default router 
import {Router} from "express"

const router = Router()
const carts  = []

router.get("/", (req, res) => {
    res.status(200).json({status: "success", payload: carts})
})
export default router 
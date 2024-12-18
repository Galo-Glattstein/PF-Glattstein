import { Router } from "express";
import BearManager from "../managers/BearManager.js";

const router = Router();
const bearManager = new BearManager();


router.get("/", async (req, res) => {
    try {
        const bears = await bearManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: bears });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const bear = await bearManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: bear });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const bear = await bearManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: bear });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const bear = await bearManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: "success", payload: bear });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        await bearManager.deleteOneById(req.params.id);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

export default router;
import { Router } from "express";
import Shipment from "../models/shipment.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = Router();
router.use(auth);

router.get("/my", async (req, res) => {
    try {
        
        const shipments = await Shipment.find({ "createdBy._id": req.user.id })
            .sort({ createdAt: -1 }); // newest first

        res.json({
            data: shipments,
            total: shipments.length
        });
    } catch (err) {
        console.error("Error fetching user's shipments:", err);
        res.status(500).json({ message: err.message });
    }
});


/**
 * GET /shipments/:id
 */
router.get("/:id", async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ message: "Shipment not found" });
        res.json(shipment);
    } catch (err) {
        console.error("Error fetching shipment:", err);
        res.status(500).json({ message: err.message });
    }
});

/**
 * POST /shipments
 */
router.post("/", async (req, res) => {
    try {
        // Fetch logged-in user details for embedding
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const shipment = new Shipment({
            ...req.body,
            createdBy: {
                _id: user._id,
                username: user.username
            }
        });
        await shipment.save();
        res.status(201).json(shipment);
    } catch (err) {
        console.error("Error creating shipment:", err);
        res.status(400).json({ message: err.message });
    }
});

/**
 * PATCH /shipments/:id
 */
router.patch("/:id", async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ message: "Shipment not found" });

        // Prevent overriding createdBy
        const { createdBy, ...updateData } = req.body;
        Object.assign(shipment, updateData);

        shipment.cost = shipment.weightKg * shipment.baseRate + shipment.distanceKm * 0.5;

        await shipment.save();
        res.json(shipment);
    } catch (err) {
        console.error("Error updating shipment:", err);
        res.status(400).json({ message: err.message });
    }
});

/**
 * DELETE /shipments/:id
 */
router.delete("/:id", async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndDelete(req.params.id);
        if (!shipment) return res.status(404).json({ message: "Shipment not found" });
        res.json({ message: "Shipment deleted" });
    } catch (err) {
        console.error("Error deleting shipment:", err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
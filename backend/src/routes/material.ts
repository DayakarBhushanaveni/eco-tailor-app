import { Router } from "express";
import Material from "../models/Material";

const router = Router();

router.get("/", async (req, res) => {
  const materials = await Material.find();
  res.json(materials);
});

router.post("/", async (req, res) => {
  const material = new Material(req.body);
  await material.save();
  res.json(material);
});

export default router;
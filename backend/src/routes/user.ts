import { Router } from "express";
import User from "../models/User";

const router = Router();

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

export default router;
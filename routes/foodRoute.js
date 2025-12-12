import express from "express";
import multer from "multer";
import { addFood, listFood, updateFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Image upload
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.patch("/update", updateFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;

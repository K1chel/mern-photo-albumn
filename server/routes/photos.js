import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getAllPhotos,
  getPhotoById,
  createPhoto,
  deletePhoto,
  likePhoto,
} from "../controllers/photos.js";

const router = express.Router();

router.get("/photos", getAllPhotos);
router.get("/photo/:id", getPhotoById);
router.post("/create", protectRoute, createPhoto);
router.delete("/delete/:id", protectRoute, deletePhoto);
router.put("/like/:id", protectRoute, likePhoto);

export default router;

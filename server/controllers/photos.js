import Photo from "../models/photos.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();

    if (!photos) return res.status(404).json({ error: "No photos" });

    res.status(200).json(photos);
  } catch (error) {
    console.log(`ERROR in getAllPhotos: ${error.message}`.red.underline.bold);
    res.status(500).json({ error: error.message });
  }
};

const getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;

    const photo = await Photo.findById(id);

    if (!photo) return res.status(404).json({ error: "Photo not found" });

    res.status(200).json(photo);
  } catch (error) {
    console.log(`ERROR in getPhotoById: ${error.message}`.red.underline.bold);
    res.status(500).json({ error: error.message });
  }
};

const createPhoto = async (req, res) => {
  try {
    const { postedBy } = req.body;
    let { image } = req.body;

    if (!postedBy || !image)
      return res.status(400).json({ error: "Missing required fields" });

    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Unauthorized" });

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      image = uploadedImage.secure_url;
    }

    const newPhoto = await Photo.create({ postedBy, image });
    await newPhoto.save();

    res.status(201).json(newPhoto);
  } catch (error) {
    console.log(`ERROR in createPhoto: ${error.message}`.red.underline.bold);
    res.status(500).json({ error: error.message });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ error: "Photo not found" });

    if (photo.postedBy.toString() !== req.user._id.toString())
      return res
        .status(401)
        .json({ error: "Unauthorized to delete this photo" });

    if (photo.image) {
      const imgId = photo.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Photo.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.log(`ERROR in deletePhoto: ${error.message}`.red.underline.bold);
    res.status(500).json({ error: error.message });
  }
};

const likePhoto = async (req, res) => {
  try {
    const { id: photoId } = req.params;
    const userId = req.user._id;

    const photo = await Photo.findById(photoId);

    if (!photo) return res.status(404).json({ error: "Photo not found" });

    const userLikedPhoto = photo.likes.includes(userId);

    if (userLikedPhoto) {
      // Unlike
      await Photo.updateOne({ _id: photoId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Photo unliked successfully" });
    } else {
      photo.likes.push(userId);
      await photo.save();
      res.status(201).json({ message: "Photo liked successfully" });
    }
  } catch (error) {
    console.log(`ERROR in likePhoto: ${error.message}`.red.underline.bold);
    res.status(500).json({ error: error.message });
  }
};

export { getAllPhotos, getPhotoById, createPhoto, deletePhoto, likePhoto };

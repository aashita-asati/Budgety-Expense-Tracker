const express=require("express");
const {protect}=require('../middleWare/authMiddleware')
const upload=require("../middleWare/uploadMIddleware")
const{
    registerUser,
    loginUser,
    getUserInfo,
}=require("../controllers/authControllers");

const router=express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/getUser",protect , getUserInfo);

const User = require("../models/User");

router.post("/upload-image", protect,upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file selected" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    //updating logged-in user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profileImageUrl: imageUrl },
      { new: true }
    );
    res.status(200).json({
      message: "Image uploaded and saved",
      imageUrl,
    });

  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});


module.exports=router;
const multer =require("multer")


const fs = require("fs");
const path = require("path");

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});
const fileFilter=(req,file,cb)=>{
     if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ){
        cb(null, true);
    }else{
        cb(new Error('only .jpeg, .jpgand .png format are  allowed'),false)
    }
};
const upload=multer({storage,fileFilter});
module.exports=upload;
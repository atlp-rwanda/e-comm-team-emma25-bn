import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets/productImages")
    },
    filename: function (req, file, cb) {
        const fna = file.originalname.split('.')[0].replace(' ', '-')
        cb(null, fna + '-' + Date.now() + path.extname(file.originalname))
    }
})
const allowedFileTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!allowedFileTypes.includes(file.mimetype)) {
            return cb(new Error("Please choose only jpg/png/jpeg/webp files."));
        }
        cb(null, true);
    },
});

const multipleUploader = upload.fields([{ name: "imgs", maxCount: 8 }])

export default multipleUploader
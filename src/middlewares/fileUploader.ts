import multer from "multer"

const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    } else {
        cb('invalid image!', false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const multipleUploader = upload.fields([{ name: "imgs", maxCount: 8 }])

export default multipleUploader
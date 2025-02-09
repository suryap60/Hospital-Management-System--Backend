import multer from "multer";
import path from "path";


// Set up multer diskStorage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Directory where the file will be stored
    },
    filename: (req, file, cb) => {
        // Rename file to include a timestamp to avoid collisions
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

// Initialize multer upload with size limit and file validation
const upload = multer({
    storage: storage,
}).single('profilePicture');  // Ensure it’s a single file upload

export { upload };

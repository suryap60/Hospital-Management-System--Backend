// import multer from "multer";
// import path from "path";


// // Set up multer diskStorage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/'); // Directory where the file will be stored
//     },
//     filename: (req, file, cb) => {
//         // Rename file to include a timestamp to avoid collisions
//         const fileName = Date.now() + path.extname(file.originalname);
//         cb(null, fileName);
//     }
// });

// // Initialize multer upload
// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
// }).single('profilePicture');


// export { upload };

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
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
        }
    }
}).single('profilePicture');  // Ensure it’s a single file upload

export { upload };

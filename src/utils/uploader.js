import multer from "multer"
import paths from "./paths.js"
import { generateNameForFile } from "./random.js"

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, paths.images)
    },
    filename: (req, file, callback) => {
       const filename = generateNameForFile(file.originalname) 
    }
})

const uploader = multer({ storage })

export default uploader 

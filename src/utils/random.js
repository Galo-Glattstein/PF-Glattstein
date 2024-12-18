import moment from "moment"
import path from "path"

export const generateNumber = (startNumber, endNumber) => {
    if (startNumber > endNumber) {
        throw new Error("Start number can not be greater than end number")
    }
    
    return Math.flor(Math.random() * (endNumber - startNumber +1))
}

export const generateNameForFile = (filename) => {
    if (!filename || filename.indexOf(".") === -1) {
        throw new Error("Invalid file name")
    }

    randomNumber = generateNumber(1000, 9999)
const dateTime = moment().format("DDMMYYYY_HHmmss")
const extension = path.extname(filename)

return "file_${randomNumber}_${dateTime}${extension}"
}

import multer from "multer";
import path from 'node:path'
import fs from 'fs'

export const fileTypes = {
    images:['image/jpeg','image/png','image/jpg','image/gif']
}

// export const uploadFile = ({ fileCheck = [] } = {}) => {
//     const uploadDir = path.join(process.cwd(), 'uploads')

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true })
// }

//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, uploadDir)
//         },
//         filename: (req, file, cb) => {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//             cb(null,uniqueSuffix  + '' + file.originalname)
//         }
//     })

//     function fileFilter(req, file, cb) {
//         if (fileCheck.includes(file.mimetype)) {
//             cb(null, true)
//         } else {
//             cb('in-validFileFormat', true)
//         }
//     }

//     return multer({ fileFilter, storage })
// }


export const uploadFile = ({ fileCheck = [] } = {}) => {
    const uploadDir = path.join(process.cwd(), 'uploads')



    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,'uploads')
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null,uniqueSuffix  + '' + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
        if (fileCheck.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb('in-validFileFormat', true)
        }
    }

    return multer({ fileFilter, storage })
}

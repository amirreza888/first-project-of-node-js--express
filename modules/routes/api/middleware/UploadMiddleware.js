const multer = require('multer');
const mkdirp = require('mkdirp')
//
const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = `./public/uploads/images/${new Date().getDate()}`
        mkdirp.sync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === 'image/jpeg') {
        console.log(file.mimetype)
        cb(null, true);
    } else {
        cb(null, false);
    }
}


const uploadImage = multer({
    storage: ImageStorage,
    fileFilter: imageFilter
})


module.exports = {
    uploadImage
}
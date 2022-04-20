const multer = require('multer');
const {promisify} = require('util')
import fs from 'fs';

const unlinkAsync = promisify(fs.unlink);
const {v4: uuid} = require('uuid');

const maxSize = 100000000
const ROOT_PATH = process.env.PROD_ROOT_PATH;



const audioStorage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        const PATH = ROOT_PATH + 'audios/transcription';
        try {
            if (fs.existsSync(PATH)) {
                cb(null, PATH)
            } else {
                fs.mkdirSync(PATH, {recursive: true});
                cb(null, PATH)
            }
        } catch (e) {
            console.error(e)
        }
    },
    filename: function (req:any, file:any, cb:any) {
        const id = uuid();
        cb(null, 'order-' + id + '.' + file.originalname.split('.').pop());
    }
});




const audioFileFilter = async (req:any, file:any, cb:any) => {
    // reject a file
    const id = req.path.substring(req.path.lastIndexOf('/'));

    const filename = ROOT_PATH + 'audios/transcription/'+ id.substring(1) + '.' + file.originalname.split('.').pop();
    if (fs.existsSync(filename)) {
        await unlinkAsync(filename);
    }
    if (file.mimetype === 'audio/wav') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};




exports.uploadAudio = multer({
    storage: audioStorage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: audioFileFilter
});




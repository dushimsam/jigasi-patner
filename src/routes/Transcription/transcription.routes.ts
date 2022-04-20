const express = require("express")
const { uploadAudio} = require("../../middlewares/multer.middleware");
const {isUserCategory} = require("../../middlewares/authorisation/isUserCategory.middleware");
const {requestHandler} = require("../../utils/common");

const controller = require("../../controllers/transcription/transcription.controller")
const router = express.Router();


/**
 * @swagger
 * /api/v1/transcription/upload-audio:
 *   post:
 *     tags:
 *       - AudioTranscription
 *     description: Create a wav file for audio
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *        - in: formData
 *          name: audio
 *          type: file
 *          description: audio to upload.
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request | Validation Error
 *       500:
 *         description: Internal Server Error
 */
 router.post('/upload-audio', uploadAudio.single('audio'), requestHandler(controller.upload_audio))



 
 module.exports = router
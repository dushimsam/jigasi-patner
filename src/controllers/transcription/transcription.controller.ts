const {
  validObjectId,
  dependencyChecker,
  API_RESPONSE,
} = require("../../utils/common");


const {
  desiredSampleRate,
  processAudioStream,
} = require("../../utils/model-helpers");
const MemoryStream = require("memory-stream");
const Sox = require("sox-stream");



exports.upload_audio = async function (req:any, res:any) {
  if (!req.file)
    return res
      .status(400)
      .send(API_RESPONSE(false, "Audio File not found", null, null));

  let audioStream = processAudioStream(req.file.path);

  audioStream.on("finish", () => {
    let audioBuffer = audioStream.toBuffer();

    const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate);
    console.log("audio length", audioLength);

    let result = model.stt(audioBuffer);

    return res.status(400).send(result);
  });
};

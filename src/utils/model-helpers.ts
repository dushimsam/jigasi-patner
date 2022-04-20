const Fs = require("fs");
const Wav = require("node-wav");
const DeepSpeech = require("deepspeech");
const Duplex = require("stream").Duplex;

let modelPath = "../../models/deepspeech-0.9.3-models.pbmm";
let model= new DeepSpeech.Model(modelPath);;

  


exports.desiredSampleRate = model.sampleRate();

const processFileToBuffer = (fileName: string) => {

  let scorerPath = "../../models/deepspeech-0.9.3-models.scorer";

  model.enableExternalScorer(scorerPath);

  let audioFile = process.argv[2] || `./audio/${fileName}`;

  if (!Fs.existsSync(audioFile)) {
    console.log("file missing:", audioFile);
    process.exit();
  }

  const buffer = Fs.readFileSync(audioFile);
  const result = Wav.decode(buffer);

  if (result.sampleRate < desiredSampleRate) {
    console.error(
      "Warning: original sample rate (" +
        result.sampleRate +
        ") is lower than " +
        desiredSampleRate +
        "Hz. Up-sampling might produce erratic speech recognition."
    );
  }

  return buffer;
};

const bufferToStream = (buffer:any) => {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};


exports.processAudioStream = (path:any) => {
  let buffer = processFileToBuffer(path);

  let audioStream = new MemoryStream();
  let desiredSampleRate = model.sampleRate();
  bufferToStream(buffer)
    .pipe(
      Sox({
        global: {
          "no-dither": true,
        },
        output: {
          bits: 16,
          rate: desiredSampleRate,
          channels: 1,
          encoding: "signed-integer",
          endian: "little",
          compression: 0.0,
          type: "raw",
        },
      })
    )
    .pipe(audioStream);

  return audioStream;
};

exports.processedModel = model;
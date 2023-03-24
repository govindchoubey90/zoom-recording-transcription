const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient({
  keyFilename: 'path/to/your/api/key.json',
});

const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'en-US',
};

const audio = {
  uri: 'gs://your-bucket-name/your-video.mp4',
};

const request = {
  config: config,
  audio: audio,
};

client.recognize(request)
  .then((response) => {
    const transcription = response[0].results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

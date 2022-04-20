Jigasi-Patner
=============

Jitsi Gateway to SIP Patner: This is an external server-side application that performs speech-to-text tasks and expose related APIs to work with Jigasi-server side engine in offering appropriate audio transcription services.

Install and run
==============

1. Checkout latest source:
 
 ```
 git clone https://github.com/dushimsam/jigasi-patner.git
 ```
2. Install packages:

 ```
 npm i
 ```

3. Run the server

 ```
 npm run dev
 ```

5. View In Page

 ```
 open your browser and visit : http://localhost:5000/
 ```

6. Test the Api

 ```
Make a post file upload request of wav audio file on this API :  http://localhost:5000/api/v1/transcription/upload-audio
 ```

6. Find more APIs Documentation

 ```
 open your browser and visit : http://localhost:5008/documentation
 ```


How it works
============

Jigasi server engine initiates a post request to the server in an upload of a wav file. Then
the server is going to load a pre-trained model and then offer a best match prediction correponding to a transcription of the received audio.

Input
==============
A upload request of a wav audio file.

Ouput
==============
A text transcripted from that input audio file.


Current Model Configuration configuration
========================================

We have currently integrated a pre-trained model DeepSpeech from Mozilla in version 1 of this service.
We are going to migrate to more accurate models in the future versions.

Download the pre-trained model (1.8GB):

```
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer
```


Jigasi-Patner
=============

Jitsi Gateway to SIP Patner: this is an external  server-side application that offers external speech-to-text APIs that works  with Jigasi-server side engine to  offer appropriate transcription services.

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
 open : localhost:5008
 ```
6. Read the Apis Documentation

 ```
 localhost:5008/documentation
 ```

How it works
============

Jigasi server engine initiates a post request to the server in an upload of a wav file. Then
the server uses a pre-trained model to offer the corresponding transcription.

Input
==============
A upload request of a wav audio file.

Ouput
==============
A text transcripted from that input audio file.


Current Model Configuration configuration
========================================

We are currently integrated a pre-trained model DeepSpeech from Mozilla.
We are going to migrated to more accurate models in the future versions.

Download the pre-trained model (1.8GB):

```
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer
```


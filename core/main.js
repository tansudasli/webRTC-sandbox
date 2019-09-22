'use strict';

// On this codelab, you will be streaming only video (video: true).
const mediaStreamConstraints = {
  video: true,

};

const hdConstraints = {
    video: {
      width: {min: 1280 },height: {min: 720}
    }
}

const vgaConstraints = {
    video: {
        width: {exact: 640}, height: {exact: 480}
    }
};

// Video element where stream will be placed.
const video = document.querySelector('video');

// Local stream that will be reproduced on the video.
let localStream;


// distribute stream 
let localPeerConnection = new RTCPeerConnection();
// let localPeerConnection = new RTCPeerConnection(servers); //This is where you could specify STUN and TURN servers.
// localPeerConnection.addEventListener('icecandidate', handleConnection);
// localPeerConnection.addEventListener('iceconnectionstatechange', handleConnectionChange);

const startButton = document.getElementById('startButton');
if (startButton) {
    startButton.addEventListener('click', () => {
        console.log('started');

        // get media stream.
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
        .then((stream) => {
            localStream = stream;
            video.srcObject = stream;
        })
        .catch((error) => {
            console.log('navigator.getUserMedia error: ', error);
        });
        
        stopButton.disabled = false;
        startButton.disabled = true;
    })

    localPeerConnection.addStream(localStream);
}

const stopButton = document.getElementById('stopButton');
stopButton.disabled = true;
if (stopButton) {
    stopButton.addEventListener('click', () => {
        console.log('stopped');
        
    })
}
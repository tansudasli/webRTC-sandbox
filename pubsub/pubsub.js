

// credentials - apiKey and apiSecret of application, token for permission, session as kind of room name
var apiKey = '46424572'; //46424572
var apiSecret = ''; //
var sessionId = '1_MX40NjQyNDU3Mn5-MTU2ODkwMTc2NTM1NX5OSVlVNUZYbHlIbmF2ekRuam9IY3NoMlV-fg';
var token = 'T1==cGFydG5lcl9pZD00NjQyNDU3MiZzaWc9NjdkNzA1ZWM3MTc4ODAxM2EyY2Q5ODlkN2IxOTRmMWNmNjJkYWY3YzpzZXNzaW9uX2lkPTFfTVg0ME5qUXlORFUzTW41LU1UVTJPRGt3TVRjMk5UTTFOWDVPU1ZsVk5VWlliSGxJYm1GMmVrUnVhbTlJWTNOb01sVi1mZyZjcmVhdGVfdGltZT0xNTY4OTAxOTMxJm5vbmNlPTAuMDM0OTk0MzQxNjk0MDY2NTY2JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE1NzE0OTM5MjgmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';

// (optional) add server-side code here
// inject opentok w/ npm
// initialize:       opentok = new OpenTok(apiKey, apiSecret);
// create session:   opentok.createSession(function (err, session) {}
// generate token from session for this client: token = opentok.generateToken(sessionId);
// initializeSession();

// connect to session
// import OpenTok from '../opentok';
// var opentok = new OpenTok(apiKey, apiSecret);

/**
 * connectionEventsSuppressed: true
 * 
 */
var props = {};  
var session = OT.initSession(apiKey, sessionId, props);


session.on('sessionDisconnected', (event) => {
	console.log(`session disconnected: ${event}`);
	
});

// create publisher
var publisher = OT.initPublisher('publisher', 
								 {insertMode: 'append', width: '100%', height: '100px'}, 
								 (error) => handleError(error)
);

/**
 * publish to publisher
 * max connection = 3000 per publisher
 * max stream = 3000 per publisher
 */ 

session.connect(token, (error) => {
		if (error) {
			handleError(error);
		}
		else {
			// publish publisher
			console.log('session connected');
		
			session.publish(publisher, 
							(error) => handleError(error))
				   .on('streamCreated', 
					   (event) => { console.log('publisher streaming')});
		}
});

function handleError(error) {

	if (error) {
		console.log(error.message);

		if (error.name === "OT_MEDIA_ERR_NETWORK") { console.log('Network error'); }
		else if (error.name === "OT_MEDIA_ERR_ABORTED") { console.log('Stream fetching is aborted'); }
		else if (error.name === "OT_HARDWARE_UNAVAILABLE") { console.log('Camera or microphone is not acquired. May be using by another application.'); }

		else if (error.name === "OT_NOT_CONNECTED") { console.log('You are not connected to internet'); }
		else if (error.name === "OT_AUTHENTICATION_ERROR") { console.log(''); }
		else if (error.name === "OT_CONNECT_FAILED") { console.log(''); }
		else if (error.name === "OT_CONNECTION_LIMIT_EXCEEDED") { console.log('max connection limit 3000 exceeded.'); } //stream.connect -  Consider broadcasting ?
		else if (error.name === "OT_STREAM_LIMIT_EXCEEDED") { console.log('max stream limit 3000 exceeded.'); } //stream.subscribe -  Consider broadcasting ?
		else if (error.name === "OT_INVALID_SESSION_ID") { console.log(''); }

		else if (error.name === "OT_CHROME_MICROPHONE_ACQUISITION_ERROR") { console.log('Chrome fails to get access to the microphone, due to a Chrome err. Please Restart Chrome browser!'); }
		else if (error.name === "OT_CREATE_PEER_CONNECTION_FAILED") { console.log('Connection error between client and subscriber or media router'); }
		else if (error.name === "OT_HARDWARE_UNAVAILABLE") { console.log('Camera or microphone is not acquired. May be using by another application.'); }
		else if (error.name === "OT_ICE_WORKFLOW_FAILED") { console.log('Something wrong while establishing webRTC connectivity'); }
		else if (error.name === "OT_USER_MEDIA_ACCESS_DENIED") { console.log('You denied permisson for microphone/camera'); }
	}
}
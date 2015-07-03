// Describe the Watson Endpoint
// Specify the information and credentials pertinent to your Watson instance https://api.ng.bluemix.net
var endpoint = {
    // enter watson host name; e.g: 'http://www.myhost.com' https://api.ng.bluemix.net
    host : 'https://api.ng.bluemix.net',//
    
    // enter watson instance name; e.g: '/deepqa/v1/question' /question-and-answer-beta/api/v1/question /Question-and-Answer-vt/api/v1/question /watsonfilmsqa/v1/question
    instance : '/instance/1/deepqa/v1/question',//instance/1/deepqa/v1/question
    
    // enter authentication info; e.g: 'Basic c29tZXVzZXJpZDpzb21lcGFzc3dvcmQ=' Basic dG9taXRhMTBheXUwN0BnbWFpbC5jb206aGFtYTEwMDI=
    auth : 'Basic dG9taXRhMTBheXUwN0BnbWFpbC5jb206aGFtYTEwMDI='//
};


// Handler for /question POST requests
// Submits a question to Watson via the IBM Watson QAAPI
// and returns the QAAPI response.
exports.question = function(req, res) {
	if (!endpoint.host) {
		res.send(404, 'Watson host information not supplied.');
	}
    var uri = endpoint.host + endpoint.instance;
    var request = require("request");
    
    // Form a proper Watson QAAPI request
    var questionEntity = {
        "question" : {
            "evidenceRequest" : { // Ask Watson to return evidence
                "items" : 5 // Ask for 5 answers with evidence
            },
            "questionText" : req.body.question // The question
        }
    };

    console.log('Ask Watson: ' + req.body.question + ' @ ' + uri);

    // Invoke the IBM Watson QAAPI Synchronously 
    // POST the questionEntity and handle the QAAPI response
    request({
        'uri' : uri,
        'method' : "POST",
        'headers' : {
            'Content-Type' : 'application/json;charset=utf-8',
            'X-SyncTimeout' : 30,
            'Authorization' : endpoint.auth
        },
        'json' : questionEntity,

    }, function(error, response, body) {
        // Return the QAAPI response in the entity body
        res.json(body);
    });
}

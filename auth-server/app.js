/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

var request = require("request"); // "Request" library

var client_id = "1baad1a07930418ea6605b19788c1436"; // Your client id
var client_secret = "24f2102e552e49348d13d263c8e4fb27"; // Your secret

// your application requests authorization
var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: "https://api.spotify.com/v1/users/jmperezperez",
      headers: {
        Authorization: "Bearer " + token,
      },
      json: true,
    };
    request.get(options, function (error, response, body) {
      console.log(body);
    });
  }
});
var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var matching = require("./public/Matching.js");

require("dotenv").config();

// Environment variables
const port = process.env.PORT;
const public_url = process.env.PUBLIC_URL;
const app_url = process.env.APP_URL;
const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = `${app_url}/callback`; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

function profileUriToId(uris) {
  if (uris instanceof Array) {
    var ids = [];
    for (const item of uris) {
      ids.push(item.split("spotify:user:")[1]);
    }
    return ids;
  } else {
    return [uris.split("spotify:user:")[1]];
  }
}

var stateKey = "spotify_auth_state";

var app = express();

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser());

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "ugc-image-upload playlist-modify-public playlist-modify-private";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,

        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

// Callback
app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token", // onde pegamos o access token para nosso app
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `${public_url}/home?` +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/match", async function (req, res) {
  try {
    const accessToken = req.query.access_token;
    const minimumOccurences = 2;
    const usersToMatch = profileUriToId(req.query.friend);
    const playlistId = await matching.match(
      accessToken,
      usersToMatch,
      minimumOccurences
    );
    res.redirect(
      `${public_url}/final?` +
        querystring.stringify({
          playlist_id: playlistId,
        })
    );
  } catch (err) {
    console.log("Ocorreu um erro ao dar match!");
  }
});

console.log(`Listening on ${port}`);
app.listen(port);

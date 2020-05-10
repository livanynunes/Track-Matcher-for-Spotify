class Matching {
  async init(accessToken, usersToMatch) {
    this.minimumOccurences = 2;
    this.rp = require("request-promise");
    this.accessToken = accessToken;
    this.myId = await this.getMyId();
    this.usersToMatch = usersToMatch;
    usersToMatch.push(this.myId);
    this.tracks = await this.doTheMatch();
    console.log(this.tracks);
    this.playlistId = "nioksdm";

    this.playlistId = await this.createPlaylist();
  }

  async doTheMatch() {
    var tracks = [];
    for (const user of this.usersToMatch) {
      let ps = await this.fetchPlaylists(user);
      let ts = await this.fetchTracks(ps);
      tracks.push(ts);
    }
    console.log(tracks);
    tracks = await this.filterTracks(tracks);
    return tracks;
  }

  async match(accessToken, usersToMatch) {
    await this.init(accessToken, usersToMatch);
    return this.playlistId;
  }

  async filterTracks(peopleTracks) {
    const tracks = peopleTracks.reduce((a, b) => a.concat(b), []); // flatten every person's tracks
    var occurences = {};
    for (var i = 0; i < tracks.length; i++) {
      if (typeof occurences[tracks[i]] == "undefined") {
        occurences[tracks[i]] = 1;
      } else {
        occurences[tracks[i]]++;
      }
    }

    var filteredTracks = [];
    for (i = 0; i < tracks.length; i++) {
      if (
        occurences[tracks[i]] >= this.minimumOccurences &&
        !filteredTracks.includes(tracks[i])
      ) {
        filteredTracks.push(tracks[i]);
      }
    }
    return filteredTracks;
  }

  async fetchPlaylists(id) {
    var playlists = [];
    var next = `https://api.spotify.com/v1/users/${id}/playlists?limit=50&offset=0`;
    do {
      var query = {
        url: next,
        headers: { Authorization: "Bearer " + this.accessToken },
        json: true,
      };

      // use the access token to access the Spotify Web API
      await this.rp.get(query, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          body.items.forEach((playlist) => {
            playlists.push(playlist.id);
          });
          next = body.next;
        }
      });
    } while (next != null);

    return playlists;
  }

  async fetchTracks(playlists) {
    var tracks = [];
    var next;
    for (const id of playlists) {
      next = `https://api.spotify.com/v1/playlists/${id}/tracks?fields=items(track(uri))%2Cnext&limit=100&offset=0`;
      do {
        var query = {
          url: next,
          headers: { Authorization: "Bearer " + this.accessToken },
          json: true,
        };
        // use the access token to access the Spotify Web API
        await this.rp.get(query, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            body.items.forEach((track) => {
              if (track.track != null && !tracks.includes(track.track.uri)) {
                tracks.push(track.track.uri);
              }
            });
            next = body.next;
          }
        });
      } while (next != null);
    }
    return tracks;
  }

  async getMyId() {
    var query = {
      url: "https://api.spotify.com/v1/me",
      headers: { Authorization: "Bearer " + this.accessToken },
      json: true,
    };
    var id;
    // use the access token to access the Spotify Web API
    await this.rp.get(query, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        id = body.id;
      }
    });
    return id;
  }

  presentArray(array) {
    var string = array[0];
    for (var i = 1; i < array.length; i++) {
      string =
        i == array.length - 1
          ? `${string} and ${array[i]}`
          : `${string}, ${array[i]}`;
    }
    return string;
  }

  async getFriendNames() {
    var friendNames = [];
    for (const friend of this.usersToMatch) {
      var query = {
        url: `https://api.spotify.com/v1/users/${friend}`,
        headers: { Authorization: "Bearer " + this.accessToken },
        json: true,
      };

      // use the access token to access the Spotify Web API
      await this.rp.get(query, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          friendNames.push(body.display_name);
        }
      });
    }
    friendNames.pop();
    return this.presentArray(friendNames);
  }

  async createPlaylist() {
    const people = await this.getFriendNames();
    var query = {
      url: `https://api.spotify.com/v1/users/${this.myId}/playlists`,
      body: {
        name: "Matched",
        description: `These are the tracks I've got in common with ${people}.`,
        public: true,
      },
      headers: { Authorization: "Bearer " + this.accessToken },
      json: true,
    };
    var id;
    // use the access token to access the Spotify Web API
    await this.rp.post(query, function (error, response, body) {
      if (!error && response.statusCode === 201) {
        id = body.id;
      }
    });
    await this.addTracks(id);
    // await this.addIcon(id);
    return id;
  }

  async addTracks(playlistId) {
    var query = {
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      body: {
        uris: this.tracks,
      },
      headers: { Authorization: "Bearer " + this.accessToken },
      json: true,
    };
    // use the access token to access the Spotify Web API
    await this.rp.post(query, function (error, response, body) {
      if (!error && response.statusCode === 201) {
        console.log("done");
      }
    });
  }

  // async addIcon(playlistId) {
  //   const img_url = "./public/playlist-icon.jpeg";
  //   var fs = require("fs");

  //   var img;
  //   fs.readFile(img_url, function (err, data) {
  //     img = Buffer.from(data).toString("base64");
  //   });

  //   console.log(img);
  //   var query = {
  //     url: `https://api.spotify.com/v1/playlists/${playlistId}/images`,
  //     body: img,
  //     headers: {
  //       Authorization: "Bearer " + this.accessToken,
  //       "Content-Type": "image/jpeg",
  //     },
  //     json: true,
  //   };
  //   // use the access token to access the Spotify Web API
  //   await this.rp.put(query, function (error, response, body) {
  //     if (!error && response.statusCode === 202) {
  //       console.log("done");
  //     }
  //   });
  // }
}

module.exports = new Matching();

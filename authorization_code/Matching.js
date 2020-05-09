class Matching {
  async init(accessToken, usersToMatch) {
    this.minimumOccurences = 2;
    this.rp = require("request-promise");
    this.accessToken = accessToken;
    this.myId = await this.getId();
    usersToMatch.push(this.myId);

    this.tracks = [];
    for (const user of usersToMatch) {
      let ps = await this.fetchPlaylists(user);
      let ts = await this.fetchTracks(ps);
      this.tracks.push(ts);
    }

    this.tracks = await this.filterTracks(await this.tracks);
    this.playlistUrl = this.createPlaylist();
  }

  async url(accessToken, usersToMatch) {
    await this.init(accessToken, usersToMatch);
    return this.playlistUrl;
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
      next = `https://api.spotify.com/v1/playlists/${id}/tracks?fields=items(track(name))%2Cnext&limit=100&offset=0`;
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
              if (track.track != null && !tracks.includes(track.track.name)) {
                tracks.push(track.track.name);
              }
            });
            next = body.next;
          }
        });
      } while (next != null);
    }
    return tracks;
  }

  async getId() {
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

  async createPlaylist() {
    return "495vSyUEIZSeOoeeUUDmCR";
  }
}

module.exports = new Matching();

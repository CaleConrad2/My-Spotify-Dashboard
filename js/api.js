import { fetchWithAuth } from './auth.js';

export async function getTopArtists() { //displays top 20 artists
    const token = localStorage.getItem("access_token");
    const resultsDiv = document.getElementById('artist-list'); //resultsDiv is the whole element now, not just the content
    try {
        const res = await fetchWithAuth("https://api.spotify.com/v1/me/top/artists");
        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            if (data.error.status === 401) {
                const userCard = document.getElementById('user-card');
                userCard.innerHTML = `
                    <div style="text-align: center; padding: 32px;">
                        <button onclick="startLogin()" style="padding: 16px 32px; font-size: 18px; font-weight: bold; background-color: #1DB954; color: white; border: none; border-radius: 8px; cursor: pointer;">
                            Log in with Spotify
                        </button>
                        <p style="margin-top: 16px; color: #666;">Please log in to view your Spotify dashboard</p>
                    </div>
                `;
            } else {
                resultsDiv.innerText = "Failed to load top artists: " + data.error.message;
            }
            return;
        }

        resultsDiv.innerHTML = `
        <tr>
          <th style="text-align: left;">Ranking</th>
          <th style="text-align: left;">Artist</th>
          <th style="text-align: left;">Image</th>
        </tr>
      `;
      
      data.items.forEach((artist, index) => {
        const row = document.createElement('tr');
      
        const imgUrl = artist.images[0]?.url || '';
        const profileUrl = artist.external_urls?.spotify || '#';
      
        row.innerHTML = `
          <td style="padding: 8px;">${index + 1}</td>
          <td style="padding: 8px;"><a href="${profileUrl}" target="_blank" style="text-decoration: none; color: #1DB954;">${artist.name}</a></td>
          <td style="padding: 8px;"><img src="${imgUrl}" width="100" height="100" style="border-radius: 8px;"></td>
        `;
      
        resultsDiv.appendChild(row);
        });
    } catch (err) {
        resultsDiv.innerText = "Error: " + err.message;
    }
}

export async function getTopTracks() { //displays top 20 tracks
    
    const token = localStorage.getItem("access_token");
    const resultsDiv = document.getElementById('track-list'); //resultsDiv is the whole element now, not just the content
    try {
        const res = await fetchWithAuth("https://api.spotify.com/v1/me/top/tracks");
        const data = await res.json(); //await here because reading and parsing data as .json takes time
        console.log(data);
        if (!res.ok) {
            if (data.error.status === 401) {
                const userCard = document.getElementById('user-card');
                userCard.innerHTML = `
                    <div style="text-align: center; padding: 32px;">
                        <button onclick="startLogin()" style="padding: 16px 32px; font-size: 18px; font-weight: bold; background-color: #1DB954; color: white; border: none; border-radius: 8px; cursor: pointer;">
                            Log in with Spotify
                        </button>
                        <p style="margin-top: 16px; color: #666;">Please log in to view your Spotify dashboard</p>
                    </div>
                `;
            } else {
                resultsDiv.innerText = "Failed to load top tracks: " + data.error.message;
            }
            return;
        }

        resultsDiv.innerHTML = `
  <tr>
    <th style="text-align: center;">Ranking</th>
    <th style="text-align: center;">Track</th>
    <th style="text-align: center;">Artist</th>
    <th style="text-align: center;">Image</th>
  </tr>
`;

data.items.forEach((track, index) => {
  const row = document.createElement('tr');

  const trackUrl = track.external_urls?.spotify || '#';
  const artistName = track.artists.map(a => a.name).join(', ');
  const imgUrl = track.album.images[0]?.url || '';

  row.innerHTML = `
    <td style="padding: 8px;">${index + 1}</td>
    <td style="padding: 8px;"><a href="${trackUrl}" target="_blank" style="text-decoration: none; color: #1DB954;">${track.name}</a></td>
    <td style="padding: 8px;">${artistName}</td>
    <td style="padding: 8px;"><img src="${imgUrl}" width="100" height="100" style="border-radius: 8px;"></td>
  `;

  resultsDiv.appendChild(row);
        }) 



   } catch (err) {
        resultsDiv.innerText = "Error: " + err.message;
   }
}

export async function getRecentlyPlayed() {
    const token = localStorage.getItem("access_token");
    const resultsDiv = document.getElementById("recently-played");

    try {
        const res = await fetchWithAuth("https://api.spotify.com/v1/me/player/recently-played");
        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            if (data.error.status === 401) {
                const userCard = document.getElementById('user-card');
                userCard.innerHTML = `
                    <div style="text-align: center; padding: 32px;">
                        <button onclick="startLogin()" style="padding: 16px 32px; font-size: 18px; font-weight: bold; background-color: #1DB954; color: white; border: none; border-radius: 8px; cursor: pointer;">
                            Log in with Spotify
                        </button>
                        <p style="margin-top: 16px; color: #666;">Please log in to view your Spotify dashboard</p>
                    </div>
                `;
            } else {
                resultsDiv.innerText = "Failed to load recently played tracks: " + data.error.message;
            }
            return;
        }

        resultsDiv.innerHTML = `
  <tr>
    <th>Ranking</th>
    <th>Track</th>
    <th>Artist</th>
    <th>Image</th>
  </tr>
`;

data.items.forEach((recent, index) => {
  const track = recent.track;
  const artistNames = track.artists.map(a => a.name).join(', ');
  const imgUrl = track.album.images[0]?.url || '';
  const trackUrl = track.external_urls?.spotify || '#';

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${index + 1}</td>
    <td><a href="${trackUrl}" target="_blank" style="text-decoration: none; color: #1DB954;">${track.name}</a></td>
    <td>${artistNames}</td>
    <td><img src="${imgUrl}" width="60" height="60" style="border-radius: 8px;"></td>
  `;
  resultsDiv.appendChild(row);
        });
    }
    catch (err) {
        resultsDiv.innerText = "Error: " + err.message;
    }
}

export async function getUserProfile() {
    const res = await fetchWithAuth("https://api.spotify.com/v1/me");
    const data = await res.json();
  
    const userCard = document.getElementById("user-card");
  
    if (!res.ok) {
      userCard.innerText = "Failed to load user profile.";
      return;
    }
  
    const imgUrl = data.images?.[0]?.url || '';
    const profileUrl = data.external_urls?.spotify || '#';
  
    userCard.innerHTML = `
    <div class="user-card">
      ${imgUrl ? `<img src="${imgUrl}" alt="Profile Image" class="user-image">` : ''}
      <h2 class="user-name">${data.display_name}</h2>
      <a href="${profileUrl}" target="_blank" class="spotify-link">View on Spotify</a>
    </div>
  `;

    const buttonsDiv = document.getElementById('home-buttons');

    buttonsDiv.innerHTML = `
      <button onclick="location.href='top-tracks.html'" style="padding: 10px 16px; border: none; border-radius: 8px; background-color: #1DB954; color: white; font-weight: bold; cursor: pointer;">Top Tracks</button>
      <button onclick="location.href='top-artists.html'" style="padding: 10px 16px; border: none; border-radius: 8px; background-color: #1DB954; color: white; font-weight: bold; cursor: pointer">Top Artists</button>
      <button onclick="location.href='recently-played.html'" style="padding: 10px 16px; border: none; border-radius: 8px; background-color: #1DB954; color: white; font-weight: bold; cursor: pointer">Recently Played</button>
      <button onclick="location.href='charts.html'" style="padding: 10px 16px; border: none; border-radius: 8px; background-color: #1DB954; color: white; font-weight: bold; cursor: pointer">Charts</button>
    `;
  }
  
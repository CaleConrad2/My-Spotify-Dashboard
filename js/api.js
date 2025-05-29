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
                resultsDiv.innerText = "Please log in to view your Spotify dashboard";
            } else {
                resultsDiv.innerText = "Failed to load top artists: " + data.error.message;
            }
            return;
        }

        resultsDiv.innerHTML = ''; //clears old results

        data.items.forEach(artist => {
            const div = document.createElement('div');
            const genreText = artist.genres && artist.genres.length > 0
            ? artist.genres.join(', ')
            : 'No genres available';

            div.innerHTML = `
            <b>${artist.name}</b><br>
            <img src="${artist.images[0]?.url}" width="100"><br>
            <em>Genres:</em> ${genreText}<br><br>
            `;
            resultsDiv.appendChild(div);
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
                resultsDiv.innerText = "Please log in to view your Spotify dashboard";
            } else {
                resultsDiv.innerText = "Failed to load top tracks: " + data.error.message;
            }
            return;
        }

        resultsDiv.innerHTML = ''; //reset the data so that old data is deleted

        data.items.forEach ((track, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
            <b>Track Number ${index + 1}:</b><br>
            ${track.name}<br><br>
        `
        resultsDiv.appendChild(div);
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
                resultsDiv.innerText = "Please log in to view your Spotify dashboard";
            } else {
                resultsDiv.innerText = "Failed to load recently played tracks: " + data.error.message;
            }
            return;
        }

        resultsDiv.innerHTML = ''; //clears old results

        data.items.forEach((recent, index) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <b>Track ${index + 1}:</b> ${recent.track.name}<br>
                <em>Artist:</em> ${recent.track.artists.map(a => a.name).join(', ')}<br>
                <img src="${recent.track.album.images[0]?.url}" width="100"><br><br>
            `;
            console.log(div);
            resultsDiv.appendChild(div);
        });
    }
    catch (err) {
        resultsDiv.innerText = "Error: " + err.message;
    }
}
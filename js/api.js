export async function getTopArtists() { //displays top 20 artists
    const token = localStorage.getItem("access_token");
    const resultsDiv = document.getElementById('results'); //resultsDiv is the whole element now, not just the content
    try {
        const res = await fetch("https://api.spotify.com/v1/me/top/artists", {
            headers : {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            resultsDiv.innerText = "Failed to load top artists: " + data.error.message;
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
    const resultsDiv = document.getElementById('results'); //resultsDiv is the whole element now, not just the content
    try {
        const res = await fetch("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json(); //await here because reading and parsing data as .json takes time
        console.log(data);
        if (!res.ok) {
            resultsDiv.innerText = "Failed to load top tracks: " + data.error.message //use data not res because res is Response type with metadata about the HTTP response, not the actual data
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



   } catch {

   }
}
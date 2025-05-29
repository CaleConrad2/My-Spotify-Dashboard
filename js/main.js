import { startLogin } from './auth.js';
import { getTopArtists, getTopTracks, getRecentlyPlayed } from './api.js';

// hooking UI to functions
const path = window.location.pathname;
const authBtn = document.getElementById("auth-btn");
const token = localStorage.getItem("access_token");
if (token) {
    authBtn.textContent = "Log out";
    authBtn.onclick = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload(); //clears tokens, goes to home page
    };
} else {
    authBtn.textContent = 'Log in';
    authBtn.onclick = () => {
        startLogin();
    }
}




if (path.includes('top-artists.html')) {
    getTopArtists();
}
else if (path.includes('top-tracks.html')) {
    getTopTracks();
}
else if (path.includes('recently-played.html')) {
    getRecentlyPlayed();
}

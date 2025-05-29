import { startLogin } from './auth.js';
import { getTopArtists, getTopTracks, getRecentlyPlayed } from './api.js';

// hooking UI to functions

window.startLogin = startLogin;

const path = window.location.pathname;

if (path.includes('top-artists.html')) {
    getTopArtists();
}
else if (path.includes('top-tracks.html')) {
    getTopTracks();
}
else if (path.includes('recently-played.html')) {
    getRecentlyPlayed();
}

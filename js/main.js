import { startLogin } from './auth.js';
import { getTopArtists, getTopTracks } from './api.js';

// hooking UI to functions

window.startLogin = startLogin;
window.getTopArtists = getTopArtists;
window.getTopTracks = getTopTracks;
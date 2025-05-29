import { startLogin } from './auth.js';
import { getTopArtists, getTopTracks, getRecentlyPlayed, getUserProfile } from './api.js';

// hooking UI to functions
const path = window.location.pathname;
const authBtn = document.getElementById("auth-btn");
const token = localStorage.getItem("access_token");

if (token) {
  authBtn.textContent = "Log out";
  authBtn.onclick = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  };

  if (path.includes('index.html') || path.endsWith('/')) {
    getUserProfile();
  }
} else {
  authBtn.textContent = 'Log in';
  authBtn.onclick = () => {
    startLogin();
  };

  const userCard = document.getElementById('user-card');
userCard.innerHTML = `
  <div style="text-align: center; padding: 32px;">
    <button id="login-btn" style="padding: 16px 32px; font-size: 18px; font-weight: bold; background-color: #1DB954; color: white; border: none; border-radius: 8px; cursor: pointer;">
      Log in with Spotify
    </button>
    <p style="margin-top: 16px; color: #666;">Please log in to view your Spotify dashboard</p>
  </div>
`;
document.getElementById('login-btn').addEventListener('click', startLogin);
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

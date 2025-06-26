import { startLogin } from './auth.js';
import { getTopArtists, getTopTracks, getRecentlyPlayed, getUserProfile } from './api.js';

// hooking UI to functions
const path = window.location.pathname;
const authBtn = document.getElementById("auth-btn");
const token = localStorage.getItem("access_token");
const homeButtons = document.getElementById('home-buttons');

if (token) {
  authBtn.textContent = "Log out";
  authBtn.onclick = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('code_verifier');
    window.location.reload();
  };

  if (path.includes('index.html') || path.endsWith('/')) {
    getUserProfile();
    // Show home buttons when logged in
    if (homeButtons) homeButtons.classList.remove('hidden');
  }
} else {
  authBtn.textContent = 'Log in';
  authBtn.onclick = () => {
    startLogin();
  };

  // Only update #user-card, do not touch #home-buttons content
  const userCard = document.getElementById('user-card');
  userCard.innerHTML = `
    <div style="text-align: center; padding: 32px;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">🎵</div>
      <h2 style="margin-bottom: 1rem; color: var(--text-primary);">Welcome to Your Spotify Dashboard</h2>
      <p style="margin-bottom: 2rem; color: var(--text-secondary);">Discover your listening habits and explore your music taste</p>
      <button id="login-btn" style="padding: 1rem 2rem; font-size: 1.1rem; font-weight: 600; background: var(--spotify-green); color: white; border: none; border-radius: 25px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(29, 185, 84, 0.3);">
        Log in with Spotify
      </button>
    </div>
  `;
  document.getElementById('login-btn').addEventListener('click', startLogin);
  // Hide home buttons when not logged in
  if (homeButtons) homeButtons.classList.add('hidden');
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

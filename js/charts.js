//charts i want: 
//Listening Time of Day (Heatmap or Line Chart) (time of day, hour based
//Top Artists by Play Count (Bar or Horizontal Bar Chart)
//Top Tracks by Duration (Bar Chart)
//Listening Frequency - when you played music by day (num songs played per day, day based)

import { fetchWithAuth } from "./auth.js";


document.addEventListener('DOMContentLoaded', async () => {
      const token = localStorage.getItem("access_token");
      const resultsDiv = document.getElementById('charts');
    try {
      const topArtists = await fetchWithAuth("https://api.spotify.com/v1/me/top/artists?limit=10"); //gets top 10 artists
      const topTracks = await fetchWithAuth("https://api.spotify.com/v1/me/top/tracks?limit=50");
      const recentlyPlayed = await fetchWithAuth("https://api.spotify.com/v1/me/player/recently-played?limit=50"); //return 50 last played songs and their times played

      const topArtistsData = await topArtists.json();
      const topTracksData = await topTracks.json();
      const recentlyPlayedData = await recentlyPlayed.json();
      const heatmapData = Array.from({ length: 7 }, () => Array(24).fill(0));

      console.log("topArtistsData");
      console.log(topArtistsData);
      console.log("topTracksData");
      console.log(topTracksData);
      console.log("recentlyPlayedData");
      console.log(recentlyPlayedData);
      
      if (!topArtists.ok) {
        if (topArtistsData.error.status === 401) {
            const userCard = document.getElementById('user-card');
            userCard.innerHTML = `
                <div style="text-align: center; padding: 32px;">
                    <button onclick="startLogin()" style="padding: 16px 32px; font-size: 18px; font-weight: bold; background-color: #1DB954; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        Log in with Spotify
                    </button>
                    <p style="margin-top: 16px; color: #666;">Please log in to view your Spotify dashboard</p>
                </div>
            `;
            document.getElementById('charts').style.display = 'none';
        } else {
            resultsDiv.innerText = "Failed to load top artists: " + data.error.message;
        }
        return;
      } else if (!topTracks.ok) {
        if (topTracksData.error.status === 401) {
            const userCard = document.getElementById('user-card');
            userCard.innerHTML = `
                <div style="text-align: center; padding: 32px;">
                    <button onclick="startLogin()" style="padding: 16px 32px; font-size: 18px; font-weight: bold; background-color: #1DB954; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        Log in with Spotify
                    </button>
                    <p style="margin-top: 16px; color: #666;">Please log in to view your Spotify dashboard</p>
                </div>
            `;
            document.getElementById('charts').style.display = 'none';
        } else {
            resultsDiv.innerText = "Failed to load top artists: " + data.error.message;
        }
      } else if (!recentlyPlayed.ok) {
        if (recentlyPlayedData.error.status === 401) {
            const userCard = document.getElementById('user-card');
            userCard.innerHTML = `
                <div style="text-align: center; padding: 32px;">
                    <button onclick="startLogin()" style="padding: 16px 32px; font-size: 18px; font-weight: bold; background-color: #1DB954; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        Log in with Spotify
                    </button>
                    <p style="margin-top: 16px; color: #666;">Please log in to view your Spotify dashboard</p>
                </div>
            `;
            document.getElementById('charts').style.display = 'none';
        } else {
            resultsDiv.innerText = "Failed to load top artists: " + data.error.message;
        }
      }

      // If we get here, user is logged in, so show the charts
      document.getElementById('charts').style.display = 'block';

      const artists = topArtistsData.items;
      const tracks = topTracksData.items.sort((a, b) => b.duration_ms - a.duration_ms).slice(0, 10);
      const played = recentlyPlayedData.items;
  
      const artistNames = artists.map(artist => artist.name);//for label
      const artistData = artists.map((_, index) => 10 - index); // Simulated "play count" by rank
      console.log(artistData);
      const trackNames = tracks.map(tracks => tracks.name); //for label
      console.log(trackNames);
      const trackData = tracks.map(duration => Math.floor(duration.duration_ms / 1000))
      console.log(trackData);
      played.forEach(item => {
        const date = new Date(item.played_at);
        const day = date.getDay(); // 0 = Sunday, 6 = Saturday
        const hour = date.getHours(); // 0–23
        heatmapData[day][hour]++;
      });
  
      const ctxArtists = document.getElementById('TopArtistsByPlayCount').getContext('2d');
      const ctxTracks = document.getElementById('TopTracksByDuration').getContext('2d');
      const ctxFrequency = document.getElementById('ListeningHeatMap').getContext('2d');
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const matrixData = [];
      for (let day = 0; day < 7; day++) {
        for (let hour = 0; hour < 24; hour++) {
          matrixData.push({
            x: hour,
            y: day,
            v: heatmapData[day][hour]
          });
        }
      }
  
      new Chart(ctxArtists, {
        type: 'bar',
        data: {
          labels: artistNames,
          datasets: [{
            label: 'Top Artists',
            data: artistData,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });

      new Chart(ctxTracks, {
        type: 'bar',
        data: {
          labels: trackNames,
          datasets: [{
            label: 'Top Tracks by Duration',
            data: trackData,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { // changes what is shown on y graph ticks
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        const minutes = Math.floor(value / 60);
                        const seconds = value % 60;
                        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
                    }
                }
            }
          },
          plugins: {
            tooltip: { //changes what is shown on hovering over the data
                callbacks: {
                    label: function(context) {
                        const seconds = context.raw;
                        const minutes = Math.floor(seconds / 60);
                        const remainder = seconds % 60;
                        return `${context.label}: ${minutes}:${remainder.toString().padStart(2, '0')}`;
                    }
                }
            }
          }
        }
      });

      new Chart(ctxFrequency, {
        type: 'matrix',
        data: {
          datasets: [{
            label: 'Listening Heatmap',
            data: matrixData,
            backgroundColor(ctx) {
              const value = ctx.dataset.data[ctx.dataIndex].v;
              return value === 0
                ? '#eeeeee'
                : `rgba(75, 192, 192, ${0.2 + Math.min(value / 5, 0.8)})`;
            },
            width: 20,
            height: 20,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              position: 'top',
              ticks: {
                callback: val => `${val}:00`,
                max: 23,
                min: 0,
                stepSize: 1
              }
            },
            y: {
              type: 'linear',
              ticks: {
                callback: val => days[val]
              },
              max: 6,
              min: 0,
              reverse: true
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: ctx => `${days[ctx[0].raw.y]}, ${ctx[0].raw.x}:00`,
                label: ctx => `Plays: ${ctx.raw.v}`
              }
            }
          }
        }
      });
  
    } catch (err) {
      console.error('Error: ', err);
    }
  });
  
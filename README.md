# Spotify Stats Dashboard

A personal dashboard to visualize your Spotify listening habits using the Spotify Web API. View your top tracks, top artists, listening patterns, and custom data charts — all with a clean and responsive UI.

---

## Features

- Secure PKCE Authentication with Spotify
- View Top Artists with clickable Spotify links and profile images
- Browse your Top Tracks sorted by popularity and duration
- Visualize:
  - Top Artists by play ranking
  - Top Tracks by duration
  - Listening time of day (heatmap)
- See your Recently Played tracks with rich metadata
- Personalized User Profile Card
- Responsive, modular, and styled with custom CSS

## Tech Stack

- HTML, CSS, JavaScript
- Spotify Web API (OAuth + endpoints)
- Chart.js and chartjs-chart-matrix for data visualizations
- Optional hosting via Vercel or GitHub Pages


Privacy Notice
This is a personal project that uses Spotify's Web API.
No user data is stored, tracked, or shared. All access tokens are stored in localStorage only for the duration of your session.

License
This project is licensed under the MIT License. It is not affiliated with or endorsed by Spotify.

Roadmap
Add backend for storing long-term listening history


## What I learned from this project:


How to connect with a popular API, Spotify, and how to use the data obtained from the API to show user information.

How to wireframe with HTML and use JavaScript to build and show the correct data on the web page.

How to access the API via an access token obtained from PKCE Code Flow Authorization.

How to use a refresh key to continously access the API when needed so the user only has to authorize once.

How to style HTML elements, classes and IDs with CSS.

How to use Chart.js to show information via bar graphs and a heatmap.

How to import and export functions as well as modulate scripts for their use.

How to use fetch and await to obtain a Response type object and parse the object for its data via .json().

How to handle errors using try and catch.

DOM manipulation via innerHTML, getElementById and addEventListener.

How to handle events such as button presses to log in.

How to handle logging a user in and obtaining an access key via callback URL.

How to conditionally show user UI based on log in state.

Debugging tools such as console.log() to show in browser console.

Browser console elements such as localStorage, Console, Elements used in debugging and building.

How to make clickable tables with hyperlinks.

Structuring code to be able to revisit it later and build on it.

And much more I'm forgetting about at the moment!

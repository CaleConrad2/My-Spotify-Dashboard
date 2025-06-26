# Spotify Stats Dashboard

Visualize your Spotify listening habits with user charts, top tracks, and artist insights — built using the Spotify Web API, Chart.js, and secure PKCE authentication.

## Screenshots
Home Page:

![Screenshot 2025-06-26 095845](https://github.com/user-attachments/assets/1cfb3715-830c-489d-bb66-23b4c2aa3377)
![Screenshot 2025-06-26 095935](https://github.com/user-attachments/assets/5d96cde7-dd13-4f28-a46c-bf93ccfed4e5)


Top Tracks Page:

![Screenshot 2025-06-26 095940](https://github.com/user-attachments/assets/0759fe0b-fc69-48a6-b7bb-b086a5f69650)


Recently Played Tracks:

![Screenshot 2025-06-26 095944](https://github.com/user-attachments/assets/b631c43d-9cf8-4900-b74e-abea4ac38d68)


Charts Page:

![Screenshot 2025-06-26 095949](https://github.com/user-attachments/assets/cb36b234-f367-4dea-ba91-f5299cdbed73)


---

## Features

- Secure PKCE Authentication with Spotify
- View Top Artists with clickable Spotify links and profile images
- Browse your Top Tracks sorted by popularity and duration
- Visualize:
  - Top Artists by play ranking
  - Top Tracks by duration
  - Listening time of day (heatmap)
- See your Recently Played tracks
- Stylized with CSS

## Tech Stack

- HTML, CSS, JavaScript
- Spotify Web API (OAuth + endpoints)
- Chart.js and chartjs-chart-matrix for data visualizations


## What I learned from this project:


- Connected to Spotify’s Web API and parsed real user data from protected endpoints
  
- Implemented secure PKCE flow to authorize users without leaking credentials
  
- Used Chart.js + Matrix plugin to create responsive bar and heatmap visualizations

- Wireframe with HTML and use JavaScript to build and show the correct data on the web page.

- Use a refresh key to continously access the API when needed so the user only has to authorize once.

- Style HTML elements, classes and IDs with CSS.

- Import and export functions as well as modulate scripts for their use.

- Use fetch and await to obtain a Response type object and parse the object for its data via .json().

- DOM manipulation via innerHTML, getElementById and addEventListener.

- Handle events such as button presses to log in.

- Handle logging a user in and obtaining an access key via callback URL.

- Conditionally show user UI based on log in state.

- Debugging tools such as console.log() to show in browser console.

- Browser console elements such as localStorage, Console, Elements used in debugging and building.

- Structuring code to be able to revisit it later and build on it.

And much more I'm forgetting about at the moment!


## Roadmap

- [ ] Add backend support to persist long-term listening history and access key storage
- [ ] More stylistic features such as more text, animation, ect.

## License

MIT License. This project is not affiliated with or endorsed by Spotify.

## Privacy Notice

This is a personal project that uses Spotify's Web API.  
Authentication tokens are stored in localStorage for the duration of the user's session.
Access tokens are short-lived and automatically refreshed using a refresh token stored locally.
No data is ever transmitted or stored on any server other than Spotify.

## Disclaimer

This is a personal project intended for local use and experimentation.  
It is **not hardened for production** and may contain unpatched security issues (e.g., XSS).  
If you choose to deploy it, **do so at your own risk.**

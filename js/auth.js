const clientId = 'f95d2910b2334dd3b2781dd2bff6b329';
const redirectUri = 'http://127.0.0.1:5500/callback.html';

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return await window.crypto.subtle.digest('SHA-256', data);
};

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

export async function startLogin() {
    // Clear any existing tokens and verifiers to start fresh
    localStorage.removeItem('code_verifier');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    localStorage.setItem('code_verifier', codeVerifier);
    console.log('Generated code verifier:', codeVerifier);

    const scope = 'user-top-read user-read-recently-played';

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    console.log('Redirecting to:', authUrl.toString());
    window.location.href = authUrl.toString();
}

export async function getToken(code) {
    const codeVerifier = localStorage.getItem('code_verifier');
    console.log('Retrieved code verifier:', codeVerifier);
    
    if (!codeVerifier) {
        document.body.innerHTML = "Error: No code verifier found. Please try logging in again.";
        return;
    }

    const body = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier
    });

    console.log('Sending token request with code:', code);

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    });

    const data = await response.json();
    console.log('Token response:', data);

    if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
            localStorage.setItem('refresh_token', data.refresh_token);
        }
        // Clear the code verifier after successful token exchange
        localStorage.removeItem('code_verifier');
        window.location.href='index.html';
    } else {
        console.error('Token fetch failed:', data);
        document.body.innerHTML = "Token fetch failed: " + JSON.stringify(data) + "<br><br><a href='index.html'>Try again</a>";
    }
}

export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return;

    const payload = await fetch("https://accounts.spotify.com/api/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        })
    });

    const data = await payload.json();
    if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        if (data.refresh_token) {
            localStorage.setItem('refresh_token', data.refresh_token);
        }
    } else {
        console.error("Failed to refresh token", data);
    }
}

export async function fetchWithAuth(url) {
    let token = localStorage.getItem('access_token');
    let res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (res.status === 401) {
        await refreshAccessToken();
        token = localStorage.getItem('access_token');
        res = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    return res;
}

window.startLogin = startLogin;
document.addEventListener("DOMContentLoaded", () => {
    // Name Rotator
    const names = ["Jordan", "Jordie", "Cimarron", "Poptargs"];
    let currentName = 0;
    const nameElement = document.getElementById("name-rotator");
    if (nameElement) {
        setInterval(() => {
            currentName = (currentName + 1) % names.length;
            nameElement.textContent = names[currentName];
        }, 1500);
    }

    // Typewriter for About Me
    const aboutParagraph = document.querySelector(".about-me-p");
    if (aboutParagraph) {
        aboutParagraph.textContent = " I’m a front-end developer with a love for clean code and bold visuals. " +
            "When I’m not building things, I’m gaming, fine-tuning design details, exploring color palettes, " +
            "or running on a steady mix of Diet Coke and vibes.";
        const text = aboutParagraph.textContent;
        aboutParagraph.textContent = "";
        let i = 0;
        (function type() {
            if (i < text.length) {
                aboutParagraph.textContent += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        })();
    }

    // Dark Mode Toggle
    const toggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            themeIcon.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeIcon.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });

// Load saved theme
    window.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-theme");
            themeIcon.textContent = "☀️";
        }
    });

    //Email
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied!");
        });
    }


    //Progress Scroll
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.getElementById("progress-bar").style.width = scrollPercent + "%";
    });

    //Loading Screen
    window.addEventListener("load", () => {
        setTimeout(() => {
            document.getElementById("loading-screen").style.display = "none";
        }, 3000); // adjust to match animation
    });


    // Dot Canvas
    const canvas = document.getElementById('dot-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let mouseX = -100, mouseY = -100;
    const spacing = 40, dotSize = 3;

    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function drawDots() {
        if (!canvas || !ctx) return;
        const bgMain = getComputedStyle(document.body).getPropertyValue('--bg-main').trim();
        const bgSecondary = getComputedStyle(document.body).getPropertyValue('--bg-secondary').trim();
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, bgMain);
        gradient.addColorStop(1, bgSecondary);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const dotColor = getComputedStyle(document.body).getPropertyValue('--pixel-dot').trim();
        const accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim();

        for (let x = 0; x < canvas.width; x += spacing) {
            for (let y = 0; y < canvas.height; y += spacing) {
                const dx = mouseX - x;
                const dy = mouseY - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let size = dotSize;
                ctx.fillStyle = dotColor;
                if (dist < 100) {
                    size = dotSize + (1.5 - dist / 100) * 4;
                    ctx.fillStyle = accentColor;
                }
                ctx.beginPath();
                ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        requestAnimationFrame(drawDots);
    }
    if (canvas && ctx) drawDots();
});

//Spotify
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQDV4uZYawl_Bv_Exo6VnuC9TkqJ4iTe0J1RFRFv1Ld1ml--C8awne867h1D5Y22yCwQmiMNRqrv1YPCHxNAHwCExrFpMIR_9I88X9BwcluEyvforfJ0_0F315ICI1qLsta4XrTvP-tRDLA4yiUZMYhCu9MP97JohB-Ve9BBsCSl8fHGhAg34ULHrLDBaYZDd4vI3yVVExvKO1fG8oL2fq6bgIYfvYxA9cCLlApQiJYieywPuY6AlonaJoLDt4VtqQ6PBSNBxmswugsr2u2sA_0ocqm4mvX34IpD2XmD8AOiUHp-gJ_r9pg1vnHNkZwo';
async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {
        console.error("Spotify API error:", res.status, await res.text());
        return null;
    }

    return await res.json();
}

async function getTopTracks() {
    const data = await fetchWebApi(
        'v1/me/top/tracks?time_range=long_term&limit=5',
        'GET'
    );
    console.log("Raw data:", data);
    return data?.items || [];
}

function renderTracks(tracks) {
    const container = document.getElementById("top-tracks");
    const title = `<h3 class="section-title">🎵 Top Tracks</h3>`;

    const trackHTML = tracks.map((track, i) => {
        const artists = track.artists.map(a => a.name).join(", ");
        const nowPlaying = i === 0 ? 'now-playing' : '';
        const trackUrl = track.external_urls.spotify;

        return `
      <a href="${trackUrl}" target="_blank" class="track ${nowPlaying}">
        ${track.name} - <span class="track-artist">${artists}</span>
      </a>
    `;
    }).join(` <span class="separator">|</span> `);

    container.innerHTML = title + `<div class="tracks-row">${trackHTML}</div>`;
}

async function init() {
    const topTracks = await getTopTracks();

    if (!topTracks.length) {
        document.getElementById("top-tracks").innerHTML = "<p>No tracks found.</p>";
        return;
    }

    renderTracks(topTracks);
}

// Load immediately
init();

// Refresh every 5 minutes (300,000 ms)
setInterval(init, 300000);






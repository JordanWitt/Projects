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

/* =========================================================
 hello po nagpatulong ako sa ai kase obob ko sa js hwahwahawahawh
   ========================================================= */

/* Wait until the page's HTML is ready before touching it */
var musicPlayer = null;   // filled in by initMusic(), used by initNav()

document.addEventListener("DOMContentLoaded", function () {
    addTicker();
    buildSidebar();
    startSnow();
    initVideo();
    initGallery();
    initMusic();
    initNav();
});


/* ---------------------------------------------------------
   0. THE MOST IMPORTANT OF ALL, THE ANIMATED TITLE
   --------------------------------------------------------- */

function tb8_makeArray(n){
        this.length = n;
        return this.length;
                        }
            tb8_messages = new tb8_makeArray(3);
            tb8_messages[0] = "A Christmas Of Giving";
            tb8_messages[1] = "By G10 - Puting Krus";
            tb8_messages[2] = "Thank you for visiting!";
            tb8_rptType = 'infinite';
            tb8_rptNbr = 5;
            tb8_speed = 100;
            tb8_delay = 2000;
            var tb8_counter=1;
            var tb8_currMsg=0;
            var tb8_tekst ="";
            var tb8_i=0;
            var tb8_TID = null;
            function tb8_pisi(){
            tb8_tekst = tb8_tekst + tb8_messages[tb8_currMsg].substring(tb8_i, tb8_i+1);
            document.title = tb8_tekst;
            tb8_sp=tb8_speed;
            tb8_i++;
            if (tb8_i==tb8_messages[tb8_currMsg].length){
            tb8_currMsg++; tb8_i=0; tb8_tekst="";tb8_sp=tb8_delay;
            }
            if (tb8_currMsg == tb8_messages.length){
            if ((tb8_rptType == 'finite') && (tb8_counter==tb8_rptNbr)){
            clearTimeout(tb8_TID);
    return;
            }
        tb8_counter++;
        tb8_currMsg = 0;
        }
        tb8_TID = setTimeout("tb8_pisi()", tb8_sp);
        }
        tb8_pisi()


/* ---------------------------------------------------------
   1. SCROLLING TICKER
   --------------------------------------------------------- */
function addTicker() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var ticker = document.createElement("div");
    ticker.className = "ticker";

    var text = document.createElement("span");
    text.className = "ticker__text";
    text.textContent =
    "*** Maligayang Pasko po!! *** " +

    "Pa-heart naman <3 *** " +

    "From Puting krus Ey *** " +

    "Maligayang Pask- Ay wala pa pala..... *** " +

    "Ginawa ng may pagmamahal ng PK ni Maam HJ!! *** " +

    "Like and Subscribe po *** " +

    "Merry Christmas Po!!! *** " +

    "Ha?          Ha?         Hatdog. *** ";

    ticker.appendChild(text);
    // insert the ticker right after the header
    header.insertAdjacentElement("afterend", ticker);
}


/* ---------------------------------------------------------
   2. SIDEBAR (countdown + snow button + visit counter)
   --------------------------------------------------------- */
function buildSidebar() {
    var main = document.querySelector(".content-container");
    if (!main) return;

    var sidebar = document.createElement("aside");
    sidebar.className = "retro-sidebar";

    /* --- Countdown box --- */
    var countBox = document.createElement("div");
    countBox.className = "sidebar-box";
    countBox.innerHTML =
        "<h3>Days til Christmas</h3>" +
        '<div class="countdown" id="countdown" aria-live="off"></div>';
    sidebar.appendChild(countBox);

    /* --- Snow toggle button --- */
    var snowBox = document.createElement("div");
    snowBox.className = "sidebar-box";
    snowBox.innerHTML = "<h3>Weather</h3>";

    var snowBtn = document.createElement("button");
    snowBtn.type = "button";
    snowBtn.className = "snow-toggle";
    snowBtn.id = "snowToggle";
    snowBtn.setAttribute("aria-pressed", "true");
    snowBtn.textContent = "Snow: ON";
    snowBox.appendChild(snowBtn);
    sidebar.appendChild(snowBox);

    /* --- Visit counter (saved in this browser with localStorage) --- */
    var hitBox = document.createElement("div");
    hitBox.className = "sidebar-box";
    hitBox.innerHTML =
        "<h3>Visits</h3>" +
        '<p class="hit-counter">You have visited <strong id="hitCount">0001</strong> time(s)!</p>';
    sidebar.appendChild(hitBox);

    // put the sidebar first inside <main>
    main.insertBefore(sidebar, main.firstChild);

    startCountdown();
    updateVisitCounter();
}


/* ---------------------------------------------------------
   COUNTDOWN TIMER
   --------------------------------------------------------- */
function startCountdown() {
    var box = document.getElementById("countdown");
    if (!box) return;

    function tick() {
        var now = new Date();
        var year = now.getFullYear();

        // Christmas Day at 12:00 AM (month 11 = December)
        var christmas = new Date(year, 11, 25, 0, 0, 0);
        // Christmas lasts the whole day of Dec 25
        var endOfChristmas = new Date(year, 11, 26, 0, 0, 0);

        // It is Christmas Day right now!
        if (now >= christmas && now < endOfChristmas) {
            box.innerHTML = '<div class="countdown__done">MERRY CHRISTMAS!</div>';
            return;
        }

        // After Christmas? Count down to NEXT year's Christmas
        if (now >= endOfChristmas) {
            christmas = new Date(year + 1, 11, 25, 0, 0, 0);
        }

        var diff = christmas - now;               // milliseconds left
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        var mins = Math.floor((diff / (1000 * 60)) % 60);
        var secs = Math.floor((diff / 1000) % 60);

        box.innerHTML =
            unit(days, "days") +
            unit(hours, "hrs") +
            unit(mins, "min") +
            unit(secs, "sec");
    }

    // small helper that builds one little number box
    function unit(value, label) {
        var padded = value < 10 ? "0" + value : String(value);
        return '<div class="countdown__unit">' + padded + "<small>" + label + "</small></div>";
    }

    tick();                       // run once right away
    setInterval(tick, 1000);      // then every second
}


/* ---------------------------------------------------------
   VISIT COUNTER (localStorage remembers the number)
   --------------------------------------------------------- */
function updateVisitCounter() {
    var el = document.getElementById("hitCount");
    if (!el) return;

    var visits = 1;
    try {
        visits = parseInt(localStorage.getItem("pkChristmasVisits"), 10) || 0;
        visits = visits + 1;
        localStorage.setItem("pkChristmasVisits", visits);
    } catch (err) {
        // localStorage can be blocked (private mode), so just show 1
    }

    // pad with zeros like an old hit counter: 0007
    el.textContent = String(visits).padStart(4, "0");
}


/* ---------------------------------------------------------
   3. SNOWFALL (HTML canvas)
   --------------------------------------------------------- */
function startSnow() {
    var canvas = document.createElement("canvas");
    canvas.className = "snow-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var flakes = [];
    var FLAKE_COUNT = 90;          // lower this number if the page feels slow
    var snowOn = true;
    var angle = 0;                 // used to sway the flakes left and right
    var frameId = null;

    // Make the canvas as big as the window
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create all the snowflakes with random size, position and speed
    for (var i = 0; i < FLAKE_COUNT; i++) {
        flakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.floor(Math.random() * 3) + 2,   // 2, 3 or 4 px squares
            speed: Math.random() * 1 + 0.5,
            drift: Math.random() * 2 + 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fffdf6";
        angle += 0.01;

        for (var i = 0; i < flakes.length; i++) {
            var f = flakes[i];

            // square "pixel" flakes to match the retro look
            ctx.fillRect(Math.round(f.x), Math.round(f.y), f.size, f.size);

            // move down + sway sideways with a sine wave
            f.y += f.speed;
            f.x += Math.sin(angle + i) * 0.4 * f.drift;

            // when a flake leaves the screen, send it back to the top
            if (f.y > canvas.height) {
                f.y = -5;
                f.x = Math.random() * canvas.width;
            }
            if (f.x > canvas.width) f.x = 0;
            if (f.x < 0) f.x = canvas.width;
        }

        frameId = requestAnimationFrame(draw);
    }

    function setSnow(on) {
        snowOn = on;
        var btn = document.getElementById("snowToggle");

        if (on) {
            canvas.style.display = "block";
            if (!frameId) draw();
        } else {
            cancelAnimationFrame(frameId);
            frameId = null;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = "none";
        }

        if (btn) {
            btn.textContent = on ? "Snow: ON" : "Snow: OFF";
            btn.setAttribute("aria-pressed", on ? "true" : "false");
        }
    }

    // Connect the button (built in buildSidebar) to the snow
    var toggleBtn = document.getElementById("snowToggle");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            setSnow(!snowOn);
        });
    }

    // If the visitor asked their computer to reduce motion, start with snow OFF
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSnow(!reduceMotion);
}


/* ---------------------------------------------------------
   VIDEO FALLBACK
   - If the iframe has no src yet, show a "VIDEO COMING SOON" box.
   - Otherwise, fill the "Watch on Facebook" button with a normal
     link made from the embed link (so it always opens on Facebook).
   --------------------------------------------------------- */
function initVideo() {
    var iframe = document.querySelector(".video-wrapper iframe");
    var emptyBox = document.getElementById("videoEmpty");
    var note = document.getElementById("videoFallback");
    var link = document.getElementById("watchLink");
    if (!iframe) return;

    var src = (iframe.getAttribute("src") || "").trim();

    // no video linked yet
    if (src === "") {
        iframe.hidden = true;
        if (emptyBox) emptyBox.hidden = false;
        if (note) note.hidden = true;
        return;
    }

    // Facebook embed links look like:
    //   https://www.facebook.com/plugins/video.php?href=THE_REAL_VIDEO_LINK&...
    // so we pull out the "href" part and use it for the button.
    // (If you already pasted a link into the button's href, we keep yours.)
    var current = link ? link.getAttribute("href") : "";
    if (link && (!current || current === "#")) {
        var watchUrl = src;
        try {
            var fromEmbed = new URL(src, location.href).searchParams.get("href");
            if (fromEmbed) watchUrl = fromEmbed;
        } catch (err) {
            // not a valid web address, just use src as it is
        }
        link.href = watchUrl;
    }
}


/* ---------------------------------------------------------
   GALLERY (click a photo to open the photo viewer)
   --------------------------------------------------------- */
function initGallery() {
    var items = document.querySelectorAll(".gallery-item");
    if (items.length === 0) return;

    var photos = [];       // one object per photo: {btn, img, caption}

    for (var i = 0; i < items.length; i++) {
        (function (index) {
            var btn = items[index].querySelector(".gallery-thumb");
            var img = items[index].querySelector("img");
            var cap = items[index].querySelector("figcaption");
            if (!btn || !img) return;

            var photo = { btn: btn, img: img, caption: cap ? cap.textContent : "" };
            photos.push(photo);

            // if the picture file is missing, show a placeholder instead of a broken icon
            function markMissing() { btn.classList.add("is-missing"); }
            img.addEventListener("error", markMissing);
            if (img.complete && img.naturalWidth === 0) markMissing();

            btn.setAttribute("aria-label", "Open photo: " + (img.alt || "photo " + (index + 1)));
            btn.addEventListener("click", function () {
                if (!btn.classList.contains("is-missing")) openViewer(photos.indexOf(photo));
            });
        })(i);
    }

    /* ---- build the photo viewer once, hidden ---- */
    var viewer = document.createElement("div");
    viewer.className = "lightbox";
    viewer.hidden = true;
    viewer.setAttribute("role", "dialog");
    viewer.setAttribute("aria-modal", "true");
    viewer.setAttribute("aria-label", "Photo viewer");
    viewer.innerHTML =
        '<img class="lightbox__img" alt="">' +
        '<p class="lightbox__caption"></p>' +
        '<div class="lightbox__controls">' +
            '<button type="button" class="pixel-btn" data-act="prev">Prev</button>' +
            '<span class="lightbox__count"></span>' +
            '<button type="button" class="pixel-btn" data-act="next">Next</button>' +
            '<button type="button" class="pixel-btn" data-act="close">Close</button>' +
        "</div>";
    document.body.appendChild(viewer);

    var bigImg = viewer.querySelector(".lightbox__img");
    var bigCap = viewer.querySelector(".lightbox__caption");
    var count = viewer.querySelector(".lightbox__count");
    var buttons = viewer.querySelectorAll("button");
    var closeBtn = viewer.querySelector('[data-act="close"]');

    var current = 0;
    var lastFocus = null;

    function show(index) {
        // wrap around: after the last photo comes the first
        current = (index + photos.length) % photos.length;
        var p = photos[current];
        bigImg.src = p.img.currentSrc || p.img.src;
        bigImg.alt = p.img.alt;
        bigCap.textContent = p.caption;
        count.textContent = (current + 1) + " / " + photos.length;
    }

    function openViewer(index) {
        lastFocus = document.activeElement;
        show(index);
        viewer.hidden = false;
        document.body.style.overflow = "hidden";      // stop the page scrolling behind
        closeBtn.focus();
    }

    function closeViewer() {
        viewer.hidden = true;
        document.body.style.overflow = "";
        if (lastFocus) lastFocus.focus();
    }

    // clicking the buttons
    viewer.addEventListener("click", function (event) {
        var act = event.target.getAttribute("data-act");
        if (act === "prev") show(current - 1);
        else if (act === "next") show(current + 1);
        else if (act === "close") closeViewer();
        else if (event.target === viewer) closeViewer();    // click on the dark background
    });

    // keyboard: Esc closes, arrows change photo, Tab stays inside the viewer
    document.addEventListener("keydown", function (event) {
        if (viewer.hidden) return;

        if (event.key === "Escape") {
            closeViewer();
        } else if (event.key === "ArrowLeft") {
            show(current - 1);
        } else if (event.key === "ArrowRight") {
            show(current + 1);
        } else if (event.key === "Tab") {
            var first = buttons[0];
            var last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    // phones: swipe left / right to change photo
    var touchStartX = null;
    viewer.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].clientX;
    });
    viewer.addEventListener("touchend", function (event) {
        if (touchStartX === null) return;
        var dx = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
        touchStartX = null;
    });
}


/* ---------------------------------------------------------
   4. TOP MENU  (shows one "page" at a time)
   Every section has data-page="home", "about" or "music".
   We hide the ones that do not match the chosen menu link.
   --------------------------------------------------------- */
function initNav() {
    var links = document.querySelectorAll(".site-nav a");
    var pages = document.querySelectorAll("[data-page]");
    if (links.length === 0) return;

    function showPage(name) {
        // if the name in the address is not a real page, use home
        var valid = false;
        for (var i = 0; i < links.length; i++) {
            if (links[i].getAttribute("data-target") === name) valid = true;
        }
        if (!valid) name = "home";

        // show matching sections, hide the others
        for (var j = 0; j < pages.length; j++) {
            pages[j].hidden = pages[j].getAttribute("data-page") !== name;
        }

        // highlight the current menu link
        for (var k = 0; k < links.length; k++) {
            var isCurrent = links[k].getAttribute("data-target") === name;
            links[k].classList.toggle("is-active", isCurrent);
            if (isCurrent) {
                links[k].setAttribute("aria-current", "page");
            } else {
                links[k].removeAttribute("aria-current");
            }
        }

        // pause the boombox when leaving the Music page
        // (so it does not play over the video)
        if (name !== "music" && musicPlayer) musicPlayer.pause();
    }

    // clicking a link: switch page and update the address (#about etc.)
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (event) {
            event.preventDefault();
            var name = this.getAttribute("data-target");
            showPage(name);
            try {
                history.replaceState(null, "", "#" + name);
            } catch (err) {
                // some browsers block this on local files, no big deal
            }
        });
    }

    // back/forward buttons and typed addresses
    window.addEventListener("hashchange", function () {
        showPage(location.hash.replace("#", ""));
    });

    // first load: open the page named in the address, or home
    showPage(location.hash.replace("#", ""));
}


/* ---------------------------------------------------------
   5. BOOMBOX  (real audio file + live equalizer)
   - The <audio> tag in index.html plays the song file.
   - The Web Audio "analyser" listens to the song and tells
     us how loud each pitch is, 60 times a second.
   - We draw that on the <canvas> as chunky LED blocks.
   --------------------------------------------------------- */
function initMusic() {
    var box = document.getElementById("boombox");
    var audio = document.getElementById("audio");
    var playBtn = document.getElementById("playBtn");
    var stopBtn = document.getElementById("stopBtn");
    var volume = document.getElementById("volume");
    var screen = document.getElementById("nowPlaying");
    var seek = document.getElementById("seek");
    var timeText = document.getElementById("timeText");
    var canvas = document.getElementById("visualizer");
    var trackBtns = document.querySelectorAll(".track-btn");
    if (!box || !audio || !canvas || trackBtns.length === 0) return;

    var ctx = canvas.getContext("2d");
    var current = 0;               // which song button is selected
    var seeking = false;           // true while the visitor drags the slider

    /* ---------- EQUALIZER SETTINGS ---------- */
    var BARS = 16;                 // how many columns
    var BLOCK_H = 7;               // height of one LED block (px)
    var BLOCK_GAP = 2;
    var levels = [];               // current height of each bar, 0 to 1
    for (var i = 0; i < BARS; i++) levels.push(0);
    var rafId = null;

    /* ---------- AUDIO ANALYSER ----------
       Browsers block the analyser when a page is opened by
       double-clicking the file (file://), because the song counts
       as a "different website". The analyser would also MUTE the
       song there. So we only use it on a real web server (http/https,
       like Neocities, GitHub Pages or Live Server). On a local file we
       use a simulated equalizer that still follows play/pause. */
    var canAnalyse = location.protocol === "http:" || location.protocol === "https:";
    var audioCtx = null;
    var analyser = null;
    var freqData = null;

    function setupAnalyser() {
        if (!canAnalyse || audioCtx) return;
        try {
            var AC = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AC();
            analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;                  // 128 pitch slices
            analyser.smoothingTimeConstant = 0.75;   // 0 = jumpy, 1 = sluggish
            var source = audioCtx.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);  // so we can still hear it
            freqData = new Uint8Array(analyser.frequencyBinCount);
        } catch (err) {
            audioCtx = null;
            analyser = null;                         // fall back to simulation
        }
    }

    // Which pitch slices belong to bar number i (low pitches get fewer slices)
    function binEdge(i) {
        return Math.floor(1 + Math.pow(i / BARS, 1.7) * 60);
    }

    function readLevelsFromAnalyser() {
        analyser.getByteFrequencyData(freqData);
        for (var b = 0; b < BARS; b++) {
            var from = binEdge(b);
            var to = Math.max(binEdge(b + 1), from + 1);
            var sum = 0;
            for (var k = from; k < to; k++) sum += freqData[k];
            var avg = sum / (to - from) / 255;       // 0 to 1
            avg = Math.pow(avg, 1.4) * 1.25;         // make the dance more dramatic
            levels[b] = Math.min(1, avg);
        }
    }

    // Fake equalizer for local files: sine waves + a beat, tied to the song time
    function simulateLevels() {
        var t = audio.currentTime;
        var beat = Math.pow(Math.abs(Math.sin(t * Math.PI * 2.6)), 6);   // a pulse ~2.6 per second
        for (var b = 0; b < BARS; b++) {
            var wobble = 0.5 + 0.5 * Math.sin(t * (2.2 + b * 0.55) + b * 1.7);
            var target = 0.15 + 0.55 * wobble + 0.3 * beat * (1 - b / BARS);
            levels[b] += (Math.min(1, target) - levels[b]) * 0.35;       // ease toward it
        }
    }

    // Bars sink down when the music is paused
    function decayLevels() {
        for (var b = 0; b < BARS; b++) levels[b] *= 0.85;
    }

    function drawBars() {
        var w = canvas.width;
        var h = canvas.height;
        var blocks = Math.floor(h / (BLOCK_H + BLOCK_GAP));
        var colW = w / BARS;
        var barW = colW - 4;

        ctx.clearRect(0, 0, w, h);

        for (var b = 0; b < BARS; b++) {
            var lit = Math.round(levels[b] * blocks);
            for (var n = 0; n < blocks; n++) {
                var y = h - (n + 1) * (BLOCK_H + BLOCK_GAP);
                if (n < lit) {
                    // top two lit blocks turn red, like an old LED meter
                    ctx.fillStyle = n >= blocks - 3 ? "#d6283f" : "#f7ff3c";
                } else {
                    ctx.fillStyle = "rgba(247, 255, 60, 0.07)";   // switched-off block
                }
                ctx.fillRect(Math.round(b * colW + 2), y, Math.round(barW), BLOCK_H);
            }
        }
    }

    // The animation loop. It runs while music plays, and until the bars sink.
    function loop() {
        if (!audio.paused && !audio.ended) {
            if (analyser) {
                readLevelsFromAnalyser();
            } else {
                simulateLevels();
            }
        } else {
            decayLevels();
        }

        drawBars();

        var maxLevel = Math.max.apply(null, levels);
        if (!audio.paused || maxLevel > 0.02) {
            rafId = requestAnimationFrame(loop);
        } else {
            rafId = null;                            // fully sunk, stop drawing
            for (var b = 0; b < BARS; b++) levels[b] = 0;
            drawBars();
        }
    }

    function startLoop() {
        if (!rafId) rafId = requestAnimationFrame(loop);
    }

    /* ---------- PLAYER ---------- */
    function formatTime(sec) {
        if (!isFinite(sec)) return "0:00";
        var m = Math.floor(sec / 60);
        var s = Math.floor(sec % 60);
        return m + ":" + (s < 10 ? "0" + s : s);
    }

    function updateTime() {
        var dur = audio.duration;
        timeText.textContent = formatTime(audio.currentTime) + " / " + formatTime(dur);
        if (!seeking && isFinite(dur) && dur > 0) {
            seek.value = Math.round(audio.currentTime / dur * 1000);
        }
    }

    function currentTitle() {
        return trackBtns[current].getAttribute("data-title");
    }

    function updateScreen() {
        if (!audio.paused) {
            screen.textContent = "Now playing: " + currentTitle();
        } else if (audio.currentTime > 0) {
            screen.textContent = "Paused - " + currentTitle();
        } else {
            screen.textContent = "Ready - " + currentTitle();
        }
    }

    // With a long playlist, scroll the list so the selected song is always in view
    function keepTrackVisible(btn) {
        var list = btn.parentNode;
        if (btn.offsetTop < list.scrollTop) {
            list.scrollTop = btn.offsetTop - 8;
        } else if (btn.offsetTop + btn.offsetHeight > list.scrollTop + list.clientHeight) {
            list.scrollTop = btn.offsetTop + btn.offsetHeight - list.clientHeight + 8;
        }
    }

    function loadTrack(index) {
        current = index;
        for (var j = 0; j < trackBtns.length; j++) {
            trackBtns[j].classList.toggle("is-active", j === index);
        }
        keepTrackVisible(trackBtns[index]);
        audio.src = trackBtns[index].getAttribute("data-src");
        audio.load();
        seek.value = 0;
        updateTime();
    }

    function play() {
        setupAnalyser();                              // must happen after a click
        if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();

        var promise = audio.play();
        if (promise && promise.catch) {
            promise.catch(function (err) {
                // NotSupportedError = the file itself is the problem (the "error" event above shows it)
                // Other errors (like NotAllowedError) mean the browser wanted a click first
                if (err && err.name !== "NotSupportedError") {
                    screen.textContent = "Press Play again to start " + currentTitle();
                }
            });
        }
    }

    function pause() {
        audio.pause();
    }

    function stop() {
        audio.pause();
        audio.currentTime = 0;
        updateTime();
        updateScreen();
    }

    // Audio element events keep the buttons and screen in sync
    audio.addEventListener("play", function () {
        playBtn.textContent = "Pause";
        updateScreen();
        startLoop();
    });

    audio.addEventListener("pause", function () {
        playBtn.textContent = "Play";
        updateScreen();
        startLoop();                                  // lets the bars sink smoothly
    });

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);

    // when a song ends, go to the next one (and loop back to the first)
    audio.addEventListener("ended", function () {
        loadTrack((current + 1) % trackBtns.length);
        play();
    });

    // Browsers use the SAME error for a missing file, an empty (0 KB) file,
    // and a file that is not really an mp3, so the message lists all three.
    audio.addEventListener("error", function () {
        var code = audio.error ? audio.error.code : "?";
        screen.textContent = "Can't load " + trackBtns[current].getAttribute("data-src") +
            " (error " + code + ")";

        // Full details for debugging: press F12 and open the Console tab
        console.log("AUDIO ERROR | code:", code,
            "| message:", audio.error ? audio.error.message : "none",
            "| tried to load:", audio.currentSrc || audio.src);
    });

    /* ---------- CONTROLS ---------- */
    playBtn.addEventListener("click", function () {
        if (audio.paused) { play(); } else { pause(); }
    });

    stopBtn.addEventListener("click", stop);

    volume.addEventListener("input", function () {
        audio.volume = volume.value / 100;
    });
    audio.volume = volume.value / 100;

    // seek slider: jump to a spot in the song
    seek.addEventListener("input", function () {
        seeking = true;
        if (isFinite(audio.duration)) {
            timeText.textContent =
                formatTime(seek.value / 1000 * audio.duration) + " / " + formatTime(audio.duration);
        }
    });
    seek.addEventListener("change", function () {
        if (isFinite(audio.duration)) {
            audio.currentTime = seek.value / 1000 * audio.duration;
        }
        seeking = false;
    });

    // song buttons
    for (var t = 0; t < trackBtns.length; t++) {
        trackBtns[t].addEventListener("click", function () {
            var wasPlaying = !audio.paused;
            loadTrack(Array.prototype.indexOf.call(trackBtns, this));
            if (wasPlaying) { play(); } else { updateScreen(); }
        });
    }

    // first song is loaded but not playing
    loadTrack(0);
    updateScreen();
    drawBars();

    // let initNav() pause the music when the visitor leaves this page
    musicPlayer = { pause: pause };
}
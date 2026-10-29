/**
 * INVITATION INTERACTIONS
 * -----------------------
 * This file controls the opening, music, scratch card, gallery, countdown,
 * reveal animations, and demo RSVP state. Client content lives in config.js.
 */
 
 document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("dragstart", (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
  }
});

(function () {
  "use strict";

  const config = window.INVITATION_CONFIG;

  if (!config) {
    throw new Error("Invitation config was not loaded. Check assets/js/config.js.");
  }

  let prepareScratchCanvas = null;

  const select = (selector, root = document) => root.querySelector(selector);
  const selectAll = (selector, root = document) => [...root.querySelectorAll(selector)];

  function getValue(path) {
    return path.split(".").reduce((value, key) => value?.[key], config);
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    return element;
  }

  function setName(element, personInfo) {
    if (!element || !personInfo) return;
    const fullName = personInfo.name || "";
    const sName = personInfo.shortName || fullName.split(" ")[0] || "";
    const remaining = fullName.replace(sName, "").trim();
    
    const firstNameElement = createElement("span", "", sName);
    element.replaceChildren(firstNameElement, remaining ? ` ${remaining}` : "");
  }

  function setCoupleNames(element) {
    if (!element) return;
    const groomName = config.couple.groom.shortName || config.couple.groom.name.split(" ")[0];
    const brideName = config.couple.bride.shortName || config.couple.bride.name.split(" ")[0];
    
    element.replaceChildren(
      document.createTextNode(groomName),
      document.createTextNode(" "),
      createElement("span", "", "&"),
      document.createTextNode(" "),
      document.createTextNode(brideName)
    );
  }

  function applyConfig() {
    document.title = config.site.title;

    const description = select('meta[name="description"]');
    const ogTitle = select('meta[property="og:title"]');
    const ogDescription = select('meta[property="og:description"]');

    description?.setAttribute("content", config.site.description);
    ogTitle?.setAttribute("content", config.site.title);
    ogDescription?.setAttribute("content", config.site.description);

    const root = document.documentElement;

    Object.entries(config.theme).forEach(([name, value]) => {
      root.style.setProperty(`--${name}`, value);
    });

    selectAll("[data-bind]").forEach((element) => {
      const value = getValue(element.dataset.bind);
      element.textContent = value ?? "";
    });

    setName(select("#groomName"), config.couple.groom);
    setName(select("#brideName"), config.couple.bride);
    setCoupleNames(select("#welcomeSignature"));
    setCoupleNames(select("#closingNames"));

    const closingDetails = select("#closingDetails");
    if (closingDetails) {
      closingDetails.textContent =
        `${config.wedding.day}, ${config.wedding.date} · ${config.venue.name}`;
    }

    const mapLink = select("#mapLink");
    if (mapLink) {
      mapLink.href = config.venue.mapUrl;
    }

    // Personalized guest greeting: supports ?to=Guest+Name or ?guest=Guest+Name
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("to") || urlParams.get("guest");
    const guestEl = select("#guestNameDisplay");
    if (guestEl && guestParam && guestParam.trim()) {
      guestEl.textContent = guestParam.trim();
    }

    const audio = select("#backgroundMusic");
    const video = select("#introVideo");
    const videoSource = select("#introVideoSource");

    if (audio) audio.src = config.media.music;
    if (video) {
      video.poster = config.media.introPoster;
      video.src = config.media.introVideo;
      if (videoSource) videoSource.src = config.media.introVideo;
      video.load();
    }

    renderProgram();
    renderPreWeddingEvents();
    renderDressPalette();
    renderGallery();
  }

  function renderProgram() {
    const timeline = select("#programTimeline");
    if (!timeline) return;
    timeline.innerHTML = "";

    config.program.forEach((item, index) => {
      const article = createElement("article");
      const number = createElement(
        "span",
        "timeline-index",
        String(index + 1).padStart(2, "0"),
      );
      const time = createElement("time", "", item.time);
      const details = createElement("div");

      details.append(
        createElement("h3", "", item.title),
        createElement("p", "", item.note),
      );

      article.append(number, time, details);
      timeline.append(article);
    });
  }

function renderPreWeddingEvents() {
  const eventList = select("#preWeddingEvents");
  if (!eventList) return;
  eventList.innerHTML = "";

  const events = config.occasions || config.preWeddingEvents || [];

  events.forEach((event) => {
    const article = createElement("article");

    if (event.badge) {
      const badge = createElement("span", "event-badge", event.badge);
      article.append(badge);
    }

    const title = createElement("h3", "", event.name);
    article.append(title);

    const dateTime = createElement("p");
    dateTime.innerHTML = `<span>${event.date}</span>`;
    article.append(dateTime);

    if (event.hijri) {
      const hijri = createElement("p", "event-hijri", event.hijri);
      article.append(hijri);
    }

    if (event.time) {
      const timeHighlight = createElement("p", "event-time-highlight", event.time);
      article.append(timeHighlight);
    }

    if (event.location) {
      const location = createElement("small", "", event.location);
      article.append(location);
    }

    if (event.mapLink) {
      const mapLink = createElement(
        "a",
        "event-map-link",
        "View on Google Maps"
      );
      mapLink.href = event.mapLink;
      mapLink.target = "_blank";
      mapLink.rel = "noreferrer";
      article.append(mapLink);
    }

    eventList.append(article);
  });
}

  function renderDressPalette() {
    const palette = select("#dressPalette");
    if (!palette || !config.dressCode || !config.dressCode.swatches) return;
    palette.innerHTML = "";

    config.dressCode.swatches.forEach((color, index) => {
      const swatch = createElement("i");
      swatch.style.background = color;
      swatch.style.setProperty("--swatch-delay", `${index * 0.08}s`);
      palette.append(swatch);
    });
  }
let activeSlide = 0;
let galleryTimer;
let touchStartX = 0;
let touchStartY = 0;

function renderGallery() {
  const slides = select("#gallerySlides");
  const dots = select("#galleryDots");
  if (!slides || !dots || !config.media || !config.media.gallery) return;
  slides.innerHTML = "";
  dots.innerHTML = "";

  config.media.gallery.forEach((image, index) => {
    const figure = createElement(
      "figure",
      `gallery-slide${index === 0 ? " is-active" : ""}`,
    );

    const photo = createElement("img");

    photo.src = image.src;
    photo.alt = image.alt;
    photo.loading = index === 0 ? "eager" : "lazy";

    figure.append(
      photo,
      createElement("figcaption", "", image.caption)
    );

    slides.append(figure);

    const dot = createElement(
      "button",
      index === 0 ? "is-active" : ""
    );

    dot.type = "button";
    dot.setAttribute("aria-label", `Show image ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));

    dots.append(dot);
  });

  const frame = select("#galleryFrame");
  if (!frame) return;

  frame.addEventListener("pointerdown", (event) => {
    touchStartX = event.clientX;
    touchStartY = event.clientY;
  });

  frame.addEventListener("pointerup", (event) => {
    const distanceX = touchStartX - event.clientX;
    const distanceY = touchStartY - event.clientY;

    /* Horizontal swipe */
    if (Math.abs(distanceX) >= 45) {
      showSlide(
        distanceX > 0
          ? (activeSlide + 1) % config.media.gallery.length
          : (activeSlide - 1 + config.media.gallery.length) %
              config.media.gallery.length
      );

      return;
    }

    /* Ignore vertical page scrolling */
    if (Math.abs(distanceY) > 20) return;

    /* Tap anywhere on image = next */
    showSlide(
      (activeSlide + 1) % config.media.gallery.length
    );
  });

  galleryTimer = window.setInterval(() => {
    showSlide(
      (activeSlide + 1) % config.media.gallery.length
    );
  }, 5200);
}

function showSlide(index) {
  activeSlide = index;

  selectAll(".gallery-slide").forEach((slide, slideIndex) => {
    slide.classList.toggle(
      "is-active",
      slideIndex === index
    );
  });

  selectAll("#galleryDots button").forEach((dot, dotIndex) => {
    dot.classList.toggle(
      "is-active",
      dotIndex === index
    );

    dot.toggleAttribute(
      "aria-current",
      dotIndex === index
    );
  });
} 
  function updateMusicControl() {
  const audio = select("#backgroundMusic");
  const button = select("#musicToggle");
  const label = select("#musicLabel");
  const playing = !audio.paused;

  button.classList.toggle("is-playing", playing);
  button.setAttribute(
    "aria-label",
    playing ? "Pause background music" : "Play background music",
  );
  label.textContent = playing ? "Music" : "Music";
}

  function initializeOpening() {
    const hero = select("#hero");
    const video = select("#introVideo");
    let opened = false;

    function openInvitation() {
      if (opened) {
        hero.classList.add("show-content-now");
        return;
      }

      opened = true;
      hero.classList.remove("is-closed");
      hero.classList.add("is-open");
      hero.removeAttribute("role");
      hero.removeAttribute("aria-label");
      hero.tabIndex = -1;
      const openingMark = select("#openingMark");
      if (openingMark) openingMark.setAttribute("aria-hidden", "true");
      document.body.classList.remove("intro-locked");

      if (video) {
        video.muted = true;
        video.volume = 0;
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Video play error/blocked:", err);
            hero.classList.add("show-content-now");
          });
        }
        video.addEventListener("ended", () => {
          hero.classList.add("show-content-now");
        }, { once: true });

        setTimeout(() => {
          hero.classList.add("show-content-now");
        }, 8500);
      } else {
        hero.classList.add("show-content-now");
      }

      if (typeof prepareScratchCanvas === "function") {
        prepareScratchCanvas();
      }

      const audio = select("#backgroundMusic");
      if (audio) {
        audio.play()
          .then(updateMusicControl)
          .catch(updateMusicControl);
      }
    }

    if (hero) {
      hero.addEventListener("click", openInvitation);
      hero.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") openInvitation();
      });
    }

    const scrollCue = select(".scroll-cue");
    if (scrollCue) {
      scrollCue.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    }
  }

  function initializeMusic() {
  const audio = select("#backgroundMusic");
  const button = select("#musicToggle");

  button.addEventListener("click", async (event) => {
    event.stopPropagation();

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        // Playback can fail if the music file is missing.
      }
    } else {
      audio.pause();
    }

    updateMusicControl();
  });

  audio.addEventListener("play", updateMusicControl);
  audio.addEventListener("pause", updateMusicControl);

  updateMusicControl();
}

  function initializeRevealAnimations() {
    const revealElements = selectAll(".reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.13 },
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  function initializeScratchCard() {
    const canvas = select("#scratchCanvas");
    const card = select("#scratchCard");
    const heading = select("#scratchHeading");
    const note = select("#scratchNote");
    if (!canvas || !card) return;
    let drawing = false;
    let revealed = false;

    prepareScratchCanvas = prepareCanvas;

    function prepareCanvas() {
  if (revealed || !canvas.isConnected) return;

  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = rect.width || canvas.offsetWidth || card.offsetWidth || 500;
  const height = rect.height || canvas.offsetHeight || card.offsetHeight || 312;

  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);

  const context = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  /* =========================
     BURGUNDY BASE
     ========================= */

  const gradient = context.createLinearGradient(
    0,
    0,
    width,
    height,
  );

  gradient.addColorStop(0, config.theme.ivory);
  gradient.addColorStop(0.45, config.theme.lavender);
  gradient.addColorStop(0.72, config.theme.lavender);
  gradient.addColorStop(1, config.theme.mauve);

  context.globalCompositeOperation = "source-over";
  context.globalAlpha = 1;

  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);


  /* =========================
     SOFT METALLIC SHIMMER
     ========================= */

  const shimmer = context.createLinearGradient(
    0,
    0,
    width,
    height,
  );

  shimmer.addColorStop(0, "rgba(255,255,255,0)");
  shimmer.addColorStop(0.35, "rgba(255,235,190,0.07)");
  shimmer.addColorStop(0.5, "rgba(255,255,255,0.13)");
  shimmer.addColorStop(0.65, "rgba(255,220,160,0.06)");
  shimmer.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = shimmer;
  context.fillRect(0, 0, width, height);


  /* =========================
     FINE GOLD GLITTER
     ========================= */

  const glitterCount = Math.min(
    1100,
    Math.round((width * height) / 120),
  );

  for (let i = 0; i < glitterCount; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;

    const size = 0.25 + Math.random() * 1.15;
    const brightness = 0.15 + Math.random() * 0.55;

    context.globalAlpha = brightness;

    /*
      Mostly champagne,
      with occasional ivory sparkles.
    */
    context.fillStyle =
      Math.random() > 0.18
        ? config.theme.champagne
        : config.theme.ivory;

    context.beginPath();
    context.arc(
      x,
      y,
      size,
      0,
      Math.PI * 2,
    );
    context.fill();
  }


  /* =========================
     SMALL BRIGHT SPARKLES
     ========================= */

  const sparkleCount = Math.max(
    20,
    Math.round(width / 12),
  );

  for (let i = 0; i < sparkleCount; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;

    const size = 1 + Math.random() * 2.1;

    context.globalAlpha =
      0.3 + Math.random() * 0.5;

    context.strokeStyle =
      Math.random() > 0.25
        ? config.theme.champagne
        : config.theme.ivory;

    context.lineWidth = 0.55;

    context.beginPath();

    /* horizontal glint */
    context.moveTo(x - size, y);
    context.lineTo(x + size, y);

    /* vertical glint */
    context.moveTo(x, y - size);
    context.lineTo(x, y + size);

    context.stroke();
  }


  /* =========================
     VERY FINE TEXTURE
     ========================= */

  for (let i = 0; i < 350; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;

    context.globalAlpha =
      0.06 + Math.random() * 0.1;

    context.fillStyle = config.theme.ivory;

    context.fillRect(
      x,
      y,
      Math.random() * 0.7 + 0.15,
      Math.random() * 0.7 + 0.15,
    );
  }

  /* reset */
  context.globalAlpha = 1;


  /* =========================
     SCRATCHING MODE
     ========================= */

  context.globalCompositeOperation = "destination-out";

  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 42;

  card.classList.add("is-ready");
}

    function pointerPosition(event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    function beginScratch(event) {
      if (revealed) return;

      drawing = true;
      canvas.setPointerCapture(event.pointerId);

      const position = pointerPosition(event);
      const context = canvas.getContext("2d", { willReadFrequently: true });

      context.beginPath();
      context.moveTo(position.x, position.y);
    }

    function continueScratch(event) {
      if (!drawing || revealed) return;

      const position = pointerPosition(event);
      const context = canvas.getContext("2d", { willReadFrequently: true });

      context.lineTo(position.x, position.y);
      context.stroke();

      if (scratchCompletion(context) > 0.42) finishReveal();
    }

    function scratchCompletion(context) {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentSamples = 0;
      let totalSamples = 0;

      for (let alphaIndex = 3; alphaIndex < pixels.length; alphaIndex += 64) {
        totalSamples += 1;
        if (pixels[alphaIndex] < 30) transparentSamples += 1;
      }

      return transparentSamples / totalSamples;
    }

    function finishReveal() {
      if (revealed) return;

      revealed = true;
      drawing = false;

      // Keep both classes: is-revealed handles celebration styling, while
      // is-visible prevents the scroll-reveal animation from hiding the card.
      card.classList.add("is-revealed", "is-visible");
      heading.textContent = "Our Forever Begins";
      note.textContent =
        "Tuesday, 8th December, 2026 — Jashn Banquet Hall, Kurla (W), Mumbai";
      canvas.remove();
      createPetalShower();
    }

    canvas.addEventListener("pointerdown", beginScratch);
    canvas.addEventListener("pointermove", continueScratch);
    canvas.addEventListener("pointerup", () => {
      drawing = false;
    });
    canvas.addEventListener("pointercancel", () => {
      drawing = false;
    });
    canvas.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") finishReveal();
    });

    prepareCanvas();
    window.addEventListener("resize", prepareCanvas);
  }

function createPetalShower() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  document.querySelector(".petal-shower")?.remove();

  const shower = createElement("div", "petal-shower");
  shower.setAttribute("aria-hidden", "true");

  const rootStyles = getComputedStyle(document.documentElement);

  const mauve =
    rootStyles.getPropertyValue("--mauve").trim() || "#A51520";

  const lavender =
    rootStyles.getPropertyValue("--lavender").trim() || "#6F0B17";

  const champagne =
    rootStyles.getPropertyValue("--champagne").trim() || "#C9A35F";

  const colors = [
    mauve,
    lavender,
    mauve,
    lavender,
    mauve,
    champagne,
  ];

  const shapes = [
    "80% 20% 70% 30% / 65% 35% 65% 35%",
    "70% 30% 85% 15% / 55% 45% 70% 30%",
    "90% 10% 60% 40% / 70% 30% 80% 20%",
    "60% 40% 75% 25% / 80% 20% 60% 40%",
  ];

  const random = (min, max) =>
    Math.random() * (max - min) + min;

  const randomItem = (items) =>
    items[Math.floor(Math.random() * items.length)];

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const petalCount = Math.min(
    60,
    Math.max(38, Math.round(viewportWidth / 9)),
  );

  const petals = [];

  for (let index = 0; index < petalCount; index += 1) {
    const element = createElement("i");

    const size = random(7, 14);

    const x = random(-25, viewportWidth + 25);
    const y = random(-100, -25);

    const rotation = random(0, 360);
    const rotationX = random(0, 360);
    const rotationY = random(0, 360);

    const scale = random(0.65, 1.2);

    element.style.width = `${size}px`;
    element.style.height = `${size * random(1.2, 1.7)}px`;

    element.style.background = randomItem(colors);
    element.style.borderRadius = randomItem(shapes);

    /*
      Important:
      Put the petal in its real starting position BEFORE
      it gets inserted into the document.
    */
    element.style.opacity = "0";

    element.style.transform = `
      translate3d(${x}px, ${y}px, 0)
      rotate(${rotation}deg)
      rotateX(${rotationX}deg)
      rotateY(${rotationY}deg)
      scale(${scale})
    `;

    shower.append(element);

    petals.push({
      element,

      x,
      y,

      vx: random(-30, 30),
      vy: random(65, 120),

      gravity: random(12, 26),

      wind: random(-8, 8),

      sway: random(15, 55),
      swaySpeed: random(1.4, 3.5),
      swayPhase: random(0, Math.PI * 2),

      rotation,
      rotationX,
      rotationY,

      spin: random(-220, 220),
      spinX: random(-190, 190),
      spinY: random(-260, 260),

      scale,
      baseOpacity: random(0.55, 0.9),

      delay: random(0, 700),

      lifetime: random(5800, 8600),
    });
  }

  /*
    Append only after every petal already has
    its initial position and opacity.
  */
  document.body.append(shower);

  let startTime = null;
  let previousTime = null;

  function animate(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
      previousTime = currentTime;
    }

    const elapsed = currentTime - startTime;

    const delta = Math.min(
      (currentTime - previousTime) / 1000,
      0.032,
    );

    previousTime = currentTime;

    petals.forEach((petal) => {
      /*
        Keep delayed petals completely invisible.
      */
      if (elapsed < petal.delay) {
        petal.element.style.opacity = "0";
        return;
      }

      const age = elapsed - petal.delay;

      if (age >= petal.lifetime) {
        petal.element.style.display = "none";
        return;
      }

      const time = age / 1000;

      petal.vy += petal.gravity * delta;

      petal.vx +=
        Math.sin(
          time * 0.75 + petal.swayPhase,
        ) *
        petal.wind *
        delta;

      petal.x += petal.vx * delta;
      petal.y += petal.vy * delta;

      petal.rotation += petal.spin * delta;
      petal.rotationX += petal.spinX * delta;
      petal.rotationY += petal.spinY * delta;

      const sway =
        Math.sin(
          time * petal.swaySpeed + petal.swayPhase,
        ) * petal.sway;

      const flutterY =
        Math.sin(
          time * petal.swaySpeed * 2.2 +
          petal.swayPhase,
        ) * 5;

      const flip =
        0.35 +
        Math.abs(
          Math.cos(
            time * petal.swaySpeed * 1.8 +
            petal.swayPhase,
          ),
        ) *
          0.65;

      /*
        Soft fade-in.
        Prevents petals popping into existence.
      */
      const fadeInDuration = 250;

      let opacity =
        petal.baseOpacity *
        Math.min(1, age / fadeInDuration);

      const fadeStart = viewportHeight * 0.82;

      if (petal.y > fadeStart) {
        const bottomFade =
          1 -
          (petal.y - fadeStart) /
            (viewportHeight + 100 - fadeStart);

        opacity *= Math.max(0, bottomFade);
      }

      if (age > petal.lifetime * 0.82) {
        const lifeFade =
          1 -
          (age - petal.lifetime * 0.82) /
            (petal.lifetime * 0.18);

        opacity *= Math.max(0, lifeFade);
      }

      petal.element.style.opacity =
        Math.max(0, opacity);

      petal.element.style.transform = `
        translate3d(
          ${petal.x + sway}px,
          ${petal.y + flutterY}px,
          0
        )
        rotate(${petal.rotation}deg)
        rotateX(${petal.rotationX}deg)
        rotateY(${petal.rotationY}deg)
        scale(${petal.scale})
        scaleX(${flip})
      `;

      if (petal.y > viewportHeight + 120) {
        petal.element.style.display = "none";
      }
    });

    if (elapsed < 10000) {
      requestAnimationFrame(animate);
    } else {
      shower.remove();
    }
  }

  requestAnimationFrame(animate);
}

  function initializeCountdown() {
    const targetDate = new Date(config.wedding.isoDate).getTime();

    function updateCountdown() {
      const difference = Math.max(0, targetDate - Date.now());
      const values = {
        countdownDays: Math.floor(difference / 86400000),
        countdownHours: Math.floor((difference / 3600000) % 24),
        countdownMinutes: Math.floor((difference / 60000) % 60),
        countdownSeconds: Math.floor((difference / 1000) % 60),
      };

      Object.entries(values).forEach(([id, value]) => {
        select(`#${id}`).textContent = String(value).padStart(2, "0");
      });
    }

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  function prepareRsvpFields() {
    select("#rsvpName").placeholder = config.rsvp.fields.name;
    select("#rsvpEmail").placeholder = config.rsvp.fields.email;
    select("#rsvpNote").placeholder = config.rsvp.fields.note;

    const attendance = select("#rsvpAttendance");
    const prompt = createElement("option", "", "Select your response");

    prompt.value = "";
    prompt.disabled = true;
    prompt.selected = true;
    attendance.append(prompt);

    config.rsvp.fields.attendance.forEach((option) => {
      attendance.append(createElement("option", "", option));
    });

    const guests = select("#rsvpGuests");

    config.rsvp.fields.guests.forEach((option) => {
      guests.append(createElement("option", "", option));
    });
  }

  function initializeRsvp() {
    const form = select("#rsvpForm");
    const success = select("#rsvpSuccess");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.hidden = true;
      success.hidden = false;
      success.classList.add("is-visible");
    });

    select("#editRsvp").addEventListener("click", () => {
      success.hidden = true;
      form.hidden = false;
    });
  }

  function initialize() {
    applyConfig();
    initializeOpening();
    initializeMusic();
    initializeRevealAnimations();
    initializeScratchCard();
    initializeCountdown();
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();

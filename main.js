(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const CAT = { film: "Film", gaming: "Gaming", streaming: "Streaming", licensing: "Licensing" };
  const P = window.PROJECTS || [];
  const pad = (i) => String(i + 1).padStart(2, "0");
  const slug = (p) => (p.brand + "-" + p.ip).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Header */
  const hdr = $("#hdr");
  const onScroll = () => hdr.classList.toggle("scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const nav = $("#nav"), menuBtn = $("#menuBtn");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open); menuBtn.textContent = open ? "Close" : "Menu";
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); menuBtn.textContent = "Menu"; }));
  $("#workCount").textContent = P.length;
  const clock = $("#clock");
  const tick = () => { clock.textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Singapore" }).format(new Date()); };
  tick(); setInterval(tick, 30000);

  /* Filters */
  const cats = ["all", ...new Set(P.map((p) => p.category))];
  $("#filters").innerHTML = cats.map((c) => {
    const n = c === "all" ? P.length : P.filter((p) => p.category === c).length;
    return `<button data-f="${c}" class="${c === "all" ? "is-on" : ""}" aria-pressed="${c === "all"}">${c === "all" ? "All" : CAT[c] || c}<sup>${n}</sup></button>`;
  }).join("");

  /* Carousel: a filmstrip of every project, images at natural proportions */
  const track = $("#carTrack");
  const H = P.map((p, i) => [p, i]).filter(([p]) => p.highlight);
  track.innerHTML = (H.length ? H : P.map((p, i) => [p, i])).map(([p, i], k) => `
    <a class="slide" href="#project/${slug(p)}" aria-label="${esc(p.brand)} × ${esc(p.ip)}">
      <span class="slide-m">${p.video
        ? `<video src="${esc(p.video)}" poster="${esc(p.images[p.images.findIndex((s) => s.startsWith("assets/video/"))] || p.images[0])}" muted loop playsinline ${k === 0 ? "autoplay" : 'preload="none"'}></video>`
        : `<img src="${esc(p.images[0])}" alt="" ${k > 2 ? 'loading="lazy"' : ""}>`}</span>
      <span class="cap"><span class="mono n">${pad(i)}</span><span class="h">${esc(p.brand)}<i>×</i>${esc(p.ip)}</span><span class="mono d">${esc(CAT[p.category] || p.category)}</span></span>
    </a>`).join("");
  const slides = $$(".slide", track);
  let si = 0, auto;
  const near = () => { let best = 0, d = Infinity; slides.forEach((s, k) => { const v = Math.abs(s.offsetLeft - track.scrollLeft - slides[0].offsetLeft); if (v < d) { d = v; best = k; } }); return best; };
  const setUI = () => {
    $("#carCount").textContent = `${pad(si)} / ${pad(slides.length - 1)}`;
    $("#carBar").style.width = ((si + 1) / slides.length) * 100 + "%";
    slides.forEach((s, k) => { const v = $("video", s); if (!v) return; if (k === si) v.play().catch(() => {}); else v.pause(); });
  };
  const goSlide = (k) => {
    si = (k + slides.length) % slides.length;
    driving = Date.now() + 900;
    track.scrollTo({ left: slides[si].offsetLeft - slides[0].offsetLeft, behavior: reduced ? "auto" : "smooth" });
    setUI();
  };
  $("#carPrev").addEventListener("click", () => { goSlide(si - 1); restart(); });
  $("#carNext").addEventListener("click", () => { goSlide(si + 1); restart(); });
  // Sync the counter when someone swipes; ignore our own button-driven scrolls,
  // and at the far end (where the last slides can't reach the left edge) keep the chosen slide.
  let st, driving = 0;
  track.addEventListener("scroll", () => {
    clearTimeout(st);
    st = setTimeout(() => {
      if (Date.now() < driving) return;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      const n = near(); si = atEnd ? Math.max(si, n) : n; setUI();
    }, 80);
  }, { passive: true });
  const restart = () => { clearInterval(auto); if (!reduced) auto = setInterval(() => { if (!hoverCar && inView) goSlide(si + 1); }, 4500); };
  let hoverCar = false, inView = false;
  $("#carousel").addEventListener("mouseenter", () => (hoverCar = true));
  $("#carousel").addEventListener("mouseleave", () => (hoverCar = false));
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { inView = e.isIntersecting; }).observe(track);
  track.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { e.preventDefault(); goSlide(si + 1); restart(); } if (e.key === "ArrowLeft") { e.preventDefault(); goSlide(si - 1); restart(); } });
  setUI(); restart();

  /* Grid view: editorial layout, images at natural proportions */
  const grid = $("#grid");
  grid.innerHTML = P.map((p, i) => `
    <a class="item rv" href="#project/${slug(p)}" data-i="${i}" data-cat="${esc(p.category)}">
      <div class="media">
        <img src="${esc(p.cover || p.images[0])}" alt="${esc(p.brand)} × ${esc(p.ip)}" loading="lazy">
        ${p.video ? `<video src="${esc(p.video)}" muted loop playsinline preload="none"></video>` : ""}
      </div>
      <div class="cap">
        <span class="mono n">${pad(i)}</span>
        <h3>${esc(p.brand)}<i>×</i>${esc(p.ip)}</h3>
        <span class="mono d">${esc(CAT[p.category] || p.category)}</span>
      </div>
    </a>`).join("") + `
    <a class="item-cta rv" href="#contact">
      <span class="mono muted">Next project</span>
      <strong>Your brand<i>×</i>the next big IP</strong>
      <span class="mono">Start a project →</span>
    </a>`;

  // Column placements cycle in pairs: [grid-column, offset-top in vw]
  const LAYOUT = [["1 / span 7", 0], ["9 / span 4", 10], ["2 / span 4", 0], ["7 / span 6", 6], ["1 / span 5", 5], ["7 / span 6", 0]];
  const layout = () => {
    $$(".item:not(.hide), .item-cta", grid).forEach((el, k) => {
      const [col, mt] = LAYOUT[k % LAYOUT.length];
      el.style.gridColumn = col; el.style.marginTop = mt ? mt + "vw" : "0";
    });
  };
  layout();

  if (fine) {
    $$(".item", grid).forEach((el) => {
      const v = $("video", el); if (!v) return;
      el.addEventListener("mouseenter", () => v.play().catch(() => {}));
      el.addEventListener("mouseleave", () => v.pause());
    });
  }

  /* Index view */
  const list = $("#indexList");
  list.innerHTML = P.map((p, i) => `
    <li><a class="row" href="#project/${slug(p)}" data-i="${i}" data-cat="${esc(p.category)}">
      <span class="mono">${pad(i)}</span>
      <span class="b">${esc(p.brand)}</span>
      <span class="p">${esc(p.ip)}</span>
      <span class="mono">${esc(CAT[p.category] || p.category)}</span>
      <span class="mono">${esc((p.tags || []).slice(1).join(", "))}</span>
    </a></li>`).join("");

  const hoverImg = $("#hoverImg"), hoverImgEl = $("img", hoverImg);
  $$(".row", list).forEach((r) => {
    r.addEventListener("mouseenter", () => { hoverImgEl.src = P[r.dataset.i].images[0]; hoverImg.classList.add("on"); });
    r.addEventListener("mouseleave", () => hoverImg.classList.remove("on"));
  });

  $$(".views button").forEach((b) => b.addEventListener("click", () => {
    $$(".views button").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", x === b); });
    const idx = b.dataset.view === "index";
    $("#index").hidden = !idx; grid.hidden = idx;
  }));

  $$("#filters button").forEach((b) => b.addEventListener("click", () => {
    $$("#filters button").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", x === b); });
    const f = b.dataset.f;
    $$(".item, .row").forEach((el) => el.classList.toggle("hide", f !== "all" && el.dataset.cat !== f));
    layout();
  }));

  /* Cursor + floating index image follow the pointer */
  const cursor = $("#cursor");
  if (fine) {
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      cursor.style.left = cx + "px"; cursor.style.top = cy + "px";
      hoverImg.style.left = cx + "px"; hoverImg.style.top = cy + "px";
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", (e) => cursor.classList.toggle("on", !!e.target.closest(".item, .row, .prod-item, .slide")));
  }

  /* Products & activations gallery: each tile opens its project */
  $("#prod").innerHTML = (window.PRODUCTS || []).map((d) => {
    const i = P.findIndex((p) => p.brand === d.project);
    const href = i > -1 ? `#project/${slug(P[i])}` : "#work";
    return `<li class="${d.wide ? "wide" : ""}${d.fill ? " fill" : ""}"><a href="${href}" class="prod-item">
      <span class="prod-media"><img src="${esc(d.img)}" alt="${esc(d.label)}" loading="lazy"></span>
      <span class="cap"><span class="mono n">${esc(d.project)}</span><span>${esc(d.label)}</span></span>
    </a></li>`;
  }).join("");
  $("#partnerCount").textContent = `${(window.PARTNERS || []).length} partners`;

  /* Logos */
  $("#logoGrid").innerHTML = (window.PARTNERS || []).map((n) => `<li><img src="assets/logos/${n}.png" alt="${esc(n.replace(/-/g, " "))}" loading="lazy"></li>`).join("");

  /* Services accordion */
  $$(".svc-row").forEach((btn) => btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", open);
    btn.nextElementSibling.hidden = !open;
  }));

  /* Case study page */
  const box = $("#case"), inner = $("#caseInner");
  let cur = -1, lastFocus = null;
  const render = (i) => {
    const p = P[i]; cur = i;
    const imgs = p.images.filter((s) => !(p.video && s.startsWith("assets/video/")));
    const first = p.video
      ? `<video src="${esc(p.video)}" poster="${esc(p.images[0])}" controls autoplay muted loop playsinline></video>`
      : `<img src="${esc(imgs.shift())}" alt="${esc(p.brand)} × ${esc(p.ip)}">`;
    const rest = imgs.map((s) => `<img src="${esc(s)}" alt="${esc(p.brand)} × ${esc(p.ip)}" loading="lazy">`);
    const pairs = []; for (let k = 0; k < rest.length; k += 2) pairs.push(rest.length - k === 1 ? rest[k] : `<div class="pair">${rest[k]}${rest[k + 1]}</div>`);
    const next = P[(i + 1) % P.length];
    $("#caseNo").textContent = `${pad(i)} / ${pad(P.length - 1)}`;
    inner.innerHTML = `
      <h2 class="case-title" id="caseTitle">${esc(p.brand)} <i>×</i><br>${esc(p.ip)}</h2>
      <div class="case-meta mono">
        <p><span class="k">Brand</span>${esc(p.brand)}</p>
        <p><span class="k">Property</span>${esc(p.ip)}</p>
        <p><span class="k">Discipline</span>${esc(CAT[p.category] || p.category)}</p>
        <p><span class="k">Scope</span>${(p.tags || []).map(esc).join("<br>")}</p>
        <p class="sum">${esc(p.summary)}</p>
      </div>
      <div class="case-media">${first}${pairs.join("")}</div>
      <div class="case-cta">
        <a href="#contact" data-close><span class="mono muted">Have a brief?</span><strong>Start a project like this</strong></a>
        <button data-next><span class="mono muted">Next project</span><strong>${esc(next.brand)} × ${esc(next.ip)}</strong></button>
      </div>`;
    box.scrollTop = 0;
  };
  const open = (i) => {
    if (box.hidden) { lastFocus = document.activeElement; box.hidden = false; document.body.classList.add("lock"); }
    render(i); $("#caseClose").focus({ preventScroll: true });
    cursor.classList.remove("on");
  };
  const close = (toContact) => {
    box.hidden = true; document.body.classList.remove("lock"); cur = -1;
    if (location.hash.startsWith("#project/")) history.replaceState(null, "", toContact ? "#contact" : "#work");
    if (toContact) $("#contact").scrollIntoView(); else if (lastFocus) lastFocus.focus({ preventScroll: true });
  };
  const go = (d) => { const i = (cur + d + P.length) % P.length; history.replaceState(null, "", "#project/" + slug(P[i])); render(i); };
  const fromHash = () => {
    const m = location.hash.match(/^#project\/(.+)$/);
    if (m) { const i = P.findIndex((p) => slug(p) === m[1]); if (i > -1) return open(i); }
    if (!box.hidden) close();
  };
  addEventListener("hashchange", fromHash); fromHash();
  $("#caseClose").addEventListener("click", () => close());
  $("#casePrev").addEventListener("click", () => go(-1));
  $("#caseNext").addEventListener("click", () => go(1));
  inner.addEventListener("click", (e) => {
    if (e.target.closest("[data-next]")) go(1);
    if (e.target.closest("[data-close]")) { e.preventDefault(); close(true); }
  });
  addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });

  /* Reveal on scroll */
  $$(".bar, .logo-grid, .svc, .about-cols, .big-mail, .contact-cols").forEach((el) => el.classList.add("rv"));
  if (reduced || !("IntersectionObserver" in window)) $$(".rv").forEach((el) => el.classList.add("in"));
  else {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    $$(".rv").forEach((el) => io.observe(el));
  }

  /* Contact form -> pre-filled email */
  const form = $("#form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach((f) => {
      const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.closest("label").classList.toggle("invalid", bad); if (bad) ok = false;
    });
    if (!ok) { $("#formNote").textContent = "Please add your name, a valid email and a short brief."; return; }
    const d = new FormData(form);
    const subject = `Partnership enquiry — ${d.get("company") || d.get("name")}`;
    const body = `Name: ${d.get("name")}\nCompany: ${d.get("company")}\nEmail: ${d.get("email")}\nInterested in: ${d.getAll("interest").join(", ") || "Not specified"}\n\n${d.get("message")}`;
    location.href = `mailto:connect@brandinfinity.sg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $("#formNote").textContent = "Your email app should open now. If not, write to connect@brandinfinity.sg.";
  });

  $("#year").textContent = new Date().getFullYear();
})();

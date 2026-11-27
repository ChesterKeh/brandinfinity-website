(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const CAT = { film: "Film", gaming: "Gaming", streaming: "Streaming", licensing: "Licensing" };
  const P = window.PROJECTS || [];
  const pad = (i) => String(i + 1).padStart(2, "0");
  const slug = (p) => (p.brand + "-" + p.ip).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const title = (p) => `${esc(p.brand)}<i>×</i>${esc(p.ip)}`;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const I18N = window.I18N || { t: (k, en) => (en != null ? en : k), apply() {}, set() {}, lang: "en" };
  const T = (en) => I18N.t(en, en);
  const SITE = window.SITE || {};

  /* ---------- Media frames: fill the frame when the image is close to its shape ---------- */
  const fitFrame = (img) => {
    const f = img.closest(".frame"); if (!f || !img.naturalWidth || f.dataset.fit) return;
    const r = img.naturalWidth / img.naturalHeight, fr = f.clientWidth / f.clientHeight || 4 / 3;
    f.classList.toggle("fit", Math.abs(r / fr - 1) < 0.22);
  };
  document.addEventListener("load", (e) => { if (e.target.tagName === "IMG") fitFrame(e.target); }, true);
  const fitAll = () => $$(".frame > img").forEach((i) => i.complete && fitFrame(i));
  const frame = (src, extra = "", attrs = "") => `<span class="frame ${extra}"><img src="${esc(src)}" alt="" ${attrs}></span>`;

  /* ---------- Header: light text over the hero, solid after ---------- */
  const hdr = $("#hdr"), hero = $("#hero");
  const nav = $("#nav"), menuBtn = $("#menuBtn");
  const onScroll = () => hdr.classList.toggle("on-dark", scrollY < hero.offsetHeight - 70 && !nav.classList.contains("open"));
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open); menuBtn.textContent = open ? "Close" : "Menu"; onScroll();
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); menuBtn.textContent = "Menu"; onScroll(); }));

  /* ---------- Hero montage: cycles Film → Licensing → Gaming → Streaming ---------- */
  const NOW = { film: "Roborock × The Garfield Movie", licensing: "Heinemann × Monopoly", gaming: "ZOTAC GAMING × Spider-Verse", streaming: "realme × Spider-Man: Far From Home" };
  const media = $$(".hero-media"), kws = $$(".kw");
  const keys = media.map((m) => m.dataset.key);
  let hk = 0, heroTimer, held = false;
  const show = (key) => {
    hk = keys.indexOf(key);
    media.forEach((m) => {
      const on = m.dataset.key === key; m.classList.toggle("is-on", on);
      if (m.tagName === "VIDEO") { if (on) { m.preload = "auto"; m.currentTime = 0; m.play().catch(() => {}); } else m.pause(); }
    });
    kws.forEach((k) => k.classList.toggle("is-on", k.dataset.key === key));
    $("#heroNow").textContent = NOW[key] || "";
    clearTimeout(heroTimer);
    if (!held && !reduced) heroTimer = setTimeout(next, media[hk].tagName === "VIDEO" ? 9000 : 5000);
  };
  const next = () => show(keys[(hk + 1) % keys.length]);
  media.forEach((m) => m.tagName === "VIDEO" && m.addEventListener("ended", () => !held && next()));

  /* ---------- 01 Carousel: highlighted projects ---------- */
  const H = P.map((p, i) => [p, i]).filter(([p]) => p.highlight);
  const list = H.length ? H : P.map((p, i) => [p, i]);
  const track = $("#carTrack");
  track.innerHTML = list.map(([p, i], k) => `
    <a class="slide" href="#project/${slug(p)}" data-k="${k}" aria-label="${esc(p.brand)} × ${esc(p.ip)}">
      ${p.video
        ? `<span class="frame"><video src="${esc(p.video)}" poster="${esc(p.images.find((s) => s.startsWith("assets/video/")) || p.images[0])}" muted loop playsinline preload="none"></video></span>`
        : frame(p.images[0], "", k > 1 ? 'loading="lazy"' : "")}
      <span class="slide-cap"><h3>${title(p)}</h3><span class="mono">${pad(i)} · ${esc(CAT[p.category] || p.category)}</span></span>
    </a>`).join("");
  const slides = $$(".slide", track);
  $("#carDots").innerHTML = slides.map((_, k) => `<button role="tab" aria-label="Project ${k + 1}" aria-selected="${k === 0}" data-k="${k}"></button>`).join("");
  let si = 0, driving = 0, auto, hoverCar = false, carInView = false;
  const setUI = () => {
    $("#carCount").textContent = `${pad(si)} / ${pad(slides.length - 1)}`;
    $$("#carDots button").forEach((d, k) => d.setAttribute("aria-selected", k === si));
    slides.forEach((s, k) => { const v = $("video", s); if (!v) return; if (k === si && carInView) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause(); });
  };
  const goSlide = (k) => {
    si = (k + slides.length) % slides.length; driving = Date.now() + 900;
    track.scrollTo({ left: slides[si].offsetLeft - slides[0].offsetLeft, behavior: reduced ? "auto" : "smooth" });
    setUI();
  };
  const near = () => { let best = 0, d = Infinity; slides.forEach((s, k) => { const v = Math.abs(s.offsetLeft - slides[0].offsetLeft - track.scrollLeft); if (v < d) { d = v; best = k; } }); return best; };
  let st;
  track.addEventListener("scroll", () => {
    clearTimeout(st);
    st = setTimeout(() => {
      if (Date.now() < driving) return;
      const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
      const n = near(); si = atEnd ? Math.max(si, n) : n; setUI();
    }, 80);
  }, { passive: true });
  const restart = () => { clearInterval(auto); if (!reduced) auto = setInterval(() => { if (!hoverCar && carInView) goSlide(si + 1); }, 5500); };
  $("#carPrev").addEventListener("click", () => { goSlide(si - 1); restart(); });
  $("#carNext").addEventListener("click", () => { goSlide(si + 1); restart(); });
  $("#carDots").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { goSlide(+b.dataset.k); restart(); } });
  $("#carousel").addEventListener("mouseenter", () => (hoverCar = true));
  $("#carousel").addEventListener("mouseleave", () => (hoverCar = false));
  track.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { e.preventDefault(); goSlide(si + 1); restart(); } if (e.key === "ArrowLeft") { e.preventDefault(); goSlide(si - 1); restart(); } });
  if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { carInView = e.isIntersecting; setUI(); }, { threshold: 0.3 }).observe(track);
  setUI(); restart();

  /* ---------- All projects: uniform grid + list view ---------- */
  $("#workCount").textContent = P.length;
  const grid = $("#grid");
  grid.innerHTML = P.map((p, i) => `
    <a class="tile" href="#project/${slug(p)}" data-cat="${esc(p.category)}">
      ${frame(p.cover || p.images[0], "", 'loading="lazy"')}
      <span class="tile-cap"><span class="mono n">${pad(i)}</span><h3>${title(p)}</h3><span class="mono d">${esc(CAT[p.category] || p.category)}</span></span>
    </a>`).join("") + `
    <a class="tile-cta" href="#contact"><span class="mono" data-i18n="Next project">Next project</span><strong><span data-i18n="Your brand">Your brand</span> <i>×</i> <span data-i18n="the next big IP">the next big IP</span></strong><span class="mono" data-i18n="Start a project →">Start a project →</span></a>`;

  const listEl = $("#indexList");
  listEl.innerHTML = P.map((p, i) => `
    <li><a class="row" href="#project/${slug(p)}" data-i="${i}" data-cat="${esc(p.category)}">
      <span class="mono">${pad(i)}</span><span class="b">${esc(p.brand)}</span><span>${esc(p.ip)}</span>
      <span class="mono">${esc(CAT[p.category] || p.category)}</span><span class="mono">${esc((p.tags || []).slice(1).join(", "))}</span>
    </a></li>`).join("");
  const hoverImg = $("#hoverImg"), hoverImgEl = $("img", hoverImg);
  if (fine) {
    $$(".row", listEl).forEach((r) => {
      r.addEventListener("mouseenter", () => { hoverImgEl.src = P[r.dataset.i].cover || P[r.dataset.i].images[0]; hoverImg.classList.add("on"); });
      r.addEventListener("mouseleave", () => hoverImg.classList.remove("on"));
    });
    addEventListener("mousemove", (e) => { hoverImg.style.left = e.clientX + "px"; hoverImg.style.top = e.clientY + "px"; }, { passive: true });
  }

  const cats = ["all", ...new Set(P.map((p) => p.category))];
  $("#filters").innerHTML = cats.map((c) => {
    const n = c === "all" ? P.length : P.filter((p) => p.category === c).length;
    return `<button data-f="${c}" aria-pressed="false"><span data-i18n="${c === "all" ? "All" : "kw." + c}">${c === "all" ? "All" : CAT[c] || c}</span><sup>${n}</sup></button>`;
  }).join("");
  // Collapsed by default: first 5 projects + the CTA tile; "Show all" reveals the rest (works without JS too)
  $$(".tile[data-cat]", grid).forEach((t, k) => t.classList.toggle("more", k >= 5));
  $("#allCount").textContent = P.length;
  const setFilter = (f) => {
    $$("#filters button").forEach((x) => { const on = x.dataset.f === f; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on); });
    $$(".tile[data-cat], .row").forEach((el) => el.classList.toggle("hide", f !== "all" && el.dataset.cat !== f));
    $(".tile-cta").hidden = f !== "all";
    grid.classList.toggle("filtered", f !== "all");
    $("#showAllBtn").hidden = f !== "all";
  };
  $$("#filters button").forEach((b) => b.addEventListener("click", () => setFilter(b.dataset.f)));
  setFilter("all");
  $$(".views button").forEach((b) => b.addEventListener("click", () => {
    $$(".views button").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", x === b); });
    const idx = b.dataset.view === "index"; $("#index").hidden = !idx; grid.hidden = idx; $("#showAllBtn").hidden = idx || grid.classList.contains("filtered");
  }));

  /* Hero keywords: hover previews that category, click jumps to its projects */
  kws.forEach((k) => {
    k.addEventListener("mouseenter", () => { held = true; show(k.dataset.key); });
    k.addEventListener("focus", () => { held = true; show(k.dataset.key); });
    k.addEventListener("mouseleave", () => { held = false; show(k.dataset.key); });
    k.addEventListener("blur", () => { held = false; });
    k.addEventListener("click", (e) => {
      e.preventDefault();
      setFilter(P.some((p) => p.category === k.dataset.key) ? k.dataset.key : "all");
      $("#all").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    });
  });
  show("film");

  /* ---------- 02 Products & activations ---------- */
  $("#prod").innerHTML = (window.PRODUCTS || []).map((d) => {
    const i = P.findIndex((p) => p.brand === d.project);
    return `<li><a class="tile" href="${i > -1 ? "#project/" + slug(P[i]) : "#work"}">
      <span class="frame white${d.fill ? " fit" : ""}"${d.fill ? ' data-fit="1"' : ""}><img src="${esc(d.img)}" alt="" loading="lazy"></span>
      <span class="tile-cap"><span class="mono n">${esc(d.project)}</span><h3>${esc(d.label)}</h3></span>
    </a></li>`;
  }).join("");

  /* ---------- 03 Partners, grouped ---------- */
  const G = window.PARTNER_GROUPS || [];
  const LINKS = window.PARTNER_LINKS || {};
  // Hero studio tiles link out too
  $$(".trusted li").forEach((li) => {
    const img = $("img", li); const n = (img.getAttribute("src").match(/logos\/(.+)\.png$/) || [])[1];
    if (n && LINKS[n] && !$("a", li)) li.innerHTML = `<a href="${esc(LINKS[n])}" target="_blank" rel="noopener" aria-label="${esc(img.alt)} website (opens in a new tab)">${li.innerHTML}</a>`;
  });
  // Balance logo sizes: wide logos get shorter, tall logos taller, so each carries similar visual weight
  const sizeLogo = (img) => {
    if (!img.naturalWidth) return;
    const small = innerWidth < 760, hero = !!img.closest(".trusted");
    const area = hero ? (small ? 700 : 1500) : (small ? 900 : 1700), max = hero ? (small ? 38 : 42) : (small ? 34 : 46);
    const r = img.naturalWidth / img.naturalHeight;
    img.style.height = Math.round(Math.min(max, Math.max(14, Math.sqrt(area / r)))) + "px";
  };
  document.addEventListener("load", (e) => { if (e.target.closest && e.target.closest(".plogos")) sizeLogo(e.target); }, true);
  const sizeAll = () => $$(".plogos img").forEach(sizeLogo);
  addEventListener("load", sizeAll); sizeAll();
  $("#partnerGroups").innerHTML = G.map((g) => `
    <div class="pgroup">
      <h3 data-i18n="${esc(g.name)}">${esc(g.name)}</h3>
      <ul class="plogos">${g.logos.map((n) => {
        const img = `<img src="assets/logos/${n}.png" alt="${esc(n.replace(/-/g, " "))}">`;
        const url = LINKS[n];
        return `<li>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${esc(n.replace(/-/g, " "))} website (opens in a new tab)">${img}</a>` : img}</li>`;
      }).join("")}</ul>
    </div>`).join("");

  /* ---------- On the slate (launch band) ---------- */
  $("#slate").innerHTML = (window.SLATE || []).map((d) => `
    <li><span class="mono when" data-i18n="${esc(d.when)}">${esc(d.when)}</span><strong data-i18n="${esc(d.kind)}">${esc(d.kind)}</strong><span class="note" data-i18n="${esc(d.note)}">${esc(d.note)}</span></li>`).join("");

  /* ---------- Testimonials (hidden until quotes are added) ---------- */
  const Q = window.TESTIMONIALS || [];
  if (Q.length) {
    $("#quoteList").innerHTML = Q.map((q) => `
      <figure class="quote"><blockquote>“${esc(q.quote)}”</blockquote>
        <figcaption><strong>${esc(q.name)}</strong><span class="mono">${esc([q.role, q.company].filter(Boolean).join(", "))}</span></figcaption></figure>`).join("");
    $("#quotes").hidden = false;
  }

  /* ---------- 04 Services accordion ---------- */
  // Each service shows a matching campaign still beside the list (like flipping through posters)
  const svcItems = $$("#svc > li");
  const svcShow = (k) => {
    $$(".svc-media img").forEach((im) => im.classList.toggle("is-on", +im.dataset.for === k));
    const cap = $("#svcCap"); if (cap) cap.textContent = svcItems[k].dataset.cap || "";
  };
  svcItems.forEach((li, k) => li.addEventListener("mouseenter", () => svcShow(k)));
  $$(".svc-row").forEach((btn, k) => btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", open); btn.nextElementSibling.hidden = !open;
    if (open) svcShow(k);
  }));

  /* ---------- Case study page ---------- */
  const box = $("#case"), inner = $("#caseInner");
  let cur = -1, lastFocus = null;
  const render = (i) => {
    const p = P[i]; cur = i;
    const imgs = p.images.filter((s) => !(p.video && s.startsWith("assets/video/")));
    const first = p.video
      ? `<video src="${esc(p.video)}" poster="${esc(p.images.find((s) => s.startsWith("assets/video/")) || p.images[0])}" controls autoplay muted loop playsinline></video>`
      : `<img src="${esc(imgs.shift())}" alt="${esc(p.brand)} × ${esc(p.ip)}">`;
    const rest = imgs.map((s) => `<img src="${esc(s)}" alt="${esc(p.brand)} × ${esc(p.ip)}" loading="lazy">`);
    const rows = []; for (let k = 0; k < rest.length; k += 2) rows.push(rest.length - k === 1 ? rest[k] : `<div class="pair">${rest[k]}${rest[k + 1]}</div>`);
    const nx = P[(i + 1) % P.length];
    $("#caseNo").textContent = `${pad(i)} / ${pad(P.length - 1)}`;
    const res = (p.results || []).filter((r) => r && r.value);
    const results = res.length
      ? `<dl class="case-results">${res.map((r) => `<div><dd>${esc(r.value)}</dd><dt class="mono">${esc(r.label || "")}</dt></div>`).join("")}</dl>`
      : `<div class="case-results empty"><p>${esc(T("Campaign results available on request."))}</p><a class="mono" href="#contact" data-close>${esc(T("Ask us →"))}</a></div>`;
    inner.innerHTML = `
      <h2 class="case-title" id="caseTitle">${esc(p.brand)} <i>×</i><br>${esc(p.ip)}</h2>
      <div class="case-meta mono">
        <p><span class="k">${esc(T("Brand"))}</span>${esc(p.brand)}</p>
        <p><span class="k">${esc(T("Property"))}</span>${esc(p.ip)}</p>
        <p><span class="k">${esc(T("Discipline"))}</span>${esc(I18N.t("kw." + p.category, CAT[p.category] || p.category))}</p>
        <p><span class="k">${esc(T("Scope"))}</span>${(p.tags || []).map(esc).join("<br>")}</p>
        <p class="sum">${esc(p.summary)}</p>
      </div>
      <div class="case-res-wrap"><p class="mono k">${esc(T("Results"))}</p>${results}</div>
      <div class="case-media">${first}${rows.join("")}</div>
      <div class="case-cta">
        <a href="#contact" data-close><span class="mono muted">${esc(T("Have a brief?"))}</span><strong>${esc(T("Start a project like this"))}</strong></a>
        <button data-next><span class="mono muted">${esc(T("Next project"))}</span><strong>${esc(nx.brand)} × ${esc(nx.ip)}</strong></button>
      </div>`;
    box.scrollTop = 0;
  };
  const open = (i) => {
    if (box.hidden) { lastFocus = document.activeElement; box.hidden = false; document.body.classList.add("lock"); }
    render(i); $("#caseClose").focus({ preventScroll: true });
  };
  const close = (toContact) => {
    box.hidden = true; document.body.classList.remove("lock"); cur = -1; inner.innerHTML = "";
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

  /* ---------- Contact form: sends to the inbox (Formspree) when set up, otherwise opens an email ---------- */
  const form = $("#form"), note = $("#formNote");
  let noteKey = SITE.formEndpoint ? "" : "Opens your email app with the message ready.";
  const setNote = (k) => { noteKey = k; note.textContent = k ? T(k) : ""; };
  setNote(noteKey);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach((f) => {
      const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.closest("label").classList.toggle("invalid", bad); if (bad) ok = false;
    });
    if (!ok) return setNote("Please add your name, a valid email and a short brief.");
    const d = new FormData(form);
    const lines = [
      ["Name", d.get("name")], ["Company", d.get("company")], ["Email", d.get("email")],
      ["Budget", d.get("budget")], ["Launch", d.get("timing")], ["IP in mind", d.get("ip")],
      ["Interested in", d.getAll("interest").join(", ")]
    ].map(([k, v]) => `${k}: ${v || "Not specified"}`).join("\n");
    const subject = `Partnership enquiry: ${d.get("company") || d.get("name")}`;
    if (SITE.formEndpoint) {
      const btn = $("button[type=submit]", form); btn.disabled = true; setNote("Sending…");
      try {
        const r = await fetch(SITE.formEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ _subject: subject, name: d.get("name"), email: d.get("email"), company: d.get("company"), budget: d.get("budget"), launch: d.get("timing"), ip: d.get("ip"), interest: d.getAll("interest").join(", "), message: d.get("message") }) });
        if (!r.ok) throw new Error(r.status);
        form.reset(); setNote("Thanks! The team will be in touch soon.");
        if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: "enquiry-sent", title: "Enquiry sent", event: true });
      } catch (err) { setNote("Something went wrong. Please email connect@brandinfinity.sg."); }
      btn.disabled = false;
      return;
    }
    location.href = `mailto:connect@brandinfinity.sg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines + "\n\n" + d.get("message"))}`;
    setNote("Your email app should open now. If not, write to connect@brandinfinity.sg.");
  });

  /* ---------- Showreel: plays the campaign films back to back ---------- */
  const REEL = P.filter((p) => p.video).map((p) => ({ src: p.video, cap: `${p.brand} × ${p.ip}` }));
  const hv = $$("video.hero-media").map((v) => ({ src: v.getAttribute("src"), cap: NOW[v.dataset.key] || "" }));
  hv.forEach((h) => { if (!REEL.some((r) => r.src === h.src)) REEL.push(h); });
  const reel = $("#reel"), rv = $("#reelVideo");
  let ri = 0, reelFocus = null;
  const reelPlay = (k) => {
    ri = (k + REEL.length) % REEL.length;
    rv.src = REEL[ri].src; rv.play().catch(() => {});
    $("#reelCap").textContent = REEL[ri].cap;
    $("#reelCount").textContent = `${pad(ri)} / ${pad(REEL.length - 1)}`;
    $$("#reelDots button").forEach((b, j) => b.setAttribute("aria-current", j === ri));
  };
  $("#reelDots").innerHTML = REEL.map((r, k) => `<button aria-label="${esc(r.cap)}" data-k="${k}"></button>`).join("");
  $("#reelDots").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) reelPlay(+b.dataset.k); });
  rv.addEventListener("ended", () => reelPlay(ri + 1));
  const reelOpen = () => {
    if (!REEL.length) return;
    reelFocus = document.activeElement; reel.hidden = false; document.body.classList.add("lock");
    media.forEach((m) => m.tagName === "VIDEO" && m.pause()); clearTimeout(heroTimer);
    rv.muted = false; reelPlay(0); $("#reelClose").focus();
    if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: "showreel", title: "Showreel opened", event: true });
  };
  const reelClose = () => { rv.pause(); rv.removeAttribute("src"); rv.load(); reel.hidden = true; document.body.classList.remove("lock"); show(keys[hk]); if (reelFocus) reelFocus.focus({ preventScroll: true }); };
  $("#reelBtn").addEventListener("click", reelOpen);
  $("#reelClose").addEventListener("click", reelClose);
  reel.addEventListener("click", (e) => { if (e.target === reel) reelClose(); });
  addEventListener("keydown", (e) => {
    if (reel.hidden) return;
    if (e.key === "Escape") reelClose();
    if (e.key === "ArrowRight") reelPlay(ri + 1);
    if (e.key === "ArrowLeft") reelPlay(ri - 1);
  });

  /* ---------- Visit stats (GoatCounter), only when a code is set in projects.js ---------- */
  if (SITE.goatcounter && /^[a-z0-9-]+$/i.test(SITE.goatcounter)) {
    const gc = document.createElement("script");
    gc.async = true; gc.src = "https://gc.zgo.at/count.js";
    gc.dataset.goatcounter = `https://${SITE.goatcounter}.goatcounter.com/count`;
    document.body.appendChild(gc);
    // Count case-study views as their own pages
    addEventListener("hashchange", () => { if (location.hash.startsWith("#project/") && window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: location.hash.slice(1), title: document.title }); });
  }

  /* ---------- Language ---------- */
  const langSel = $("#langSel");
  langSel.value = I18N.lang;
  langSel.addEventListener("change", () => I18N.set(langSel.value));
  document.addEventListener("langchange", () => {
    langSel.value = I18N.lang;
    setNote(noteKey);
    if (cur > -1) render(cur);
    requestAnimationFrame(sizeAll);
  });
  I18N.set(I18N.lang);

  $("#year").textContent = new Date().getFullYear();
  fitAll(); addEventListener("load", fitAll);
})();

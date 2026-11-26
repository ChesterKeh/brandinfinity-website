(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const CAT = { film: "Film", gaming: "Gaming", streaming: "Campaign", licensing: "Licensing" };

  // Nav
  const nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach((a) => a.addEventListener("click", () => { links.classList.remove("open"); toggle.setAttribute("aria-expanded", false); }));

  // Hero rotator
  const words = ["Film", "Gaming", "Streaming", "Licensing"];
  const rot = $("#rotator"); let wi = 0;
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => {
      rot.classList.add("out");
      setTimeout(() => { wi = (wi + 1) % words.length; rot.textContent = words[wi]; rot.classList.remove("out"); }, 350);
    }, 2400);
  }

  // Logo marquee (list duplicated for a seamless loop)
  const logos = (window.PARTNERS || []).map((n) => `<img src="assets/logos/${n}.png" alt="${esc(n.replace(/-/g, " "))}" loading="lazy">`).join("");
  $("#marquee").innerHTML = logos + logos.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');

  // Work grid
  const grid = $("#workGrid");
  const projects = window.PROJECTS || [];
  grid.innerHTML = projects.map((p, i) => `
    <button class="card reveal${p.featured ? " featured" : ""}" data-cat="${esc(p.category)}" data-i="${i}" aria-label="${esc(p.brand)} × ${esc(p.ip)}, view project">
      <img src="${esc(p.images[0])}" alt="" loading="lazy">
      <span class="card-arrow" aria-hidden="true">→</span>
      <span class="card-body">
        <span class="card-cat">${esc(CAT[p.category] || p.category)}</span>
        <h3>${esc(p.brand)}<span class="x">×</span>${esc(p.ip)}</h3>
        <p>${esc(p.summary)}</p>
      </span>
    </button>`).join("") + `
    <a class="card featured card-cta reveal" href="#contact">
      <span class="card-body">
        <span class="card-cat">Next up</span>
        <h3>Your brand<span class="x">×</span>the next big IP</h3>
        <p>Tell us your goals and we'll find the story that fits. Film, gaming, streaming or licensing.</p>
        <span class="btn btn-sm">Start a partnership <span aria-hidden="true">→</span></span>
      </span>
    </a>`;

  $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => { c.classList.toggle("is-active", c === chip); c.setAttribute("aria-selected", c === chip); });
    const f = chip.dataset.filter;
    $$(".card[data-cat]", grid).forEach((c) => c.classList.toggle("hide", f !== "all" && c.dataset.cat !== f));
  }));

  // Project modal
  const modal = $("#modal");
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card"); if (!card) return;
    const p = projects[card.dataset.i];
    $("#modalCat").textContent = CAT[p.category] || p.category;
    $("#modalTitle").textContent = `${p.brand} × ${p.ip}`;
    $("#modalSummary").textContent = p.summary;
    $("#modalTags").innerHTML = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("");
    $("#modalMedia").innerHTML =
      (p.video ? `<video src="${esc(p.video)}" poster="${esc(p.images[0])}" controls autoplay muted loop playsinline></video>` : "") +
      p.images.filter((_, i) => !(p.video && i === 0)).map((src) => `<img src="${esc(src)}" alt="${esc(p.brand)} × ${esc(p.ip)}">`).join("");
    modal.showModal();
  });
  const closeModal = () => { modal.close(); $("#modalMedia").innerHTML = ""; };
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  modal.addEventListener("close", () => { $("#modalMedia").innerHTML = ""; });
  $("#modalCta").addEventListener("click", closeModal);

  // Reveal on scroll
  $$(".section-head, .service, .model, .steps li, .why > *, .contact-grid > *, .stats").forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  // Sticky mobile CTA hides on hero and contact
  const sticky = $("#stickyCta");
  const contact = $("#contact");
  const updSticky = () => {
    const r = contact.getBoundingClientRect();
    sticky.classList.toggle("hidden", scrollY < innerHeight * 0.6 || r.top < innerHeight);
  };
  addEventListener("scroll", updSticky, { passive: true }); updSticky();

  // Contact form -> pre-filled email
  const form = $("#contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach((f) => { const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value)); f.classList.toggle("invalid", bad); if (bad) ok = false; });
    if (!ok) { $("#formNote").textContent = "Please fill in your name, a valid email and a message."; return; }
    const d = new FormData(form);
    const interests = d.getAll("interest").join(", ") || "Not specified";
    const subject = `Partnership enquiry — ${d.get("company") || d.get("name")}`;
    const body = `Name: ${d.get("name")}\nCompany: ${d.get("company")}\nEmail: ${d.get("email")}\nInterested in: ${interests}\n\n${d.get("message")}`;
    location.href = `mailto:connect@brandinfinity.sg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $("#formNote").textContent = "Your email app should open now. If it doesn't, email connect@brandinfinity.sg directly.";
  });

  $("#year").textContent = new Date().getFullYear();
})();

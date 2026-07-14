(() => {
  "use strict";

  const site = window.DARLES_SITE || {};
  const language = (navigator.language || "en").toLowerCase().startsWith("ru") ? "ru" : "en";
  const locale = site[language] || site.en || site.ru;
  const text = locale.translations || {};
  const contacts = site.contacts || {};
  const template = document.getElementById("product-card-template");

  document.documentElement.lang = language;
  document.title = locale.metaTitle || document.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", locale.metaDescription || "");
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", locale.metaTitle || "");
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", locale.metaDescription || "");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = text[element.dataset.i18n];
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = text[element.dataset.i18nPlaceholder];
    if (value) element.setAttribute("placeholder", value);
  });

  function renderCards(items, targetId) {
    const target = document.getElementById(targetId);
    if (!target || !template) return;
    target.replaceChildren();

    items.forEach((item) => {
      const fragment = template.content.cloneNode(true);
      const card = fragment.querySelector(".product-card");
      const link = fragment.querySelector(".card-link");

      fragment.querySelector(".card-icon").textContent = item.icon || "✦";
      fragment.querySelector(".card-status").textContent = item.status || "Demo";
      fragment.querySelector("h3").textContent = item.title;
      fragment.querySelector(".card-description").textContent = item.description;
      fragment.querySelector(".card-price").textContent = item.price || "";
      fragment.querySelector(".card-duration").textContent = item.duration || "";

      const tagList = fragment.querySelector(".tag-list");
      (item.tags || []).forEach((tag) => {
        const li = document.createElement("li");
        li.textContent = tag;
        tagList.appendChild(li);
      });

      link.querySelector("span").textContent = text.discuss || "Contact";
      if (item.url) {
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.querySelector("span").textContent = text.openDemo || "Open demo";
        card.classList.add("has-demo");
      }

      target.appendChild(fragment);
    });
  }

  function renderContacts() {
    const target = document.getElementById("contact-links");
    if (!target) return;
    target.replaceChildren();

    const externalLinks = [
      { label: text.telegramContact || "Telegram", url: contacts.telegram, className: "is-primary", icon: "↗" },
      { label: text.vkContact || "VK", url: contacts.vk, className: "", icon: "↗" }
    ].filter((item) => item.url);

    externalLinks.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = item.className;
      link.innerHTML = `<span>${item.label}</span><b>${item.icon}</b>`;
      target.appendChild(link);
    });

    if (contacts.email) {
      const emailRow = document.createElement("div");
      emailRow.className = "email-contact";

      const emailInfo = document.createElement("div");
      const emailLabel = document.createElement("span");
      emailLabel.textContent = text.emailContact || "Email";
      const emailAddress = document.createElement("strong");
      emailAddress.textContent = contacts.email;
      emailInfo.append(emailLabel, emailAddress);

      const copyButton = document.createElement("button");
      copyButton.type = "button";
      copyButton.className = "copy-email-button";
      copyButton.textContent = text.copyEmail || "Copy email";
      copyButton.addEventListener("click", () => copyEmail(contacts.email));

      emailRow.append(emailInfo, copyButton);
      target.appendChild(emailRow);
    }
  }

  async function copyEmail(email) {
    const status = document.getElementById("copy-status");
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement("textarea");
        input.value = email;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("Copy command failed");
      }
      if (status) status.textContent = text.emailCopied || "Email copied";
    } catch (error) {
      if (status) status.textContent = `${text.emailCopyFailed || "Copy the address manually"}: ${email}`;
    }
  }

  renderCards(locale.products || [], "product-grid");
  renderCards(locale.games || [], "games-grid");
  renderContacts();

  document.getElementById("current-year").textContent = new Date().getFullYear();

  document.querySelectorAll('a[href="#top"], [data-back-to-top]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNav?.classList.toggle("is-open", !isOpen);
  });
  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle?.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", (event) => {
    if (glow) glow.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  }, { passive: true });


  const canvas = document.getElementById("magic-canvas");
  const context = canvas?.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let particles = [];

  function resizeCanvas() {
    if (!canvas || !context) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function makeParticle(x = Math.random() * width, y = Math.random() * height) {
    return {
      x,
      y,
      radius: Math.random() * 1.25 + 0.35,
      speedY: Math.random() * 0.14 + 0.035,
      drift: (Math.random() - 0.5) * 0.08,
      alpha: Math.random() * 0.36 + 0.08,
      pulse: Math.random() * Math.PI * 2
    };
  }

  function resetParticles() {
    particles = Array.from({ length: Math.min(65, Math.floor(width / 20)) }, () => makeParticle());
  }

  function animate() {
    if (!context || reducedMotion) return;
    context.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      particle.y -= particle.speedY;
      particle.x += particle.drift;
      particle.pulse += 0.018;
      if (particle.y < -8) Object.assign(particle, makeParticle(Math.random() * width, height + 8));
      const alpha = Math.max(0.03, particle.alpha + Math.sin(particle.pulse) * 0.08);
      context.beginPath();
      context.fillStyle = `rgba(131, 245, 44, ${alpha})`;
      context.shadowBlur = 6;
      context.shadowColor = "rgba(139, 53, 223, 0.7)";
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  resetParticles();
  window.addEventListener("resize", () => {
    resizeCanvas();
    resetParticles();
  });
  if (!reducedMotion) animate();
})();

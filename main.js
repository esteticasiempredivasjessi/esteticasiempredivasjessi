// Menú móvil
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Revelado al hacer scroll
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Galería: filtro por tratamiento
const filterButtons = document.querySelectorAll(".filter-pill");
const galleryItems = document.querySelectorAll(".gallery-item");

if (filterButtons.length && galleryItems.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      galleryItems.forEach((item) => {
        const match = filter === "todos" || item.dataset.category === filter;
        item.style.display = match ? "" : "none";
      });
    });
  });
}

// Galería: lightbox para ver fotos, videos y testimonios en grande
const lightbox = document.querySelector(".lightbox-overlay");
const testimonialShots = document.querySelectorAll(".testimonial-shot");

if (lightbox && (galleryItems.length || testimonialShots.length)) {
  const lightboxBody = lightbox.querySelector(".lightbox-body");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightboxBody.innerHTML = "";
    document.body.style.overflow = "";
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const type = item.dataset.type;
      const src = item.dataset.src;
      const caption = item.dataset.caption || "";

      lightboxBody.innerHTML =
        type === "video"
          ? `<video src="${src}" controls autoplay playsinline></video>`
          : `<img src="${src}" alt="${caption}" />`;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  testimonialShots.forEach((shot) => {
    shot.addEventListener("click", () => {
      const src = shot.dataset.src;
      const caption = shot.dataset.caption || "";

      lightboxBody.innerHTML = `<img src="${src}" alt="${caption}" />`;
      lightboxCaption.textContent = caption;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxClose.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

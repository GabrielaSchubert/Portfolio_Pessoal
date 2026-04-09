// Função mudança de body para tema claro ou escuro, e salva a escolha no localStorage
function applyTheme(theme) {
  const body = document.body;
  body.classList.remove("light", "dark");
  body.classList.add(theme);
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";
  applyTheme(newTheme);
  try {
    localStorage.setItem("theme", newTheme);
  } catch (e) {}
}

// Inicializa tema salvo ou preferência do sistema
(function initTheme() {
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (e) {}
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
    return;
  }
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
})();

// inicializa legenda externa do carrossel
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("meuCarrossel");
  const captionEl = document.getElementById("carouselCaption");
  if (!carousel || !captionEl) return;

  function updateCaption() {
    const active = carousel.querySelector(".carousel-item.active");
    if (!active) return;
    const text = active.getAttribute("data-caption") || "";
    // animação simples: fade
    captionEl.style.transition = "opacity 0.18s ease";
    captionEl.style.opacity = 0;
    setTimeout(() => {
      captionEl.textContent = text;
      captionEl.style.opacity = 1;
    }, 120);
  }

  // atualiza inicialmente
  updateCaption();

  // usa evento do bootstrap para atualizar após transição
  carousel.addEventListener("slid.bs.carousel", updateCaption);
});

// Scroll reveal: observa elementos e aplica a classe 'in-view' quando aparecem
function initScrollReveal() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  const selectors = [
    "header",
    "main section",
    "h1",
    "h2",
    "h3",
    "p",
    ".person",
    ".carousel-container",
    ".project-item",
    "footer",
    ".imgcenter",
  ];

  const nodes = Array.from(document.querySelectorAll(selectors.join(",")));
  const unique = [...new Set(nodes)];

  unique.forEach((el, i) => {
    if (el.classList.contains("sr")) return;
    el.classList.add("sr");
    // alterna direção para criar variação visual
    const dir =
      el.clientWidth > 240 && el.clientHeight > 40
        ? i % 2 === 0
          ? "sr-left"
          : "sr-right"
        : "sr-up";
    el.classList.add(dir);
  });

  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  unique.forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", initScrollReveal);

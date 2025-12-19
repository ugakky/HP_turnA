(() => {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const btn = header.querySelector(".nav-toggle");
  const drawer = header.querySelector("#nav-drawer");
  const backdrop = header.querySelector("[data-nav-close]");

  const openNav = () => {
    document.body.classList.add("nav-open");
    drawer.hidden = false;
    backdrop.hidden = false;
    btn.setAttribute("aria-expanded", "true");
  };

  const closeNav = () => {
    document.body.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
    window.setTimeout(() => {
      drawer.hidden = true;
      backdrop.hidden = true;
    }, 180);
  };

  if (btn && drawer && backdrop) {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      expanded ? closeNav() : openNav();
    });

    backdrop.addEventListener("click", closeNav);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        closeNav();
      }
    });

    drawer.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeNav();
    });
  }

  // 現在ページをハイライト
  const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const links = header.querySelectorAll("a[href]");
  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === current) a.classList.add("is-active");
  });
})();
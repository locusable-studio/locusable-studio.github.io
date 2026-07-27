(function () {
  function initThemeColor() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    var dark = window.matchMedia("(prefers-color-scheme: dark)");
    function apply() {
      meta.setAttribute("content", dark.matches ? "#050507" : "#f5f6f8");
    }
    apply();
    if (dark.addEventListener) dark.addEventListener("change", apply);
    else if (dark.addListener) dark.addListener(apply);
  }

  function initReveals() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach(function (n) {
      var rect = n.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        n.classList.add("is-in");
        return;
      }
      io.observe(n);
    });
  }

  function initStickyChapters() {
    var chapters = document.querySelectorAll(".chapter-sticky");
    if (!chapters.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      chapters.forEach(function (c) { c.style.setProperty("--chapter-progress", "1"); });
      return;
    }
    function update() {
      var vh = window.innerHeight || 1;
      chapters.forEach(function (chapter) {
        var rect = chapter.getBoundingClientRect();
        var total = Math.max(chapter.offsetHeight - vh, 1);
        var raw = Math.min(Math.max(-rect.top / total, 0), 1);
        chapter.style.setProperty("--chapter-progress", String(raw));
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function bindAppStoreLinks() {
    var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    document.querySelectorAll("[data-app-store-link]:not([data-app-store-bound])").forEach(function (link) {
      link.setAttribute("data-app-store-bound", "true");
      var iosUrl = link.getAttribute("data-ios-url");
      var webUrl = link.getAttribute("data-web-url") || link.getAttribute("href");
      if (!iosUrl || !webUrl) return;
      if (!link.hasAttribute("data-web-url")) link.setAttribute("data-web-url", webUrl);
      if (isIOS) {
        link.setAttribute("href", iosUrl);
        link.removeAttribute("target");
      }
    });
  }

  initThemeColor();
  initReveals();
  initStickyChapters();
  bindAppStoreLinks();
})();

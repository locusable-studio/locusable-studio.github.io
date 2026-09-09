(function () {
  var APP_THEME_COLORS = {
    studio: "#9b7100",
    wallpaper: "#328e3a",
    links: "#1479bd",
    sidefy: "#d5312c",
    island: "#85209d",
    hackerba: "#d95700",
    trmnl: "#3347a5",
  };

  function initThemeColor() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    var app = document.documentElement.getAttribute("data-app");
    var accent = app && APP_THEME_COLORS[app];
    var dark = window.matchMedia("(prefers-color-scheme: dark)");
    function apply() {
      if (accent) {
        meta.setAttribute("content", accent);
        return;
      }
      meta.setAttribute("content", dark.matches ? "#151515" : "#ffffff");
    }
    apply();
    if (dark.addEventListener) dark.addEventListener("change", apply);
    else if (dark.addListener) dark.addListener(apply);
  }

  function bindAppStoreLinks() {
    var ua = navigator.userAgent || "";
    var isIOS = /iPhone|iPad|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    var isMac = /Macintosh|Mac OS X/.test(ua) && !isIOS;
    document.querySelectorAll("[data-app-store-link]:not([data-app-store-bound])").forEach(function (link) {
      link.setAttribute("data-app-store-bound", "true");
      var iosUrl = link.getAttribute("data-ios-url");
      var macUrl = link.getAttribute("data-mac-url");
      var webUrl = link.getAttribute("data-web-url") || link.getAttribute("href");
      if (!webUrl) return;
      if (!link.hasAttribute("data-web-url")) link.setAttribute("data-web-url", webUrl);
      if (isIOS && iosUrl) {
        link.setAttribute("href", iosUrl);
        link.removeAttribute("target");
      } else if (isMac && macUrl) {
        link.setAttribute("href", macUrl);
        link.removeAttribute("target");
      }
    });
  }


  function initTopbarScroll() {
    var topbar = document.querySelector(".topbar");
    if (!topbar) return;
    function update() {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      topbar.classList.toggle("is-scrolled", y > 0);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  initThemeColor();
  bindAppStoreLinks();
  initTopbarScroll();
})();

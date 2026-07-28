(function () {
  var APP_THEME_COLORS = {
    wallpaper: "#4cac50",
    links: "#2094f0",
    sidefy: "#f44034",
    island: "#9820b0",
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
      meta.setAttribute("content", dark.matches ? "#000000" : "#ffffff");
    }
    apply();
    if (!accent) {
      if (dark.addEventListener) dark.addEventListener("change", apply);
      else if (dark.addListener) dark.addListener(apply);
    }
  }

  function syncChromeHeight() {
    var masthead = document.querySelector(".studio-masthead");
    if (masthead) {
      document.documentElement.style.setProperty(
        "--site-chrome-h-masthead",
        masthead.offsetHeight + "px"
      );
    }
    var crumb = document.querySelector(".crumbbar");
    if (crumb) {
      document.documentElement.style.setProperty(
        "--site-chrome-h",
        crumb.offsetHeight + "px"
      );
    }
  }

  function initChromeHeight() {
    syncChromeHeight();
    window.addEventListener("resize", syncChromeHeight);
    if (!window.ResizeObserver) return;
    document.querySelectorAll(".studio-masthead, .crumbbar").forEach(function (el) {
      new ResizeObserver(syncChromeHeight).observe(el);
    });
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

  initThemeColor();
  initChromeHeight();
  initReveals();
  bindAppStoreLinks();
})();

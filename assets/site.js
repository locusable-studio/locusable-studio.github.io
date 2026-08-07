(function () {
  var THEME_STORAGE_KEY = "locusable-theme";
  var LAYOUT_STORAGE_KEY = "locusable-home-layout";
  var APP_THEME_COLORS = {
    wallpaper: "#4cac50",
    links: "#2094f0",
    sidefy: "#f44034",
    island: "#9820b0",
    hackerba: "#ff6600",
  };

  function getThemePreference() {
    try {
      var preference = window.localStorage.getItem(THEME_STORAGE_KEY);
      return preference === "light" || preference === "dark" ? preference : "system";
    } catch (error) {
      return "system";
    }
  }

  function applyTheme(preference) {
    var root = document.documentElement;
    if (preference === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", preference);
  }

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
      var preference = getThemePreference();
      meta.setAttribute(
        "content",
        preference === "dark" || (preference === "system" && dark.matches) ? "#000000" : "#ffffff"
      );
    }
    apply();
    document.addEventListener("themechange", apply);
    if (dark.addEventListener) dark.addEventListener("change", apply);
    else if (dark.addListener) dark.addListener(apply);
  }

  function initThemeControl() {
    var controls = document.querySelectorAll("[data-theme-control]");
    if (!controls.length) return;
    var preference = getThemePreference();
    applyTheme(preference);

    controls.forEach(function (control) {
      var trigger = control.querySelector("[data-theme-trigger]");
      var menu = control.querySelector("[data-theme-menu]");
      var options = control.querySelectorAll("[data-theme-option]");
      if (!trigger || !menu) return;

      function close() {
        trigger.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      }

      function update(nextPreference) {
        preference = nextPreference;
        applyTheme(preference);
        try {
          if (preference === "system") window.localStorage.removeItem(THEME_STORAGE_KEY);
          else window.localStorage.setItem(THEME_STORAGE_KEY, preference);
        } catch (error) {}
        options.forEach(function (option) {
          option.setAttribute("aria-checked", String(option.getAttribute("data-theme-option") === preference));
        });
        document.dispatchEvent(new Event("themechange"));
      }

      options.forEach(function (option) {
        option.setAttribute("aria-checked", String(option.getAttribute("data-theme-option") === preference));
        option.addEventListener("click", function () {
          update(option.getAttribute("data-theme-option"));
          close();
          trigger.focus();
        });
      });

      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
        menu.hidden = expanded;
        if (!expanded) menu.querySelector("[aria-checked='true']").focus();
      });

      document.addEventListener("click", function (event) {
        if (!control.contains(event.target)) close();
      });
      control.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          close();
          trigger.focus();
        }
      });
    });
  }

  function initLayoutControl() {
    var grid = document.querySelector(".home-product-grid");
    var options = document.querySelectorAll("[data-layout-option]");
    if (!grid || !options.length) return;

    function getPreference() {
      try {
        return window.localStorage.getItem(LAYOUT_STORAGE_KEY) === "list" ? "list" : "grid";
      } catch (error) {
        return "grid";
      }
    }

    function apply(preference) {
      if (preference === "list") document.documentElement.setAttribute("data-home-layout", "list");
      else document.documentElement.removeAttribute("data-home-layout");
      options.forEach(function (option) {
        option.setAttribute("aria-checked", String(option.getAttribute("data-layout-option") === preference));
      });
    }

    apply(getPreference());
    options.forEach(function (option) {
      option.addEventListener("click", function () {
        var preference = option.getAttribute("data-layout-option");
        apply(preference);
        try {
          if (preference === "list") window.localStorage.setItem(LAYOUT_STORAGE_KEY, preference);
          else window.localStorage.removeItem(LAYOUT_STORAGE_KEY);
        } catch (error) {}
        var control = option.closest("[data-theme-control]");
        var trigger = control && control.querySelector("[data-theme-trigger]");
        var menu = control && control.querySelector("[data-theme-menu]");
        if (trigger && menu) {
          trigger.setAttribute("aria-expanded", "false");
          menu.hidden = true;
          trigger.focus();
        }
      });
    });
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

  initThemeControl();
  initLayoutControl();
  initThemeColor();
  initChromeHeight();
  initReveals();
  bindAppStoreLinks();
})();

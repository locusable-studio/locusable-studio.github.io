(function (global) {
  var LANG_STORAGE_KEY = "locusable-lang";
  var ZH = {
    "nav.settings": "设置",
    "nav.theme": "主题",
    "nav.layout": "布局",
    "nav.language": "语言",
    "nav.theme.system": "跟随系统",
    "nav.theme.dark": "深色",
    "nav.theme.light": "浅色",
    "nav.layout.grid": "网格",
    "nav.layout.list": "列表",
    "nav.breadcrumb": "面包屑导航",

    "crumb.about": "关于",
    "crumb.privacy": "隐私",
    "crumb.themes": "主题",
    "nav.comingSoon": "即将推出",
    "nav.unmaintained": "停止维护",
    "nav.released": "已发布",

    "footer.copyright": "Copyright © 2026 Locusable Studio. 保留所有权利。",
    "footer.copyright.themes": "Copyright © 2026 Locusable Studio. 保留所有权利。· 地图数据 © OpenStreetMap · 瓦片 © OpenFreeMap",
    "footer.about": "关于",
    "footer.privacy": "隐私政策",
    "footer.showcase": "官方展示页",
    "footer.source": "官方页面",

    "title.home": "Locusable Studio",
    "title.about": "关于 — Locusable Studio",
    "title.comingSoon": "即将推出 — Locusable Studio",
    "title.unmaintained": "停止维护 — Locusable Studio",
    "title.wallpaper": "Here Wallpaper — Locusable Studio",
    "title.wallpaper.themes": "Here Wallpaper — 主题",
    "title.wallpaper.privacy": "隐私政策 — Here Wallpaper",
    "title.sidefy": "Here Sidefy — Locusable Studio",
    "title.sidefy.privacy": "隐私政策 — Here Sidefy",
    "title.island": "Here Island — Locusable Studio",
    "title.trmnl": "Here TRMNL — Locusable Studio",
    "title.hackerba": "Here HackerBa — Locusable Studio",
    "title.links": "Here Links — Locusable Studio",
    "title.links.privacy": "隐私政策 — Here Links",

    "meta.home": "Locusable Studio — 给日常设备做的小工具。",
    "meta.about": "Locusable Studio 给日常设备做小工具。",
    "meta.comingSoon": "还有更多工具在做。",
    "meta.unmaintained": "这些工具已停止维护。",

    "meta.wallpaper": "Here Wallpaper — 把你在意的地点做成地图壁纸。",
    "meta.wallpaper.themes": "Here Wallpaper 主题：基础和精选配色。",
    "meta.wallpaper.privacy": "Here Wallpaper 隐私政策 — Locusable Studio。",
    "meta.sidefy": "Here Sidefy — 把今天的日程放在屏幕边缘。",
    "meta.sidefy.privacy": "Here Sidefy 隐私政策 — Locusable Studio。",
    "meta.island": "Here Island — 正在播放的音乐显示在 Mac 刘海里。",
    "meta.trmnl": "Here TRMNL — 把电子墨水屏的画面映到桌面上。",
    "meta.hackerba": "Here HackerBa — 用论坛的排版来读 Hacker News。",
    "meta.links": "Here Links — 给自建 linkding 用的 iPhone 客户端。",
    "meta.links.privacy": "Here Links 隐私政策 — Locusable Studio。",

    "platform.iphoneIpad": "iPhone 与 iPad",
    "platform.mac": "Mac",
    "platform.chrome": "Chrome",
    "platform.chromeSoon": "Chrome · 即将推出",
    "platform.iphone": "iPhone",
    "platform.iphoneSoon": "iPhone · 即将推出",

    "cta.appStore": "在 App Store 查看",
    "cta.website": "访问网站",
    "cta.download": "下载",
    "cta.github": "在 GitHub 查看",
    "cta.themes": "浏览主题",
    "cta.soon": "即将推出",
    "cta.learnMore": "了解更多",

    "home.wallpaper.subhead": "把你在意的地点做成地图壁纸。",
    "home.wallpaper.tag.osm": "OpenStreetMap",
    "home.wallpaper.tag.maplibre": "MapLibre",
    "home.wallpaper.tag.sync": "iCloud 同步",
    "home.sidefy.subhead": "把今天的日程放在屏幕边缘。",
    "home.island.subhead": "正在播放的音乐显示在 Mac 刘海里。",
    "home.trmnl.subhead": "把电子墨水屏的画面映到桌面上。",
    "home.hackerba.subhead": "用论坛的排版来读 Hacker News。",
    "home.links.subhead": "给自建 linkding 用的 iPhone 客户端。",

    "about.heroTitle": "给屏幕上<em>已经有的东西</em>做工具。",
    "about.heroSubhead": "给日常设备做的小工具。",
    "about.approachTitle": "没人好好做的角落，也值得有工具",
    "about.approachSubhead": "给大多数人会跳过的界面角落做原生应用。",
    "about.moreTitle": "正好放一个小工具",
    "about.moreBody": "刘海、屏幕边缘、壁纸和图标之间，这些平时没人注意的地方，往往最适合放一个小工具。我们就做这类原生应用。",

    "wallpaper.subhead": "把你在意的地点做成地图壁纸。",
    "wallpaper.previews": "壁纸预览",
    "wallpaper.macTitle": "Mac 上的动态壁纸",
    "wallpaper.macSubhead": "同样的地点和配色，实时渲染。Mac 版还在路上。",
    "wallpaper.macPreviews": "Mac 壁纸预览",
    "wallpaper.placeTitle": "地点和排版随你选",
    "wallpaper.placeSubhead": "把你在意的地方排进屏幕里。",
    "wallpaper.themesTitle": "主题",
    "wallpaper.themesSubhead": "从淡墨到霓虹路线，每套配色都能实时预览。",
    "wallpaper.faqTitle": "常见问题",
    "wallpaper.faq.q1": "Here Wallpaper 免费吗？",
    "wallpaper.faq.a1": "下载免费。Pro 是包月或包年订阅。",
    "wallpaper.faq.q2": "Here Wallpaper 能做什么？",
    "wallpaper.faq.a2": "把你在意的地点做成地图壁纸。地点、主题、排版都可以选。",
    "wallpaper.faq.q3": "运行条件？",
    "wallpaper.faq.a3": "运行 iOS 26 或更高版本的 iPhone 或 iPad。Mac 应用上线后，需要 macOS 26 或更高版本。",
    "wallpaper.macSoon": "独立 Mac 应用即将上线。",
    "wallpaper.faq.q4": "Here Wallpaper 会收集个人数据吗？",
    "wallpaper.faq.a4": "没有分析、广告或追踪。只有你点定位时才会用到位置。",
    "wallpaper.faq.q5": "Pro 包含什么？",
    "wallpaper.faq.a5": "iCloud 同步、精选和自定义主题、字体、App 图标、额外地图图层，以及隐藏导出版权。",
    "wallpaper.faq.q6": "Mac 上能用吗？",
    "wallpaper.faq.a6": "还不行。独立 Mac 应用在做，一份 Pro 订阅会覆盖 iPhone、iPad 和 Mac。",

    "sidefy.subhead": "把今天的日程放在屏幕边缘。",
    "sidefy.preview": "应用预览",
    "sidefy.timelineTitle": "屏幕边缘上的一条时间线",
    "sidefy.timelineP1": "日历、提醒、RSS、GitHub 和插件事件都排在边上，一眼能看到。",
    "sidefy.timelineP2": "用快捷键切换，按住 Option 进入鼠标模式。位置、外观和密度都可以调。",
    "sidefy.quietTitle": "需要时才出现",
    "sidefy.quietSubhead": "体积很小，可以一直开着。数据存在 iCloud，应用本身不收集。",
    "sidefy.pluginsTitle": "插件",
    "sidefy.pluginsP1": "可以从内置插件开始，去市场逛，也可以接自己的数据源。",
    "sidefy.pluginsP2": "用规则筛选、把重要的钉在上面，也可以试试精选插件，比如 RSS、优惠和游戏。",
    "sidefy.faqTitle": "常见问题",
    "sidefy.faq.q1": "Here Sidefy 免费吗？",
    "sidefy.faq.a1": "有免费版。完整版在 Mac App Store 一次性买断，不用订阅。",
    "sidefy.faq.q2": "Here Sidefy 能做什么？",
    "sidefy.faq.a2": "把日历、提醒、RSS、GitHub 和插件事件排在 Mac 屏幕边缘。",
    "sidefy.faq.q3": "运行条件？",
    "sidefy.faq.a3": "macOS 14 或更高版本。",
    "sidefy.faq.q4": "Here Sidefy 会收集个人数据吗？",
    "sidefy.faq.a4": "不会。数据存在 iCloud，应用本身不收集。",
    "sidefy.faq.q5": "Here Sidefy 能对接哪些服务？",
    "sidefy.faq.a5": "日历、提醒、RSS 和 Atom、GitHub 动态，以及插件事件。",

    "island.subhead": "正在播放的音乐显示在 Mac 刘海里。",
    "island.previews": "应用预览",
    "island.notchTitle": "刘海里的播放器",
    "island.notchSubhead": "封面、歌名和歌手一直能看见，又不会挡住你干活。",
    "island.controlsTitle": "播放控制就在旁边",
    "island.controlsSubhead": "随机、切歌、暂停、循环都有，还有进度和可选的实时波形。",
    "island.faqTitle": "常见问题",
    "island.faq.q1": "Here Island 免费吗？",
    "island.faq.a1": "免费，开源，用的是 GPL v3。",
    "island.faq.q2": "它能做什么？",
    "island.faq.a2": "在刘海里显示正在播放的内容：封面、控制、进度，还可以打开实时波形。",
    "island.faq.q3": "运行条件？",
    "island.faq.a3": "macOS 26.0 或更高版本。",
    "island.faq.q4": "Here Island 会收集个人数据吗？",
    "island.faq.a4": "不会。它只在这台 Mac 上显示正在播放的内容。",

    "trmnl.subhead": "把电子墨水屏的画面映到桌面上。",
    "trmnl.preview": "应用预览",
    "trmnl.mirrorTitle": "桌面镜像",
    "trmnl.mirrorSubhead": "轮询显示 API，最新一帧一直留在桌面上，也不占 Dock。",
    "trmnl.layerTitle": "桌面图层",
    "trmnl.layerSubhead": "尺寸固定，角落你来选。它叠在壁纸上面、图标下面，点击会穿透。也可以手动刷新，并设成开机启动。",
    "trmnl.faqTitle": "常见问题",
    "trmnl.faq.q1": "Here TRMNL 免费吗？",
    "trmnl.faq.a1": "免费下载，源码也在 GitHub 上。",
    "trmnl.faq.q2": "Here TRMNL 能做什么？",
    "trmnl.faq.a2": "一个菜单栏应用，把 LaraPaper / TRMNL BYOS 的画面映到桌面上，夹在壁纸和图标之间，点击会穿透。",
    "trmnl.faq.q3": "运行条件？",
    "trmnl.faq.a3": "macOS 26.0 或更高，再加上 LaraPaper 兼容的 base URL、设备 ID 和令牌。",
    "trmnl.faq.q4": "Here TRMNL 会收集个人数据吗？",
    "trmnl.faq.a4": "不会。它只是把你自己的屏幕映到你自己的桌面上。",
    "trmnl.faq.q5": "在哪里获取？",
    "trmnl.faq.a5": "去 GitHub 下载最新版本即可。",

    "hackerba.subhead": "用论坛的排版来读 Hacker News。",
    "hackerba.previews": "扩展预览",
    "hackerba.tiebaTitle": "论坛样子的 HN",
    "hackerba.tiebaSubhead": "有积分、徽章、楼层和嵌套回复，内容还是 HN 的。",
    "hackerba.prefsTitle": "阅读方式自己定",
    "hackerba.prefsSubhead": "中文或英文、浅色或深色、蓝色或 HN 橙。密度和点击方式都可以调。",
    "hackerba.faqTitle": "常见问题",
    "hackerba.faq.q1": "Here HackerBa 免费吗？",
    "hackerba.faq.a1": "免费，开源，用的是 MIT 许可。",
    "hackerba.faq.q2": "它能做什么？",
    "hackerba.faq.a2": "Chrome 扩展，把 HN 排成贴吧那样的论坛。内容和账号都不变。",
    "hackerba.faq.q3": "运行条件？",
    "hackerba.faq.a3": "Chrome，以及能访问 news.ycombinator.com 的网络。",
    "hackerba.faq.q4": "Here HackerBa 会收集个人数据吗？",
    "hackerba.faq.a4": "不会。页面只在浏览器里重排。搜索会请求 Algolia 的 Hacker News API。",
    "hackerba.faq.q5": "如何安装？",
    "hackerba.faq.a5": "打开 Chrome 扩展页，加载未打包的扩展，再打开任意 HN 页面。",

    "links.subhead": "给自建 linkding 用的 iPhone 客户端。",
    "links.previews": "应用预览",
    "links.featuresTitle": "给 linkding 做的",
    "links.serversTitle": "服务器",
    "links.serversBody": "可以连一台服务器，也可以连多台，链接会合在同一条信息流里。",
    "links.shareTitle": "分享",
    "links.shareBody": "用分享扩展，从别的 App 里直接存。",
    "links.openTitle": "打开",
    "links.openBody": "可以在应用里阅读，也可以用令牌保存网页快照。",
    "links.faqTitle": "常见问题",
    "links.faq.q1": "Here Links 免费吗？",
    "links.faq.a1": "免费。",
    "links.faq.q2": "Here Links 能做什么？",
    "links.faq.a2": "自托管 linkding 的 iPhone 客户端。浏览、阅读、保存都在同一条信息流里。",
    "links.faq.a5": "<a href=\"https://linkding.link\" target=\"_blank\" rel=\"noopener noreferrer\">linkding</a> 是自托管的书签服务，体积小、速度快、也好部署。",
    "links.faq.q3": "运行条件？",
    "links.faq.a3": "运行 iOS 26 的 iPhone，再加上带 API 令牌的 linkding 服务器。",
    "links.faq.q4": "Here Links 会收集个人数据吗？",
    "links.faq.a4": "不会。它只和你自己的 linkding 服务器通信。",
    "links.faq.q5": "什么是 linkding？",
    "links.faq.q6": "可以连接多台服务器吗？",
    "links.faq.a6": "可以。一台或多台都可以，会合在同一条信息流里。",


    "themes.title": "主题",
    "themes.lead": "和 App 里同一套配色，用真实地图预览。基础主题免费，精选主题用 Pro 解锁。",
    "themes.layers": "图层",
    "themes.layersLabel": "地图图层",
    "themes.layersToggles": "图层开关",
    "themes.basic": "基础",
    "themes.basicLabel": "基础主题",
    "themes.featured": "精选",
    "themes.featuredLabel": "精选主题",
    "themes.loadError": "主题目录加载失败。请稍后再试。",
    "themes.layer.landcover": "地表覆盖",
    "themes.layer.landuse": "土地利用",
    "themes.layer.buildings": "建筑",
    "themes.layer.water": "水体与水道",
    "themes.layer.parks": "公园",
    "themes.layer.roads": "道路（高速公路等）",
    "themes.layer.rail": "轨道交通（铁路等）",
    "themes.layer.aeroway": "机场"
  };

  var EN_UI = {
    "nav.settings": "Settings",
    "nav.theme": "Theme",
    "nav.layout": "Layout",
    "nav.language": "Language",
    "nav.theme.system": "System",
    "nav.theme.dark": "Dark",
    "nav.theme.light": "Light",
    "nav.layout.grid": "Grid",
    "nav.layout.list": "List"
  };

  function getLang() {
    try {
      return window.localStorage.getItem(LANG_STORAGE_KEY) === "zh" ? "zh" : "en";
    } catch (error) {
      return "en";
    }
  }

  function t(key, lang) {
    lang = lang || getLang();
    if (lang === "zh" && Object.prototype.hasOwnProperty.call(ZH, key)) return ZH[key];
    if (Object.prototype.hasOwnProperty.call(EN_UI, key)) return EN_UI[key];
    return "";
  }

  function cache(el, name, value) {
    var dataKey = "i18nSrc" + name;
    if (el.dataset[dataKey] === undefined) el.dataset[dataKey] = value;
    return el.dataset[dataKey];
  }

  function firstTextNode(el) {
    for (var i = 0; i < el.childNodes.length; i++) {
      var node = el.childNodes[i];
      if (node.nodeType === 3 && node.textContent.trim()) return node;
    }
    return null;
  }

  function setText(el, value) {
    var node = firstTextNode(el);
    if (node) {
      cache(el, "Text", node.textContent);
      node.textContent = value;
      return;
    }
    cache(el, "Text", el.textContent);
    el.textContent = value;
  }

  function restoreText(el) {
    var original = el.dataset.i18nSrcText;
    if (original === undefined) return;
    var node = firstTextNode(el);
    if (node) node.textContent = original;
    else el.textContent = original;
  }

  function applyAttr(el, attr, value) {
    var cacheName = attr.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
    cache(el, cacheName.charAt(0).toUpperCase() + cacheName.slice(1), el.getAttribute(attr) || "");
    el.setAttribute(attr, value);
  }

  function restoreAttr(el, attr) {
    var cacheName = "i18nSrc" + attr.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }).replace(/^./, function (c) { return c.toUpperCase(); });
    var original = el.dataset[cacheName];
    if (original === undefined) return;
    el.setAttribute(attr, original);
  }

  function applyControlLabels(lang) {
    document.querySelectorAll("[data-theme-trigger]").forEach(function (el) {
      var label = t("nav.settings", lang) || "Settings";
      el.setAttribute("aria-label", label);
      var sr = el.querySelector(".sr-only");
      if (sr) sr.textContent = label;
    });
    document.querySelectorAll("[data-theme-option]").forEach(function (el) {
      var key = "nav.theme." + el.getAttribute("data-theme-option");
      var label = t(key, lang);
      if (!label) return;
      el.setAttribute("aria-label", label);
      el.setAttribute("title", label);
    });
    document.querySelectorAll("[data-layout-option]").forEach(function (el) {
      var key = "nav.layout." + el.getAttribute("data-layout-option");
      var label = t(key, lang);
      if (!label) return;
      el.setAttribute("aria-label", label);
      el.setAttribute("title", label);
    });
    document.querySelectorAll("[data-theme-option]").forEach(function (el) {
      var group = el.closest("[role='group']");
      if (group) group.setAttribute("aria-label", t("nav.theme", lang) || "Theme");
    });
    document.querySelectorAll("[data-layout-option]").forEach(function (el) {
      var group = el.closest("[role='group']");
      if (group) group.setAttribute("aria-label", t("nav.layout", lang) || "Layout");
    });
    document.querySelectorAll("[data-lang-option]").forEach(function (el) {
      var group = el.closest("[role='group']");
      if (group) group.setAttribute("aria-label", t("nav.language", lang) || "Language");
    });
  }

  function apply(lang) {
    lang = lang || getLang();
    var root = document.documentElement;
    root.lang = lang === "zh" ? "zh-Hans" : "en";
    if (lang === "zh") root.setAttribute("data-lang", "zh");
    else root.removeAttribute("data-lang");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (lang === "zh") {
        var value = ZH[key];
        if (value) setText(el, value);
      } else {
        restoreText(el);
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var chev = el.querySelector(":scope > .chev");
      if (lang === "zh") {
        var value = ZH[key];
        if (!value) return;
        cache(el, "Html", el.innerHTML);
        el.innerHTML = value;
        if (chev && !el.querySelector(":scope > .chev")) el.appendChild(chev);
      } else if (el.dataset.i18nSrcHtml !== undefined) {
        el.innerHTML = el.dataset.i18nSrcHtml;
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria-label");
      if (lang === "zh" && ZH[key]) applyAttr(el, "aria-label", ZH[key]);
      else restoreAttr(el, "aria-label");
    });

    document.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-content");
      if (lang === "zh" && ZH[key]) applyAttr(el, "content", ZH[key]);
      else restoreAttr(el, "content");
    });

    applyControlLabels(lang);
    root.classList.add("is-i18n-ready");
  }

  apply();

  global.LocusableI18n = {
    LANG_STORAGE_KEY: LANG_STORAGE_KEY,
    getLang: getLang,
    t: t,
    apply: apply
  };
})(window);

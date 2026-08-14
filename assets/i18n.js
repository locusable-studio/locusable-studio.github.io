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
    "crumb.plugins": "插件",
    "nav.comingSoon": "即将推出",
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
    "title.wallpaper": "Here Wallpaper — Locusable Studio",
    "title.wallpaper.themes": "Here Wallpaper — 主题",
    "title.wallpaper.privacy": "隐私政策 — Here Wallpaper",
    "title.sidefy": "Here Sidefy — Locusable Studio",
    "title.sidefy.plugins": "Here Sidefy — 精选插件",
    "title.sidefy.privacy": "隐私政策 — Here Sidefy",
    "title.island": "Here Island — Locusable Studio",
    "title.trmnl": "Here TRMNL — Locusable Studio",
    "title.hackerba": "Here HackerBa — Locusable Studio",
    "title.links": "Here Links — Locusable Studio",
    "title.links.privacy": "隐私政策 — Here Links",

    "meta.home": "Locusable Studio — 为日常设备，打磨专注工具。",
    "meta.about": "Locusable Studio。为日常设备，打磨专注工具。",
    "meta.comingSoon": "更多工具。即将到来。",

    "meta.wallpaper": "Here Wallpaper — 你的地点。你的壁纸。",
    "meta.wallpaper.themes": "Here Wallpaper 主题 — 基础与精选配色。",
    "meta.wallpaper.privacy": "Here Wallpaper 隐私政策 — Locusable Studio。",
    "meta.sidefy": "Here Sidefy — 你的日程。沿屏边缘。",
    "meta.sidefy.plugins": "Here Sidefy 官方精选插件 — RSS、优惠、游戏等。",
    "meta.sidefy.privacy": "Here Sidefy 隐私政策 — Locusable Studio。",
    "meta.island": "Here Island — 音乐。栖于刘海。",
    "meta.trmnl": "Here TRMNL — 你的屏。浮于桌面。",
    "meta.hackerba": "Here HackerBa — HN。化身论坛。",
    "meta.links": "Here Links — 你的书签。原生 iPhone。",
    "meta.links.privacy": "Here Links 隐私政策 — Locusable Studio。",

    "platform.iphoneIpad": "iPhone 和 iPad",
    "platform.iphoneIpadMac": "iPhone、iPad 与 Mac",
    "platform.mac": "Mac",
    "platform.chrome": "Chrome",
    "platform.iphoneSoon": "iPhone · 即将推出",

    "cta.appStore": "在 App Store 查看",
    "cta.website": "访问网站",
    "cta.download": "下载",
    "cta.github": "在 GitHub 查看",
    "cta.themes": "浏览主题",
    "cta.plugins": "浏览插件",
    "cta.soon": "即将推出",
    "cta.learnMore": "了解更多",

    "home.wallpaper.subhead": "你的地点。你的壁纸。",
    "home.wallpaper.tag.osm": "OpenStreetMap",
    "home.wallpaper.tag.maplibre": "MapLibre",
    "home.wallpaper.tag.sync": "iCloud 同步",
    "home.sidefy.subhead": "你的日程。沿屏边缘。",
    "home.island.subhead": "音乐。栖于刘海。",
    "home.trmnl.subhead": "你的屏。浮于桌面。",
    "home.hackerba.subhead": "HN。化身论坛。",
    "home.links.subhead": "你的书签。原生 iPhone。",

    "about.heroTitle": "为<em>已经在这里</em>的一切，打造工具。",
    "about.heroSubhead": "为日常设备。打磨专注工具。",
    "about.approachTitle": "被忽视的角落。自有价值。",
    "about.approachSubhead": "为被忽视的界面角落，打造专注的原生工具。",
    "about.moreTitle": "被忽略的空间，值得好工具",
    "about.moreBody": "刘海。屏幕边缘。壁纸与图标之间。这些被日常忽略的角落，恰恰是工具最能帮上忙的地方。我们为它们，打造专注的原生应用。",

    "wallpaper.subhead": "你的地点。你的壁纸。",
    "wallpaper.previews": "壁纸预览",
    "wallpaper.macTitle": "动态壁纸。为 Mac 而生。",
    "wallpaper.macSubhead": "同一地点。同一配色。实时渲染。Mac 版将至。",
    "wallpaper.macPreviews": "Mac 壁纸预览",
    "wallpaper.placeTitle": "地点。排版。随你。",
    "wallpaper.placeSubhead": "你在意的地方。为你的屏幕而生。",
    "wallpaper.themesTitle": "主题",
    "wallpaper.themesSubhead": "静谧墨色。霓虹路线。每套配色，实时预览。",
    "wallpaper.faqTitle": "常见问题",
    "wallpaper.faq.q1": "Here Wallpaper 免费吗？",
    "wallpaper.faq.a1": "免费下载。Pro 为包月或包年订阅。",
    "wallpaper.faq.q2": "Here Wallpaper 能做什么？",
    "wallpaper.faq.a2": "把你在意的地方变成地图壁纸。选地点、选主题、选排版。",
    "wallpaper.faq.q3": "运行条件？",
    "wallpaper.faq.a3": "iPhone 或 iPad。Mac 应用上线后，支持 macOS 26 或更高版本。",
    "wallpaper.macSoon": "独立 Mac 应用。即将上线。",
    "wallpaper.faq.q4": "Here Wallpaper 会收集个人数据吗？",
    "wallpaper.faq.a4": "没有分析、没有广告、没有追踪。仅在你点按定位控件时使用位置。",
    "wallpaper.faq.q5": "Pro 包含什么？",
    "wallpaper.faq.a5": "iCloud 同步。快捷指令。更多主题与字体。更多地图图层。可隐藏水印。",
    "wallpaper.faq.q6": "Mac 上能用吗？",
    "wallpaper.faq.a6": "即将支持 — 独立 Mac 应用在路上。一份 Pro 订阅，覆盖 iPhone、iPad 与 Mac。",

    "sidefy.subhead": "你的日程。沿屏边缘。",
    "sidefy.preview": "应用预览",
    "sidefy.timelineTitle": "一条边缘。一条时间线。",
    "sidefy.timelineP1": "日历。提醒。RSS。GitHub。插件事件。今日要闻，尽在视野。",
    "sidefy.timelineP2": "快捷键切换。Option 进入鼠标模式。位置、外观、密度。皆随你。",
    "sidefy.quietTitle": "安静。按需出现。",
    "sidefy.quietSubhead": "轻巧。需要时出现。数据存于 iCloud。应用不收集。",
    "sidefy.pluginsTitle": "插件",
    "sidefy.pluginsP1": "内置起步。逛遍市场。或接入自己的数据源。",
    "sidefy.pluginsP2": "规则筛选。置顶要闻。再逛精选插件 — RSS、优惠、游戏。",
    "sidefy.faqTitle": "常见问题",
    "sidefy.faq.q1": "Here Sidefy 免费吗？",
    "sidefy.faq.a1": "有免费版本。完整版在 Mac App Store 一次性买断 — 无需订阅。",
    "sidefy.faq.q2": "Here Sidefy 能做什么？",
    "sidefy.faq.a2": "把日历、提醒、RSS、GitHub 与插件事件，铺展在 Mac 屏幕边缘。",
    "sidefy.faq.q3": "运行条件？",
    "sidefy.faq.a3": "macOS 14 或更高版本。",
    "sidefy.faq.q4": "运行条件？",
    "sidefy.faq.a4": "macOS 14 或更高版本。",
    "sidefy.faq.q5": "Here Sidefy 能对接哪些服务？",
    "sidefy.faq.a5": "日历。提醒。RSS 与 Atom。GitHub 动态。插件事件。尽收边缘。",

    "island.subhead": "音乐。栖于刘海。",
    "island.previews": "应用预览",
    "island.notchTitle": "音乐。在刘海。",
    "island.notchSubhead": "封面。标题。歌手。始终可见。从不挡路。",
    "island.controlsTitle": "播放。触手可及。",
    "island.controlsSubhead": "随机。切歌。暂停。循环。进度与实时波形，一并奉上。",
    "island.faqTitle": "常见问题",
    "island.faq.q1": "Here Island 免费吗？",
    "island.faq.a1": "免费且开源 — 采用 GPL v3 许可。",
    "island.faq.q2": "它能做什么？",
    "island.faq.a2": "专注的刘海媒体伴侣。封面、控制、进度。可选实时波形。",
    "island.faq.q3": "运行条件？",
    "island.faq.a3": "macOS 26.0 或更高版本。",
    "island.faq.q4": "Here Island 会收集个人数据吗？",
    "island.faq.a4": "不会。它只在本机展示正在播放的内容。",

    "trmnl.subhead": "你的屏。浮于桌面。",
    "trmnl.preview": "应用预览",
    "trmnl.mirrorTitle": "桌面镜像",
    "trmnl.mirrorSubhead": "轮询显示 API。最新画面常驻。无需 Dock 图标。",
    "trmnl.layerTitle": "桌面图层",
    "trmnl.layerSubhead": "固定尺寸。角落就位。壁纸之上。图标之下。点击穿透。支持手动刷新与开机启动。",
    "trmnl.faqTitle": "常见问题",
    "trmnl.faq.q1": "Here TRMNL 免费吗？",
    "trmnl.faq.a1": "免费下载。源码开源。",
    "trmnl.faq.q2": "Here TRMNL 能做什么？",
    "trmnl.faq.a2": "菜单栏应用。BYOS 画面镜像桌面。壁纸与图标之间。点击穿透。",
    "trmnl.faq.q3": "运行条件？",
    "trmnl.faq.a3": "macOS 26.0 或更高。兼容 LaraPaper 的 base URL、设备 ID 与令牌。",
    "trmnl.faq.q4": "Here TRMNL 会收集个人数据吗？",
    "trmnl.faq.a4": "不会。它只把你的屏幕，镜像到你的桌面。",
    "trmnl.faq.q5": "在哪里获取？",
    "trmnl.faq.a5": "GitHub 下载最新版本即可。",

    "hackerba.subhead": "HN。化身论坛。",
    "hackerba.previews": "扩展预览",
    "hackerba.tiebaTitle": "HN。论坛形态。",
    "hackerba.tiebaSubhead": "积分。徽章。楼层。嵌套回复。内容，依然是 HN。",
    "hackerba.prefsTitle": "阅读。由你。",
    "hackerba.prefsSubhead": "中文或英文。浅色或深色。蓝或 HN 橙。密度与点击，皆可调。",
    "hackerba.faqTitle": "常见问题",
    "hackerba.faq.q1": "Here HackerBa 免费吗？",
    "hackerba.faq.a1": "免费且开源 — 采用 MIT 许可。",
    "hackerba.faq.q2": "它能做什么？",
    "hackerba.faq.a2": "Chrome 扩展。HN 变身贴吧式论坛。内容与账号不变。",
    "hackerba.faq.q3": "运行条件？",
    "hackerba.faq.a3": "Chrome，以及能访问 news.ycombinator.com 的网络。",
    "hackerba.faq.q4": "Here HackerBa 会收集个人数据吗？",
    "hackerba.faq.a4": "不会。它只重排页面 — 数据不出浏览器。",
    "hackerba.faq.q5": "如何安装？",
    "hackerba.faq.a5": "Chrome 扩展页。加载未打包扩展。打开任意 HN 页面。",

    "links.subhead": "你的书签。原生 iPhone。",
    "links.previews": "应用预览",
    "links.featuresTitle": "为 linkding 而生",
    "links.serversTitle": "服务器",
    "links.serversBody": "一台。或多台。所有链接，汇于一览。",
    "links.shareTitle": "分享",
    "links.shareBody": "分享扩展。从任意应用。一键保存。",
    "links.openTitle": "打开",
    "links.openBody": "应用内阅读。令牌保存快照。",
    "links.faqTitle": "常见问题",
    "links.faq.q1": "Here Links 免费吗？",
    "links.faq.a1": "免费。",
    "links.faq.q2": "Here Links 能做什么？",
    "links.faq.a2": "<a href=\"https://linkding.link\" target=\"_blank\" rel=\"noopener noreferrer\">linkding</a>。自托管。精简、快速、易部署。",
    "links.faq.q3": "运行条件？",
    "links.faq.a3": "运行 iOS 26 的 iPhone 或 iPad，以及带 API 令牌的 linkding 服务器。",
    "links.faq.q4": "Here Links 会收集个人数据吗？",
    "links.faq.a4": "不会。它只与你自有的 linkding 服务器通信。",
    "links.faq.q5": "什么是 linkding？",
    "links.faq.q6": "可以连接多台服务器吗？",
    "links.faq.a6": "可以。一台或多台。同一条信息流。",

    "plugins.title": "精选插件",
    "plugins.lead": "Sidefy 官方精选社区插件。RSS。优惠。游戏。点开卡片，直达源码。",
    "plugins.listLabel": "精选插件",

    "themes.title": "主题",
    "themes.lead": "同一套配色。真实地图预览。基础免费。精选，Pro 解锁。",
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

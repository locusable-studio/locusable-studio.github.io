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

    "meta.home": "Locusable Studio — 为日常设备打造的专注独立工具。",
    "meta.about": "Locusable Studio 为日常设备打造专注的工具。",
    "meta.comingSoon": "Locusable Studio 还有更多工具即将推出。",

    "meta.wallpaper": "Here Wallpaper — 地图壁纸，可挑选地点、主题与排版。",
    "meta.wallpaper.themes": "Here Wallpaper 主题预览 — 基础与精选配色。",
    "meta.wallpaper.privacy": "Locusable Studio 出品的 Here Wallpaper 隐私政策。",
    "meta.sidefy": "Here Sidefy — Mac 屏幕边缘枢纽，汇聚日历、提醒、RSS、GitHub 与插件。",
    "meta.sidefy.plugins": "Here Sidefy 官方精选社区插件 — RSS、优惠、游戏等。",
    "meta.sidefy.privacy": "Locusable Studio 出品的 Here Sidefy 隐私政策。",
    "meta.island": "Here Island — 专注的 macOS 刘海媒体伴侣，实时显示正在播放的内容。",
    "meta.trmnl": "Here TRMNL — macOS 菜单栏应用，将 LaraPaper / TRMNL BYOS 画面镜像至壁纸与桌面图标之间。",
    "meta.hackerba": "Here HackerBa — 将 Hacker News 改造成贴吧式阅读体验的 Chrome 扩展。",
    "meta.links": "Here Links — 自托管 linkding 的原生 iPhone 客户端。",
    "meta.links.privacy": "Locusable Studio 出品的 Here Links 隐私政策。",

    "platform.iphoneIpad": "iPhone 和 iPad",
    "platform.mac": "Mac",
    "platform.chrome": "Chrome",
    "platform.iphoneSoon": "iPhone · 即将推出",

    "cta.appStore": "前往 App Store",
    "cta.website": "网站",
    "cta.download": "下载",
    "cta.github": "前往 GitHub",
    "cta.themes": "浏览主题",
    "cta.plugins": "浏览插件",
    "cta.soon": "即将推出",
    "cta.learnMore": "了解更多",

    "home.wallpaper.subhead": "把你在意的地方，变成地图壁纸。",
    "home.sidefy.subhead": "日历、提醒、RSS 和插件，汇聚在 Mac 屏幕边缘。",
    "home.island.subhead": "MacBook 刘海里的专注媒体伴侣。",
    "home.trmnl.subhead": "你的 LaraPaper / TRMNL 画面，置于壁纸与桌面图标之间。",
    "home.hackerba.subhead": "Hacker News，变身贴吧式论坛。",
    "home.links.subhead": "你的自托管 linkding，原生 iPhone 体验。",

    "about.heroTitle": "为<em>已经在这里</em>的一切，打造工具。",
    "about.heroSubhead": "为日常设备打造的专注工具。",
    "about.approachTitle": "被忽视的角落，好用的工具",
    "about.approachSubhead": "Locusable Studio 专注于被忽视的界面角落，打造原生工具。",
    "about.productsTitle": "产品",
    "about.wallpaper": "把你在意的地方，变成地图壁纸。",
    "about.sidefy": "日历、提醒、RSS 和插件，汇聚在 Mac 屏幕边缘。",
    "about.island": "MacBook 刘海里的专注媒体伴侣。",
    "about.trmnl": "你的 LaraPaper / TRMNL 画面，置于壁纸与桌面图标之间。",
    "about.hackerba": "Hacker News，变身贴吧式论坛。",
    "about.links": "即将推出 — 你的自托管 linkding，原生 iPhone 体验。",

    "wallpaper.subhead": "把你在意的地方，变成地图壁纸。",
    "wallpaper.previews": "壁纸预览",
    "wallpaper.placeTitle": "地点与排版",
    "wallpaper.placeSubhead": "选一座城市，或一个你在意的地点，作为你的壁纸；再调整字体与构图，贴合你的屏幕。",
    "wallpaper.themesTitle": "主题",
    "wallpaper.themesSubhead": "基础与精选配色 — 从静谧墨色到霓虹路线，用应用内同款方图预览。",
    "wallpaper.faqTitle": "常见问题",
    "wallpaper.faq.q1": "Here Wallpaper 免费吗？",
    "wallpaper.faq.a1": "Here Wallpaper 可免费下载，Here Wallpaper Pro 提供包月或包年订阅。",
    "wallpaper.faq.q2": "Here Wallpaper Pro 包含什么？",
    "wallpaper.faq.a2": "Pro 增加收藏内容的 iCloud 同步、快捷指令支持、更多主题与字体、更多地图图层，以及隐藏导出水印的选项。",
    "wallpaper.faq.q3": "地图数据从哪里来？",
    "wallpaper.faq.a3": "地图数据来自 OpenStreetMap 及相关开放项目，由 MapLibre 渲染呈现。",
    "wallpaper.macSoon": "独立 Mac 应用即将上线。",
    "wallpaper.faq.q4": "Mac 上能用吗？",
    "wallpaper.faq.a4": "还不能。独立 Mac 应用即将上线，上线后与 iPhone、iPad 共用一份 Pro 订阅。",

    "sidefy.subhead": "日历、提醒、RSS 和插件，汇聚在 Mac 屏幕边缘。",
    "sidefy.preview": "应用预览",
    "sidefy.timelineTitle": "一个边缘，一条时间线",
    "sidefy.timelineP1": "系统日历与提醒，和 RSS、GitHub、插件事件排在一起 — 今天的重要信息始终在视线之内。",
    "sidefy.timelineP2": "用快捷键在气泡间切换，或按住 Option 进入鼠标模式；边缘位置、外观和密度都能按你的工作方式调整。",
    "sidefy.quietTitle": "专注时刻，保持安静",
    "sidefy.quietSubhead": "在 macOS 14 及更高版本上运行轻盈，需要时才会出现；数据存储在 iCloud — 应用不收集个人信息。",
    "sidefy.pluginsTitle": "插件",
    "sidefy.pluginsP1": "从内置功能开始，逛遍插件市场，或接入你自己的数据源。",
    "sidefy.pluginsP2": "用规则筛选并置顶重要内容 — 再去看看官方精选插件，涵盖 RSS、优惠、游戏等更多类别。",
    "sidefy.faqTitle": "常见问题",
    "sidefy.faq.q1": "Here Sidefy 如何收费？",
    "sidefy.faq.a1": "Here Sidefy 在 Mac App Store 一次性买断，无需订阅。",
    "sidefy.faq.q2": "Here Sidefy 能对接哪些服务？",
    "sidefy.faq.a2": "Here Sidefy 将日历、提醒、RSS 与 Atom 订阅、GitHub 动态，以及插件事件，统一收纳在 Mac 屏幕边缘。",
    "sidefy.faq.q3": "Here Sidefy 会收集个人数据吗？",
    "sidefy.faq.a3": "不会。你的数据存储在 iCloud 中，应用本身不收集任何个人信息。",

    "island.subhead": "MacBook 刘海里的专注媒体伴侣。",
    "island.previews": "应用预览",
    "island.notchTitle": "音乐，就在刘海里",
    "island.notchSubhead": "封面、标题和艺人信息，稳稳停留在屏幕顶端 — 不会遮挡你的桌面。",
    "island.controlsTitle": "播放控制，触手可及",
    "island.controlsSubhead": "随机播放、上一首、播放/暂停、下一首、循环 — 还有播放进度，以及可选的实时波形。",
    "island.faqTitle": "常见问题",
    "island.faq.q1": "Here Island 是免费开源的吗？",
    "island.faq.a1": "是的。Here Island 完全免费，并以 GNU 通用公共许可证 v3.0（GPLv3）开源。",
    "island.faq.q2": "Here Island 能做什么？",
    "island.faq.a2": "Here Island 是一款专注的 macOS 刘海媒体伴侣，显示专辑封面、曲目信息、播放控制与进度，并支持可选的实时波形。",
    "island.faq.q3": "运行它需要什么条件？",
    "island.faq.a3": "Here Island 需要 macOS 26.0 或更高版本。",

    "trmnl.subhead": "你的 LaraPaper / TRMNL 画面，置于壁纸与桌面图标之间。",
    "trmnl.preview": "应用预览",
    "trmnl.mirrorTitle": "桌面镜像",
    "trmnl.mirrorSubhead": "轮询你的 BYOS 显示 API，持续呈现最新的电子墨水画面 — 没有 Dock 图标，安静运行。",
    "trmnl.layerTitle": "桌面图层",
    "trmnl.layerSubhead": "以固定尺寸，将画面定位到所选显示器的某个角落 — 悬浮于壁纸之上、Finder 图标之下，点击可穿透。支持手动刷新、显示色调调整，以及登录时自动启动。",
    "trmnl.liveTitle": "屏幕，实时呈现",
    "trmnl.liveSubhead": "一台忠实的电子墨水预览 — 展示 TRMNL 屏幕此刻在显示什么，并按服务器的间隔自动刷新。",
    "trmnl.ev1": "团队站会",
    "trmnl.ev2": "设计评审",
    "trmnl.ev3": "晚餐",
    "trmnl.refresh": "刷新",
    "trmnl.status": "自动刷新",
    "trmnl.statusNow": "刚刚更新",
    "trmnl.faqTitle": "常见问题",
    "trmnl.faq.q1": "Here TRMNL 现在可以使用了吗？",
    "trmnl.faq.a1": "可以。从 GitHub 下载最新版本即可开始使用。",
    "trmnl.faq.q2": "它是免费的还是开源的？",
    "trmnl.faq.a2": "都是。Here TRMNL 免费下载，源代码同样开放在 GitHub 上。",
    "trmnl.faq.q3": "Here TRMNL 具体做什么？",
    "trmnl.faq.a3": "Here TRMNL 是一款 macOS 菜单栏应用，将 LaraPaper / TRMNL BYOS 画面镜像至壁纸与桌面图标之间，点击可以直接穿透。",
    "trmnl.faq.q4": "运行它需要什么？",
    "trmnl.faq.a4": "macOS 26.0 或更高版本，以及一个兼容 LaraPaper 的 base URL、设备 ID 和访问令牌。",

    "hackerba.subhead": "Hacker News，变身贴吧式论坛。",
    "hackerba.previews": "扩展预览",
    "hackerba.tiebaTitle": "论坛化的 HN",
    "hackerba.tiebaSubhead": "积分、徽章、楼层与嵌套回复 — 内容依然来自 Hacker News 本身。",
    "hackerba.prefsTitle": "你的阅读方式",
    "hackerba.prefsSubhead": "中文或英文界面，浅色或深色主题，蓝色或 HN 经典橙色 — 还能调整信息密度与点击行为。",
    "hackerba.faqTitle": "常见问题",
    "hackerba.faq.q1": "Here HackerBa 是免费开源的吗？",
    "hackerba.faq.a1": "是的。Here HackerBa 完全免费，并以 MIT 许可证开源。",
    "hackerba.faq.q2": "Here HackerBa 能做什么？",
    "hackerba.faq.a2": "Here HackerBa 是一款 Chrome 扩展程序，将 Hacker News 改造为贴吧式论坛，同时保留 HN 原有的内容与账号体系。",
    "hackerba.faq.q3": "如何安装？",
    "hackerba.faq.a3": "在 Chrome 扩展程序页面加载 GitHub 仓库中的未打包扩展，然后打开任意 news.ycombinator.com 页面即可。",

    "links.subhead": "你的自托管 linkding，原生 iPhone 体验。",
    "links.previews": "应用预览",
    "links.featuresTitle": "为 linkding 而生",
    "links.serversTitle": "服务器",
    "links.serversBody": "连接一台或多台 linkding 实例，在统一的时间线中浏览。",
    "links.shareTitle": "分享",
    "links.shareBody": "通过分享扩展，从其他 App 一键保存链接。",
    "links.openTitle": "打开",
    "links.openBody": "用内置 Safari 阅读全文，用你的令牌下载页面快照。",
    "links.faqTitle": "常见问题",
    "links.faq.q1": "Here Links 是免费的吗？",
    "links.faq.a1": "是的，Here Links 可免费使用。",
    "links.faq.q2": "什么是 linkding？",
    "links.faq.a2": "<a href=\"https://linkding.link\" target=\"_blank\" rel=\"noopener noreferrer\">linkding</a> 是一款自托管书签管理器，设计目标是精简、快速、易于部署。",
    "links.faq.q3": "可以连接多台服务器吗？",
    "links.faq.a3": "可以。Here Links 支持连接一台或多台 linkding，并在统一的时间线中显示。",

    "plugins.title": "精选插件",
    "plugins.lead": "来自 Sidefy 官方展示页的社区插件，涵盖 RSS、优惠、游戏等更多类别。点击卡片即可查看 GitHub 源码。",
    "plugins.listLabel": "精选插件",

    "themes.title": "主题",
    "themes.lead": "与应用内同款配色，基于真实 OpenStreetMap 地图预览效果。基础主题免费，精选主题需 Pro 解锁。",
    "themes.layers": "图层",
    "themes.layersLabel": "地图图层",
    "themes.layersToggles": "地图图层开关",
    "themes.basic": "基础",
    "themes.basicLabel": "基础主题",
    "themes.featured": "精选",
    "themes.featuredLabel": "精选主题",
    "themes.loadError": "无法加载主题目录，请稍后重试。",
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

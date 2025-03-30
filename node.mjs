var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/utils/node/mdPlugins.ts
import { createRequire } from "module";

// node_modules/.pnpm/vitepress-plugin-tabs@0.2.0_85968ed900cff2a7cc5fe797763335dc/node_modules/vitepress-plugin-tabs/dist/index.js
var tabsMarker = "=tabs";
var tabsMarkerLen = tabsMarker.length;
var ruleBlockTabs = (state, startLine, endLine, silent) => {
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  let pos = state.bMarks[startLine] + state.tShift[startLine];
  let max = state.eMarks[startLine];
  if (pos + 3 > max) {
    return false;
  }
  const marker = state.src.charCodeAt(pos);
  if (marker !== 58) {
    return false;
  }
  const mem = pos;
  pos = state.skipChars(pos, marker);
  let len = pos - mem;
  if (len < 3) {
    return false;
  }
  if (state.src.slice(pos, pos + tabsMarkerLen) !== tabsMarker) {
    return false;
  }
  pos += tabsMarkerLen;
  if (silent) {
    return true;
  }
  const markup = state.src.slice(mem, pos);
  const params = state.src.slice(pos, max);
  let nextLine = startLine;
  let haveEndMarker = false;
  for (; ; ) {
    nextLine++;
    if (nextLine >= endLine) {
      break;
    }
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    const mem2 = pos;
    max = state.eMarks[nextLine];
    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      break;
    }
    if (state.src.charCodeAt(pos) !== marker) {
      continue;
    }
    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      continue;
    }
    pos = state.skipChars(pos, marker);
    if (pos - mem2 < len) {
      continue;
    }
    pos = state.skipSpaces(pos);
    if (pos < max) {
      continue;
    }
    haveEndMarker = true;
    break;
  }
  len = state.sCount[startLine];
  state.line = nextLine + (haveEndMarker ? 1 : 0);
  const token = state.push("tabs", "div", 0);
  token.info = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup = markup;
  token.map = [startLine, state.line];
  return true;
};
var tabBreakRE = /^\s*::(.+)$/;
var forbiddenCharsInSlotNames = /[ '"]/;
var parseTabBreakLine = (line) => {
  const m = line.match(tabBreakRE);
  if (!m)
    return null;
  const trimmed = m[1].trim();
  if (forbiddenCharsInSlotNames.test(trimmed)) {
    throw new Error(
      `contains forbidden chars in slot names (space and quotes) (${JSON.stringify(
        line
      )})`
    );
  }
  return trimmed;
};
var lastLineBreakRE = /\n$/;
var parseTabsContent = (content) => {
  const lines = content.replace(lastLineBreakRE, "").split("\n");
  const tabInfos = [];
  const tabLabels = /* @__PURE__ */ new Set();
  let currentTab = null;
  const createTabInfo = (label) => {
    if (tabLabels.has(label)) {
      throw new Error(`a tab labelled ${JSON.stringify(label)} already exists`);
    }
    const newTab = { label, content: [] };
    tabInfos.push(newTab);
    tabLabels.add(label);
    return newTab;
  };
  for (const line of lines) {
    const tabLabel = parseTabBreakLine(line);
    if (currentTab === null) {
      if (tabLabel === null) {
        throw new Error(
          `tabs should start with \`::\${tabLabel}\` (e.g. "::foo"). (received: ${JSON.stringify(
            line
          )})`
        );
      }
      currentTab = createTabInfo(tabLabel);
      continue;
    }
    if (tabLabel === null) {
      currentTab.content.push(line);
    } else {
      currentTab = createTabInfo(tabLabel);
    }
  }
  if (tabInfos.length < 0) {
    throw new Error("tabs should include at least one tab");
  }
  return tabInfos.map((info) => ({
    label: info.label,
    content: info.content.join("\n").replace(lastLineBreakRE, "")
  }));
};
var parseParams = (input) => {
  if (!input.startsWith("=")) {
    return {
      shareStateKey: void 0
    };
  }
  const splitted = input.split("=");
  return {
    shareStateKey: splitted[1]
  };
};
var tabsPlugin = (md) => {
  md.block.ruler.before("fence", "=tabs", ruleBlockTabs, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules.tabs = (tokens, index, _options, env) => {
    const token = tokens[index];
    const tabs = parseTabsContent(token.content);
    const renderedTabs = tabs.map((tab) => ({
      label: tab.label,
      content: md.render(tab.content, env)
    }));
    const params = parseParams(token.info);
    const tabLabelsProp = `:tabLabels="${md.utils.escapeHtml(
      JSON.stringify(tabs.map((tab) => tab.label))
    )}"`;
    const shareStateKeyProp = params.shareStateKey ? `sharedStateKey="${md.utils.escapeHtml(params.shareStateKey)}"` : "";
    const slots = renderedTabs.map(
      (tab) => `<template #${tab.label}>${tab.content}</template>`
    );
    return `<PluginTabs ${tabLabelsProp} ${shareStateKeyProp}>${slots.join(
      ""
    )}</PluginTabs>`;
  };
};

// src/utils/node/mdPlugins.ts
import timeline from "vitepress-markdown-timeline";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";

// src/utils/node/index.ts
import path2 from "node:path";

// src/utils/global/fs.ts
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawn } from "cross-spawn";
import matter from "gray-matter";

// node_modules/.pnpm/yocto-queue@1.2.1/node_modules/yocto-queue/index.js
var Node = class {
  value;
  next;
  constructor(value) {
    this.value = value;
  }
};
var Queue = class {
  #head;
  #tail;
  #size;
  constructor() {
    this.clear();
  }
  enqueue(value) {
    const node = new Node(value);
    if (this.#head) {
      this.#tail.next = node;
      this.#tail = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#size++;
  }
  dequeue() {
    const current = this.#head;
    if (!current) {
      return;
    }
    this.#head = this.#head.next;
    this.#size--;
    return current.value;
  }
  peek() {
    if (!this.#head) {
      return;
    }
    return this.#head.value;
  }
  clear() {
    this.#head = void 0;
    this.#tail = void 0;
    this.#size = 0;
  }
  get size() {
    return this.#size;
  }
  *[Symbol.iterator]() {
    let current = this.#head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
  *drain() {
    while (this.#head) {
      yield this.dequeue();
    }
  }
};

// node_modules/.pnpm/p-limit@4.0.0/node_modules/p-limit/index.js
function pLimit(concurrency) {
  if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  }
  const queue = new Queue();
  let activeCount = 0;
  const next = () => {
    activeCount--;
    if (queue.size > 0) {
      queue.dequeue()();
    }
  };
  const run = async (fn, resolve, args) => {
    activeCount++;
    const result = (async () => fn(...args))();
    resolve(result);
    try {
      await result;
    } catch {
    }
    next();
  };
  const enqueue = (fn, resolve, args) => {
    queue.enqueue(run.bind(void 0, fn, resolve, args));
    (async () => {
      await Promise.resolve();
      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };
  const generator = (fn, ...args) => new Promise((resolve) => {
    enqueue(fn, resolve, args);
  });
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.size
    },
    clearQueue: {
      value: () => {
        queue.clear();
      }
    }
  });
  return generator;
}

// src/utils/global/fs.ts
var timeLimit = pLimit(+(process.env.P_LIMT_MAX || os.cpus().length));
function getDefaultTitle(content) {
  const match = content.match(/^(#+)\s+(.+)/m);
  return match?.[2] || "";
}
var cache = /* @__PURE__ */ new Map();
async function getFileLastModifyTime(url) {
  const cached = cache.get(url);
  if (cached) {
    return cached;
  }
  let date = await timeLimit(() => getFileLastModifyTimeByGit(url));
  if (!date) {
    date = await getFileLastModifyTimeByFs(url);
  }
  if (date) {
    cache.set(url, date);
  }
  return date;
}
function getFileLastModifyTimeByGit(url) {
  return new Promise((resolve) => {
    const cwd = path.dirname(url);
    try {
      const fileName = path.basename(url);
      const child = spawn("git", ["log", "-1", '--pretty="%ai"', fileName], {
        cwd
      });
      let output = "";
      child.stdout.on("data", (d) => output += String(d));
      child.on("close", async () => {
        let date;
        if (output.trim()) {
          date = new Date(output);
        }
        resolve(date);
      });
      child.on("error", async () => {
        resolve(void 0);
      });
    } catch {
      resolve(void 0);
    }
  });
}
async function getFileLastModifyTimeByFs(url) {
  try {
    const fsStat = await fs.promises.stat(url);
    return fsStat.mtime;
  } catch {
    return void 0;
  }
}
function joinPath(base, path4) {
  return `${base}${path4}`.replace(/\/+/g, "/");
}
var grayMatter = matter;
function getTextSummary(text, count = 100) {
  return text?.replace(/^#+\s+.*/, "")?.replace(/#/g, "")?.replace(/!\[.*?\]\(.*?\)/g, "")?.replace(/\[(.*?)\]\(.*?\)/g, "$1")?.replace(/\*\*(.*?)\*\*/g, "$1")?.split("\n")?.filter((v) => !!v)?.join("\n")?.replace(/>(.*)/, "")?.replace(/</g, "&lt;").replace(/>/g, "&gt;")?.trim()?.slice(0, count);
}
var windowsSlashRE = /\\/g;
var isWindows = os.platform() === "win32";
function slash(p) {
  return p.replace(windowsSlashRE, "/");
}
function normalizePath(id) {
  return path.posix.normalize(isWindows ? slash(id) : id);
}

// src/utils/node/index.ts
function aliasObjectToArray(obj) {
  return Object.entries(obj).map(([find, replacement]) => ({
    find,
    replacement
  }));
}
function isBase64ImageURL(url) {
  const regex = /^data:image\/[a-z]+;base64,/;
  return regex.test(url);
}
var imageRegex = /!\[.*?\]\((.*?)\s*(".*?")?\)/;
function getFirstImagURLFromMD(content, route) {
  const url = content.match(imageRegex)?.[1];
  const isHTTPSource = url && url.startsWith("http");
  if (!url) {
    return "";
  }
  if (isHTTPSource || isBase64ImageURL(url)) {
    return url;
  }
  const paths = joinPath("/", route).split("/");
  paths.splice(paths.length - 1, 1);
  const relativePath = url.startsWith("/") ? url : path2.join(paths.join("/") || "", url);
  return joinPath("/", relativePath);
}
function debounce(func, delay = 1e3) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...rest);
    }, delay);
  };
}
function isEqual(obj1, obj2, excludeKeys = []) {
  const keys1 = Object.keys(obj1).filter((key) => !excludeKeys.includes(key));
  const keys2 = Object.keys(obj2).filter((key) => !excludeKeys.includes(key));
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !isEqual(val1, val2, excludeKeys) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
}
function isObject(obj) {
  return obj != null && typeof obj === "object";
}

// src/utils/node/mdPlugins.ts
function _require(module) {
  return (typeof import.meta?.url !== "undefined" ? createRequire(import.meta.url) : __require)(module);
}
function getMarkdownPlugins(cfg) {
  const markdownPlugin = [];
  if (cfg?.tabs !== false) {
    markdownPlugin.push(tabsPlugin);
  }
  if (cfg?.mermaid !== false) {
    const { MermaidMarkdown } = _require("vitepress-plugin-mermaid");
    markdownPlugin.push(MermaidMarkdown);
  }
  if (cfg?.taskCheckbox !== false) {
    markdownPlugin.push(taskCheckboxPlugin(typeof cfg?.taskCheckbox === "boolean" ? {} : cfg?.taskCheckbox));
  }
  if (cfg?.timeline !== false) {
    markdownPlugin.push(timeline);
  }
  markdownPlugin.push(groupIconMdPlugin);
  return markdownPlugin;
}
function taskCheckboxPlugin(ops) {
  return (md) => {
    md.use(_require("markdown-it-task-checkbox"), ops);
  };
}
function registerMdPlugins(vpCfg, plugins) {
  if (plugins.length) {
    vpCfg.markdown = {
      config(...rest) {
        plugins.forEach((plugin) => {
          plugin?.(...rest);
        });
      }
    };
  }
}
function patchMermaidPluginCfg(config) {
  if (!config.vite.resolve)
    config.vite.resolve = {};
  if (!config.vite.resolve.alias)
    config.vite.resolve.alias = {};
  config.vite.resolve.alias = [
    ...aliasObjectToArray({
      ...config.vite.resolve.alias,
      "cytoscape/dist/cytoscape.umd.js": "cytoscape/dist/cytoscape.esm.js",
      "mermaid": "mermaid/dist/mermaid.esm.mjs"
    }),
    { find: /^dayjs\/(.*).js/, replacement: "dayjs/esm/$1" }
  ];
}
function patchOptimizeDeps(config) {
  if (!config.vite.optimizeDeps) {
    config.vite.optimizeDeps = {};
  }
  config.vite.optimizeDeps.exclude = ["vitepress-plugin-tabs", "@ort/vitepress-theme"];
  config.vite.optimizeDeps.include = ["element-plus"];
}

// src/utils/node/theme.ts
import fs3 from "node:fs";

// src/utils/global/vitepress.ts
import path3 from "path";
import fs2 from "node:fs";
function getVitePressPages(vpConfig) {
  const { pages, dynamicRoutes, rewrites } = vpConfig;
  const result = [];
  for (const page of pages) {
    const rewritePath = rewrites.map[page];
    const isRewrite = !!rewritePath;
    const originRoute = `/${normalizePath(page).replace(/\.md$/, "")}`;
    const rewriteRoute = rewritePath ? `/${normalizePath(rewritePath).replace(/\.md$/, "")}` : "";
    const dynamicRoute = dynamicRoutes?.routes?.find((r) => r.path === page);
    const isDynamic = !!dynamicRoute;
    const route = rewriteRoute || originRoute;
    const filepath = isDynamic ? normalizePath(path3.resolve(vpConfig.srcDir, dynamicRoute.route)) : normalizePath(`${vpConfig.srcDir}/${page}`);
    result.push({
      page,
      route,
      isRewrite,
      isDynamic,
      filepath,
      originRoute,
      rewriteRoute,
      dynamicRoute,
      rewritePath
    });
  }
  return result;
}
function renderDynamicMarkdown(routeFile, params, content) {
  let baseContent = fs2.readFileSync(routeFile, "utf-8");
  if (content) {
    baseContent = baseContent.replace(/<!--\s*@content\s*-->/, content);
  }
  return baseContent.replace(/\{\{(.*?)\}\}/g, (all, $1) => {
    const key = $1?.trim?.() || "";
    if (key.startsWith("$params")) {
      const value = key.split(".").reduce((prev, curr) => {
        if (prev !== null && typeof prev === "object") {
          return prev[curr];
        }
        return void 0;
      }, { $params: params });
      return value;
    }
    return all;
  });
}

// src/utils/client/index.ts
function formatDate(d, fmt = "yyyy-MM-dd hh:mm:ss") {
  if (!(d instanceof Date)) {
    d = new Date(d);
  }
  const o = {
    "M+": d.getMonth() + 1,
    // 月份
    "d+": d.getDate(),
    // 日
    "h+": d.getHours(),
    // 小时
    "m+": d.getMinutes(),
    // 分
    "s+": d.getSeconds(),
    // 秒
    "q+": Math.floor((d.getMonth() + 3) / 3),
    // 季度
    "S": d.getMilliseconds()
    // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${d.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  }
  return fmt;
}

// src/utils/node/theme.ts
function patchDefaultThemeSideBar(cfg) {
  return cfg?.blog !== false && cfg?.recommend !== false ? {
    sidebar: [
      {
        text: "",
        items: []
      }
    ]
  } : void 0;
}
var defaultTimeZoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() / -60;
async function getArticleMeta(filepath, route, timeZone = defaultTimeZoneOffset, baseContent) {
  const fileContent = baseContent || await fs3.promises.readFile(filepath, "utf-8");
  const { data: frontmatter, excerpt, content } = grayMatter(fileContent, {
    excerpt: true
  });
  const meta = {
    ...frontmatter
  };
  if (!meta.title) {
    meta.title = getDefaultTitle(content);
  }
  const utcValue = timeZone >= 0 ? `+${timeZone}` : `${timeZone}`;
  const date = await (meta.date && /* @__PURE__ */ new Date(`${new Date(meta.date).toUTCString()}${utcValue}`) || getFileLastModifyTime(filepath));
  meta.date = formatDate(date || /* @__PURE__ */ new Date());
  meta.categories = typeof meta.categories === "string" ? [meta.categories] : meta.categories;
  meta.tags = typeof meta.tags === "string" ? [meta.tags] : meta.tags;
  meta.tag = [meta.tag || []].flat().concat([
    .../* @__PURE__ */ new Set([...meta.categories || [], ...meta.tags || []])
  ]);
  meta.description = meta.description || getTextSummary(content, 100) || excerpt;
  meta.cover = meta.cover ?? getFirstImagURLFromMD(fileContent, route);
  if (meta.publish === false) {
    meta.hidden = true;
    meta.recommend = false;
  }
  return meta;
}
async function getArticles(cfg, vpConfig) {
  const pages = getVitePressPages(vpConfig);
  const metaResults = pages.reduce((prev, value) => {
    const { page, route, originRoute, filepath, isDynamic, dynamicRoute } = value;
    const metaPromise = isDynamic && dynamicRoute ? getArticleMeta(filepath, originRoute, cfg?.timeZone, renderDynamicMarkdown(filepath, dynamicRoute.params, dynamicRoute.content)) : getArticleMeta(filepath, originRoute, cfg?.timeZone);
    prev[page] = {
      route,
      metaPromise
    };
    return prev;
  }, {});
  const pageData = [];
  for (const page of pages) {
    const { route, metaPromise } = metaResults[page.page];
    const meta = await metaPromise;
    if (meta.layout === "home") {
      continue;
    }
    pageData.push({
      route,
      meta
    });
  }
  return pageData;
}
function patchVPConfig(vpConfig, cfg) {
  vpConfig.head = vpConfig.head || [];
  if (cfg?.comment && "type" in cfg.comment && cfg?.comment?.type === "artalk") {
    const server = cfg.comment?.options?.server;
    if (server) {
      vpConfig.head.push(["link", { href: `${server} /dist/Artalk.css`, rel: "stylesheet" }]);
      vpConfig.head.push(["script", { src: `${server} /dist/Artalk.js`, id: "artalk-script" }]);
    }
  }
}
function patchVPThemeConfig(cfg, vpThemeConfig = {}) {
  vpThemeConfig.sidebar = patchDefaultThemeSideBar(cfg)?.sidebar;
  return vpThemeConfig;
}
function checkConfig(cfg) {
}

// src/utils/node/vitePlugins.ts
import {
  pagefindPlugin
} from "vitepress-plugin-pagefind";
import { RssPlugin } from "vitepress-plugin-rss";
import { AnnouncementPlugin } from "vitepress-plugin-announcement";
import { groupIconVitePlugin } from "vitepress-plugin-group-icons";

// src/utils/node/hot-reload-plugin.ts
import fs4 from "fs";
function themeReloadPlugin() {
  let blogConfig;
  let vitepressConfig;
  let docsDir;
  const generateRoute = (filepath) => {
    return filepath.replace(docsDir, "").replace(".md", "");
  };
  return {
    name: "@ort/vitepress-theme-reload",
    apply: "serve",
    configureServer(server) {
      const restart = debounce(() => {
        server.restart();
      }, 500);
      server.watcher.on("add", async (path4) => {
        const route = generateRoute(path4);
        const meta = await getArticleMeta(path4, route, blogConfig?.timeZone);
        blogConfig.pagesData.push({
          route,
          meta
        });
        restart();
      });
      server.watcher.on("change", async (path4) => {
        const route = generateRoute(path4);
        const fileContent = await fs4.promises.readFile(path4, "utf-8");
        const { data: frontmatter } = grayMatter(fileContent, {
          excerpt: true
        });
        const meta = await getArticleMeta(path4, route, blogConfig?.timeZone);
        const matched = blogConfig.pagesData.find((v) => v.route === route);
        const excludeKeys = ["date", "description"].filter((key) => !frontmatter[key]);
        const inlineKeys = [
          // vitepress 默认主题 https://vitepress.dev/zh/reference/frontmatter-config
          "lang",
          "outline",
          "head",
          "layout",
          "hero",
          "features",
          "navbar",
          "sidebar",
          "aside",
          "lastUpdated",
          "editLink",
          "footer",
          "pageClass",
          // 本主题扩展 https://theme.sugarat.top/config/frontmatter.html
          "hiddenCover",
          "readingTime",
          "buttonAfterArticle"
        ];
        if (matched && !isEqual(matched.meta, meta, inlineKeys.concat(excludeKeys))) {
          matched.meta = meta;
          restart();
        }
      });
      server.watcher.on("unlink", (path4) => {
        const route = generateRoute(path4);
        const idx = blogConfig.pagesData.findIndex((v) => v.route === route);
        if (idx >= 0) {
          blogConfig.pagesData.splice(idx, 1);
          restart();
        }
      });
    },
    configResolved(config) {
      vitepressConfig = config.vitepress;
      docsDir = vitepressConfig.srcDir;
      blogConfig = config.vitepress.site.themeConfig.blog;
    }
  };
}

// src/utils/node/vitePlugins.ts
function getVitePlugins(cfg = {}) {
  const plugins = [];
  plugins.push(coverImgTransform());
  if (cfg.themeColor) {
    plugins.push(setThemeScript(cfg.themeColor));
  }
  plugins.push(themeReloadPlugin());
  plugins.push(providePageData(cfg));
  if (cfg && cfg.search !== false) {
    const ops = cfg.search instanceof Object ? cfg.search : {};
    plugins.push(
      pagefindPlugin({
        ...ops
      })
    );
  }
  if (cfg?.mermaid !== false) {
    const { MermaidPlugin } = _require("vitepress-plugin-mermaid");
    plugins.push(inlineInjectMermaidClient());
    plugins.push(MermaidPlugin(cfg?.mermaid === true ? {} : cfg?.mermaid ?? {}));
  }
  if (cfg?.RSS) {
    ;
    [cfg?.RSS].flat().forEach((rssConfig) => plugins.push(RssPlugin(rssConfig)));
  }
  if (cfg?.popover) {
    plugins.push(AnnouncementPlugin(cfg.popover));
  }
  plugins.push(groupIconVitePlugin(cfg?.groupIcon));
  return plugins;
}
function registerVitePlugins(vpCfg, plugins) {
  vpCfg.vite = {
    plugins,
    ...vpCfg.vite
  };
}
function inlineInjectMermaidClient() {
  return {
    name: "@ort/vitepress-theme-plugin-inline-inject-mermaid-client",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith("src/index.ts") && code.startsWith("// @ort/vitepress-theme index")) {
        return code.replace("// replace-mermaid-import-code", "import Mermaid from 'vitepress-plugin-mermaid/Mermaid.vue'").replace("// replace-mermaid-mounted-code", "if (!ctx.app.component('Mermaid')) { ctx.app.component('Mermaid', Mermaid as any) }");
      }
      return code;
    }
  };
}
function coverImgTransform() {
  let blogConfig;
  let vitepressConfig;
  let assetsDir;
  const relativeMetaName = ["cover"];
  const relativeMeta = [];
  const relativeMetaMap = {};
  const viteAssetsMap = {};
  const relativePathMap = {};
  return {
    name: "@ort/vitepress-theme-plugin-cover-transform",
    apply: "build",
    // enforce: 'pre',
    configResolved(config) {
      vitepressConfig = config.vitepress;
      assetsDir = vitepressConfig.assetsDir;
      blogConfig = config.vitepress.site.themeConfig.blog;
      const pagesData = [...blogConfig.pagesData];
      if (vitepressConfig.site.locales && Object.keys(vitepressConfig.site.locales).length > 1 && blogConfig?.locales) {
        Object.values(blogConfig?.locales).map((v) => v.pagesData).filter((v) => !!v).forEach((v) => pagesData.push(...v));
      }
      pagesData.forEach((v) => {
        relativeMetaName.forEach((k) => {
          const value = v.meta[k];
          if (value && typeof value === "string" && value.startsWith("/")) {
            const absolutePath = `${vitepressConfig.srcDir}${value}`;
            if (relativeMetaMap[absolutePath]) {
              Object.assign(v.meta, { [k]: relativeMetaMap[absolutePath][k] });
              return;
            }
            relativePathMap[value] = absolutePath;
            relativePathMap[absolutePath] = value;
            relativeMeta.push(v.meta);
            relativeMetaMap[absolutePath] = v.meta;
          }
        });
      });
    },
    moduleParsed(info) {
      if (!relativePathMap[info.id]) {
        return;
      }
      const asset = info.code?.match(/export default "(.*)"/)?.[1];
      if (!asset) {
        return;
      }
      viteAssetsMap[info.id] = asset;
      viteAssetsMap[asset] = info.id;
      relativeMeta.forEach((meta) => {
        relativeMetaName.forEach((k) => {
          const value = meta[k];
          if (!value || !relativePathMap[value]) {
            return;
          }
          const viteAsset = viteAssetsMap[relativePathMap[value]];
          if (viteAsset) {
            Object.assign(meta, { [k]: viteAsset });
          }
        });
      });
    },
    generateBundle(_, bundle) {
      const assetsMap = Object.entries(bundle).filter(([key]) => {
        return key.startsWith(assetsDir);
      }).map(([_2, value]) => {
        return value;
      }).filter((v) => v.type === "asset");
      if (!assetsMap.length) {
        return;
      }
      relativeMeta.forEach((meta) => {
        relativeMetaName.forEach((k) => {
          const value = meta[k];
          if (!value || !viteAssetsMap[value]) {
            return;
          }
          const absolutePath = viteAssetsMap[value];
          const matchAsset = assetsMap.find((v) => joinPath(`${vitepressConfig.srcDir}/`, v.originalFileName) === absolutePath);
          if (matchAsset) {
            Object.assign(meta, { [k]: joinPath("/", matchAsset.fileName) });
          }
        });
      });
    }
  };
}
function providePageData(cfg) {
  return {
    name: "@ort/vitepress-theme-plugin-provide-page-data",
    async config(config, env) {
      const vitepressConfig = config.vitepress;
      const pagesData = await getArticles(cfg, vitepressConfig);
      if (vitepressConfig.site.locales && Object.keys(vitepressConfig.site.locales).length > 1) {
        if (!vitepressConfig.site.themeConfig.blog.locales) {
          vitepressConfig.site.themeConfig.blog.locales = {};
        }
        const localeKeys = Object.keys(vitepressConfig.site.locales);
        localeKeys.forEach((localeKey) => {
          if (!vitepressConfig.site.themeConfig.blog.locales[localeKey]) {
            vitepressConfig.site.themeConfig.blog.locales[localeKey] = {};
          }
          vitepressConfig.site.themeConfig.blog.locales[localeKey].pagesData = pagesData.filter((v) => {
            const { route } = v;
            const isRoot = localeKey === "root";
            if (isRoot) {
              return !localeKeys.filter((v2) => v2 !== "root").some((k) => route.startsWith(`/${k}`));
            }
            return route.startsWith(`/${localeKey}`);
          });
        });
        if (env.mode === "production") {
          return;
        }
      }
      vitepressConfig.site.themeConfig.blog.pagesData = pagesData;
    }
  };
}
function setThemeScript(themeColor) {
  let resolveConfig;
  const pluginOps = {
    name: "@ort/vitepress-theme-plugin-theme-color-script",
    enforce: "pre",
    configResolved(config) {
      if (resolveConfig) {
        return;
      }
      resolveConfig = config;
      const vitepressConfig = config.vitepress;
      if (!vitepressConfig) {
        return;
      }
      const selfTransformHead = vitepressConfig.transformHead;
      vitepressConfig.transformHead = async (ctx) => {
        const selfHead = await Promise.resolve(selfTransformHead?.(ctx)) || [];
        return selfHead.concat([
          ["script", { type: "text/javascript" }, `;(function() {
            document.documentElement.setAttribute("theme", "${themeColor}");
          })()`]
        ]);
      };
    }
  };
  return pluginOps;
}

// src/node.ts
function getThemeConfig(cfg = {}) {
  checkConfig(cfg);
  cfg.mermaid = cfg.mermaid ?? false;
  const pagesData = [];
  const extraVPConfig = {
    vite: {
      // see https://sass-lang.com/documentation/breaking-changes/legacy-js-api/
      css: {
        preprocessorOptions: {
          scss: {
            api: "modern"
          }
        }
      },
      build: {
        // https://vite.dev/config/build-options.html#build-chunksizewarninglimit
        chunkSizeWarningLimit: 2048
      }
    }
  };
  const vitePlugins = getVitePlugins(cfg);
  registerVitePlugins(extraVPConfig, vitePlugins);
  const markdownPlugin = getMarkdownPlugins(cfg);
  registerMdPlugins(extraVPConfig, markdownPlugin);
  if (cfg?.mermaid !== false) {
    patchMermaidPluginCfg(extraVPConfig);
  }
  patchOptimizeDeps(extraVPConfig);
  patchVPConfig(extraVPConfig, cfg);
  return {
    themeConfig: {
      blog: {
        pagesData,
        // 插件里补全
        ...cfg
      },
      // 补充一些额外的配置用于继承
      ...patchVPThemeConfig(cfg)
    },
    ...extraVPConfig
  };
}
function defineConfig(config) {
  return config;
}
function defineLocaleConfig(cfg) {
  return cfg;
}
function footerHTML(footerData) {
  const data = [footerData || []].flat();
  return data.map((d) => {
    const { icon, text, link } = d;
    return `<span class="footer-item">
    ${icon ? `<i>${icon}</i>` : ""}
    ${link ? `<a href="${link}" target="_blank" rel="noopener noreferrer">${text}</a>` : `<span>${text}</span>`}
</span>`;
  }).join("");
}
export {
  defineConfig,
  defineLocaleConfig,
  footerHTML,
  getThemeConfig,
  tabsPlugin as tabsMarkdownPlugin
};

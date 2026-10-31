// Post-build script: rewrite absolute /_next/... and absolute internal links
// to be relative, so the static export can be deployed under any path prefix
// (S3 proxied URLs, GitHub Pages, etc.).
//
// What we rewrite in every .html file:
//   href="/_next/..."  →  href="<rel>_next/..."
//   src="/_next/..."   →  src="<rel>_next/..."
//   href="/images/..." →  href="<rel>images/..."
//   src="/images/..."  →  src="<rel>images/..."
//   href="/"           →  href="<rel>"               (home link)
//   href="/<page>/"    →  href="<rel><page>/"         (internal pages)
//
// `<rel>` is the relative prefix to climb back to the `out/` root from this
// specific HTML file's directory (e.g. "./" for index.html, "../" for about/index.html).

import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "out");

// Discover all internal page routes from the out/ directory structure.
// Any directory that contains an index.html (other than the root) is treated
// as an internal route. This automatically picks up new pages like /areas/<slug>.
function discoverRoutes(rootDir) {
  const routes = [];
  function walk(dir, rel) {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      const s = statSync(full);
      if (!s.isDirectory()) continue;
      if (name === "_next" || name === "images") continue; // assets, not routes
      const childRel = rel ? `${rel}/${name}` : name;
      // Routes can be nested. If this dir has index.html, it's a route.
      try {
        statSync(path.join(full, "index.html"));
        routes.push(childRel);
      } catch {}
      walk(full, childRel);
    }
  }
  walk(rootDir, "");
  return routes;
}

function walk(dir, results = [], ext = ".html") {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, results, ext);
    else if (full.endsWith(ext)) results.push(full);
  }
  return results;
}

// Rewrite CSS files in _next/static/css/. Their url(/_next/static/media/...)
// paths resolve against the document origin (e.g. https://host/_next/...) which
// 404s on prefixed deploys. Convert to paths relative to the CSS file itself.
function rewriteCss(file) {
  // CSS file lives at OUT_DIR/_next/static/css/X.css. Media is at
  // OUT_DIR/_next/static/media/. From the CSS file, that's "../media/".
  let src = readFileSync(file, "utf8");
  src = src.replace(/url\(\/_next\/static\/media\//g, "url(../media/");
  src = src.replace(/url\("\/_next\/static\/media\//g, 'url("../media/');
  src = src.replace(/url\('\/_next\/static\/media\//g, "url('../media/");
  writeFileSync(file, src);
}

function rewriteHtml(file) {
  const relDir = path.relative(path.dirname(file), OUT_DIR);
  // Empty when file is at OUT_DIR root; otherwise "../" repeated.
  const prefix = relDir === "" ? "./" : relDir + "/";

  let src = readFileSync(file, "utf8");

  // 1) Rewrite /_next/... (assets) in regular attributes
  src = src.replace(/(href|src)="\/_next\//g, `$1="${prefix}_next/`);

  // 1b) Rewrite escaped \"/_next/... and \"/images/... appearing INSIDE inline
  //     JSON payloads (Next.js __next_f hydration blob and self-referential
  //     resource manifests). Without this, Next's runtime tries to fetch assets
  //     from the document origin root (e.g. https://sites.pplx.app/_next/...),
  //     which 404s on prefixed deploys and triggers a client-side exception
  //     during hydration.
  src = src.replace(/\\"\/_next\//g, `\\"${prefix}_next/`);
  src = src.replace(/\\"\/images\//g, `\\"${prefix}images/`);

  // 1c) Next.js also emits BARE relative paths inside the flight data, like
  //     \"static/chunks/970-xyz.js\" (no leading slash, no _next/ prefix).
  //     Next's client-side chunk loader resolves these against the document
  //     origin root — which 404s on prefixed deploys. Rewrite to absolute
  //     paths that include our prefix + _next/.
  src = src.replace(/\\"static\/chunks\//g, `\\"${prefix}_next/static/chunks/`);
  src = src.replace(/\\"static\/css\//g, `\\"${prefix}_next/static/css/`);
  src = src.replace(/\\"static\/media\//g, `\\"${prefix}_next/static/media/`);

  // 2) Rewrite /images/... (next/image static assets we serve from /public)
  src = src.replace(/(href|src)="\/images\//g, `$1="${prefix}images/`);

  // 3) Rewrite favicon, etc. (anything starting with /<something>.<ext>)
  src = src.replace(/(href|src)="\/([\w-]+\.(?:ico|png|svg|webp|jpg|jpeg))"/g, `$1="${prefix}$2"`);

  // 4) Rewrite internal page links to point at the actual index.html files.
  //    The S3 proxy hosting these static files does NOT auto-resolve directory
  //    requests to index.html, so href="/search/" returns 404. We rewrite to
  //    href="<prefix>search/index.html" instead.
  //    Routes are discovered dynamically (see top of file) so nested routes
  //    like /areas/yorba-linda are handled automatically.
  src = src.replace(/href="\/"(?![a-zA-Z0-9_-])/g, `href="${prefix}index.html"`);
  // Process longest routes first so /areas/yorba-linda matches before /areas.
  const sortedRoutes = [...ROUTES].sort((a, b) => b.length - a.length);
  for (const route of sortedRoutes) {
    const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`href="\\/${escaped}\\/?"`, "g");
    src = src.replace(re, `href="${prefix}${route}/index.html"`);
  }

  // 6) Inject a runtime URL-rewriting shim BEFORE Next loads any chunk. This
  //    monkey-patches:
  //      (a) document.createElement('script' | 'link') so their src/href are
  //          rewritten when set,
  //      (b) window.fetch so XHRs to /_next/... (chunk prefetches) are redirected,
  //      (c) __webpack_public_path__ and the App Router asset prefix.
  //    Without this, Next's client-side chunk loader requests chunks from the
  //    document origin root (https://host/_next/...), which 404s on prefixed
  //    deploys and triggers "Application error: a client-side exception has
  //    occurred". The deploy base is derived at runtime from document.baseURI
  //    so this works regardless of where the bundle is hosted.
  const publicPathScript = [
    '<script>',
    '(function(){',
    'try{',
    `var rel=${JSON.stringify(prefix)};`,
    'var base=new URL(rel,document.baseURI).href;',
    'var nextRoot=base+"_next/";',
    'self.__webpack_public_path__=nextRoot;',
    // Critical: the webpack runtime hardcodes __webpack_require__.p = "/_next/".
    // Our build-time patch replaces that literal with
    //   .p=(self.__NEXT_RUNTIME_PUBLIC_PATH__ || "/_next/")
    // so we just need to set this global before webpack runs. This is what
    // makes SPA navigation and lazy chunk loading work on prefixed deploys.
    'self.__NEXT_RUNTIME_PUBLIC_PATH__=nextRoot;',
    'window.__NEXT_DATA__=window.__NEXT_DATA__||{};',
    'window.__NEXT_DATA__.assetPrefix=base.replace(/\\/$/,"");',

    // Helper: rewrite any URL that looks like /_next/... or /images/... — or
    // a bare static/chunks/... path — to use the deploy base. Leave external
    // URLs and already-resolved URLs (containing the proxy base) alone.
    'function rewriteUrl(u){',
    'if(typeof u!=="string"||!u)return u;',
    // Already rooted at our deploy base — done.
    'if(u.indexOf(base)===0)return u;',
    // Absolute http(s):// URL pointing at the WRONG origin/path. Next sometimes
    // resolves a path against location.origin BEFORE assigning to script.src,
    // producing e.g. "https://sites.pplx.app/_next/static/chunks/X.js" — right
    // path, wrong origin. Re-rebase under our proxy URL.
    'if(/^https?:\\/\\//.test(u)){',
    'try{',
    'var pu=new URL(u);',
    'var sp=pu.pathname.replace(/^\\//,"");',
    'while(sp.indexOf("_next/_next/")===0)sp=sp.slice(6);',
    'if(sp.indexOf("_next/")===0)return nextRoot+sp.slice(6)+pu.search+pu.hash;',
    'if(sp.indexOf("images/")===0)return base+sp+pu.search+pu.hash;',
    'if(sp.indexOf("static/chunks/")===0||sp.indexOf("static/css/")===0||sp.indexOf("static/media/")===0)return nextRoot+sp+pu.search+pu.hash;',
    '}catch(e){}',
    'return u;',
    '}',
    // Protocol-relative — leave alone.
    'if(u.indexOf("//")===0)return u;',
    // Path-only (root-absolute or relative).
    'var s=u;',
    'if(s.charAt(0)==="/")s=s.slice(1);',
    'while(s.indexOf("_next/_next/")===0)s=s.slice(6);',
    'if(s.indexOf("_next/")===0)return nextRoot+s.slice(6);',
    'if(s.indexOf("images/")===0)return base+s;',
    'if(s.indexOf("static/chunks/")===0)return nextRoot+s;',
    'if(s.indexOf("static/css/")===0)return nextRoot+s;',
    'if(s.indexOf("static/media/")===0)return nextRoot+s;',
    'return u;',
    '}',

    // Patch HTMLScriptElement and HTMLLinkElement src/href setters so any
    // dynamically-inserted chunk script gets the correct URL.
    'function patchProp(proto,prop){',
    'var desc=Object.getOwnPropertyDescriptor(proto,prop);',
    'if(!desc||!desc.set)return;',
    'Object.defineProperty(proto,prop,{configurable:true,enumerable:true,get:desc.get,set:function(v){desc.set.call(this,rewriteUrl(v));}});',
    '}',
    'patchProp(HTMLScriptElement.prototype,"src");',
    'patchProp(HTMLLinkElement.prototype,"href");',

    // Patch setAttribute on script/link — some bundlers use setAttribute("src", ...)
    // which bypasses the property setter above.
    'var _setAttr=Element.prototype.setAttribute;',
    'Element.prototype.setAttribute=function(name,value){',
    'if((this.tagName==="SCRIPT"&&name==="src")||(this.tagName==="LINK"&&name==="href")){',
    'value=rewriteUrl(value);',
    '}',
    'return _setAttr.call(this,name,value);',
    '};',

    // Patch fetch() so any RSC payload prefetches with absolute /_next paths
    // are redirected.
    'var _fetch=window.fetch.bind(window);',
    'window.fetch=function(input,init){',
    'if(typeof input==="string")input=rewriteUrl(input);',
    'else if(input&&input.url)input=new Request(rewriteUrl(input.url),input);',
    'return _fetch(input,init);',
    '};',

    '}catch(e){console.error("path shim init failed",e);}',
    '})();',
    '</script>',
  ].join("");
  if (!src.includes("__webpack_public_path__")) {
    src = src.replace(/<head>/, `<head>${publicPathScript}`);
  }


  // 5) Strip any preload/prefetch fetchPriority="auto" hints that point to
  // /_next/... that we may have missed via the above patterns (e.g. in JSON).
  // (No-op currently; placeholder for future selectors.)

  writeFileSync(file, src);
}

const ROUTES = discoverRoutes(OUT_DIR);
console.log(`Discovered ${ROUTES.length} internal routes:`, ROUTES.join(", "));

const htmlFiles = walk(OUT_DIR);
console.log(`Rewriting ${htmlFiles.length} HTML files in ${OUT_DIR}`);
for (const f of htmlFiles) rewriteHtml(f);

const cssDir = path.join(OUT_DIR, "_next", "static", "css");
try {
  const cssFiles = walk(cssDir, [], ".css");
  console.log(`Rewriting ${cssFiles.length} CSS files in ${cssDir}`);
  for (const f of cssFiles) rewriteCss(f);
} catch (e) {
  console.log("No _next/static/css dir to rewrite (skipping).");
}

// Patch the webpack runtime file(s). The webpack runtime hardcodes
// __webpack_require__.p = "/_next/" — the public path used for ALL dynamic chunk
// loads after the page has loaded (SPA navigation, prefetch, lazy chunks).
// On prefixed deploys this URL 404s because it ignores the proxy prefix.
// We replace the hardcoded literal with a runtime expression that reads from a
// window global we set in the HTML shim.
const chunksDir = path.join(OUT_DIR, "_next", "static", "chunks");
try {
  const allChunks = walk(chunksDir, [], ".js");
  const webpackFiles = allChunks.filter((f) => /\bwebpack-[a-f0-9]+\.js$/.test(f));
  console.log(`Patching ${webpackFiles.length} webpack runtime files`);
  for (const f of webpackFiles) {
    let src = readFileSync(f, "utf8");
    // Replace .p="/_next/" with .p=(self.__NEXT_RUNTIME_PUBLIC_PATH__||"/_next/")
    const before = src;
    src = src.replace(/\.p="\/_next\/"/g, '.p=(self.__NEXT_RUNTIME_PUBLIC_PATH__||"/_next/")');
    if (src !== before) {
      writeFileSync(f, src);
      console.log(`  Patched ${path.relative(OUT_DIR, f)}`);
    }
  }
} catch (e) {
  console.log("Webpack runtime patch failed:", e.message);
}

console.log("Done.");

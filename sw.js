// Service worker de l'application installée : il permet de l'ouvrir sans internet.
// Pages : toujours la version en ligne d'abord (mises à jour immédiates), la copie gardée seulement hors ligne.
// Bibliothèques Firebase et polices (adresses versionnées, qui ne changent jamais) : gardées une fois pour toutes.
// Les données du cabinet ne passent jamais par ici : Firestore garde son propre cache, protégé par la connexion.
const CACHE = "cabinet-sebti-assia-v2";
const SHELL = ["/", "/index.html", "/rdv.html", "/manifest.webmanifest", "/icons/icon-192.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, {cache:"reload"})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const url = new URL(r.url);
  if (r.mode === "navigate"){
    e.respondWith(fetch(r, {cache:"no-cache"}).then(res => { // toujours redemander au serveur, jamais une copie du navigateur const copy = res.clone(); caches.open(CACHE).then(c => c.put(url.pathname === "/" ? "/" : r, copy)); return res; })
      .catch(() => caches.match(r, {ignoreSearch:true}).then(m => m || caches.match(url.pathname.endsWith("rdv.html") ? "/rdv.html" : "/"))));
    return;
  }
  const immuable = url.origin === "https://www.gstatic.com" && url.pathname.startsWith("/firebasejs/")
    || url.origin === "https://fonts.gstatic.com" || url.origin === "https://fonts.googleapis.com"
    || url.origin === "https://cdnjs.cloudflare.com" || url.origin === "https://cdn.jsdelivr.net"
    || (url.origin === self.location.origin && url.pathname.startsWith("/icons/"));
  if (immuable) e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {
    if (res.ok || res.type === "opaque"){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); }
    return res;
  })));
});

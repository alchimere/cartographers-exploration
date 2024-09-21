const cacheName = "v0.2.1"; // Change value to force update

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				".",
				"favicon.ico", // Favicon, IE and fallback for other browsers
				"favicon-16x16.png", // Favicon, default
				"favicon-32x32.png", // Favicon, Safari on Mac OS
				"favicon-144x144.png", // Favicon, Safari on Mac OS
				"index.html", // Main HTML file
				"logo.png", // Logo
				"main.js", // Main Javascript file
				"manifest.json", // Manifest file
				"style.css", // Main CSS file

				"img/coin.png",
				"img/explore_back.jpg",
				"img/explore_back_ruins.jpg",
				"img/next.svg",
				"img/ruin.png",
				
				"img/farm.png",
				"img/forest.png",
				"img/lake.png",
				"img/monster.png",
				"img/village.png",

				"img/shape1.png",
				"img/shape2Diag.png",
				"img/shape2I.png",
				"img/shape3I.png",
				"img/shape3V.png",
				"img/shape4I.png",
				"img/shape4L.png",
				"img/shape4T.png",
				"img/shape4Z.png",
				"img/shape5Plus.png",
				"img/shape5Rect.png",
				"img/shape5T.png",
				"img/shape5V.png",
				"img/shape5W.png",
				"img/shape5Z.png"
			]);
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				}).catch(reason => {
					return response;
				});
			})
		})
	);
});
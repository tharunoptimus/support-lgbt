const CACHE = "content-v1" // name of the current cache
const OFFLINE = "/offline.html" // URL to offline HTML document

const AUTO_CACHE = [
	// URLs of assets to immediately cache
	OFFLINE,
	"/",
]

// Iterate AUTO_CACHE and add cache each entry
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(AUTO_CACHE))
			.then(self.skipWaiting())
	)
})

// Destroy inapplicable caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return cacheNames.filter((cacheName) => CACHE !== cacheName)
			})
			.then((unusedCaches) => {
				console.log("DESTROYING CACHE", unusedCaches.join(","))
				return Promise.all(
					unusedCaches.map((unusedCache) => {
						return caches.delete(unusedCache)
					})
				)
			})
			.then(() => self.clients.claim())
	)
})

self.addEventListener("fetch", (event) => {
	if (
		!event.request.url.startsWith(self.location.origin) ||
		event.request.method !== "GET"
	) {
		// External request, or POST, ignore
		return void event.respondWith(fetch(event.request))
	}

	event.respondWith(
		caches.match(event.request).then((response) => {
			// Cache hit - return response
			if (response) {
				return response
			}

			// Cache miss - return network response
			return fetch(event.request)
				.then((response) => {
					if (response.ok) {
						// Clone response and cache
						const clone = response.clone()
						caches.open(CACHE).then((cache) => {
							cache.put(event.request, clone)
						})
						return response
					}

					// Not OK - return offline page
					return caches.open(CACHE).then((cache) => {
						const offlineRequest = new Request(OFFLINE)
						return cache.match(offlineRequest)
					})
				})
				.catch(() => {
					// Network error - return offline page
					return caches.open(CACHE).then((cache) => {
						const offlineRequest = new Request(OFFLINE)
						return cache.match(offlineRequest)
					})
				})
		})
	)
})

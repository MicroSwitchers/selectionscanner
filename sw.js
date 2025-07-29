// Selection Scanner Service Worker
const CACHE_NAME = 'selection-scanner-v1.0.0';
const STATIC_CACHE_NAME = 'selection-scanner-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'selection-scanner-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/Index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com/3.4.1',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME)
        .then((cache) => {
          console.log('Service Worker: Caching static assets...');
          return cache.addAll(STATIC_ASSETS);
        }),
      // Force activation of new service worker
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName.startsWith('selection-scanner-')) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // For navigation requests (HTML pages)
    if (request.mode === 'navigate') {
      event.respondWith(
        caches.match('/Index.html')
          .then((response) => {
            return response || fetch(request)
              .then((fetchResponse) => {
                return cacheAndReturn(DYNAMIC_CACHE_NAME, request, fetchResponse);
              });
          })
          .catch(() => {
            // Fallback to cached index if offline
            return caches.match('/Index.html');
          })
      );
      return;
    }

    // For static assets
    if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            return response || fetch(request)
              .then((fetchResponse) => {
                return cacheAndReturn(STATIC_CACHE_NAME, request, fetchResponse);
              });
          })
      );
      return;
    }

    // For external resources (fonts, CDN assets)
    if (!url.origin.includes(self.location.origin)) {
      event.respondWith(
        caches.match(request)
          .then((response) => {
            return response || fetch(request)
              .then((fetchResponse) => {
                // Only cache successful responses
                if (fetchResponse.status === 200) {
                  return cacheAndReturn(DYNAMIC_CACHE_NAME, request, fetchResponse);
                }
                return fetchResponse;
              })
              .catch(() => {
                // Return cached version if available, otherwise null
                return caches.match(request);
              });
          })
      );
      return;
    }

    // For other requests, try cache first, then network
    event.respondWith(
      caches.match(request)
        .then((response) => {
          return response || fetch(request)
            .then((fetchResponse) => {
              return cacheAndReturn(DYNAMIC_CACHE_NAME, request, fetchResponse);
            });
        })
        .catch(() => {
          // If both cache and network fail, return a custom offline page for HTML requests
          if (request.headers.get('accept').includes('text/html')) {
            return new Response(
              `<!DOCTYPE html>
              <html>
              <head>
                <title>Selection Scanner - Offline</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                  body { 
                    font-family: system-ui, sans-serif; 
                    text-align: center; 
                    padding: 50px; 
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: white;
                    min-height: 100vh;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                  }
                  .offline-container {
                    max-width: 400px;
                  }
                  .icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                  }
                  .title {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    color: #2dd4bf;
                  }
                  .message {
                    font-size: 1.1rem;
                    margin-bottom: 2rem;
                    color: #cbd5e1;
                  }
                  .retry-btn {
                    background: linear-gradient(to right, #2dd4bf, #14b8a6);
                    color: #0f172a;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s;
                  }
                  .retry-btn:hover {
                    transform: translateY(-2px);
                  }
                </style>
              </head>
              <body>
                <div class="offline-container">
                  <div class="icon">📱</div>
                  <div class="title">Selection Scanner</div>
                  <div class="message">
                    You're currently offline, but the app will work once you're back online!
                  </div>
                  <button class="retry-btn" onclick="window.location.reload()">
                    Try Again
                  </button>
                </div>
              </body>
              </html>`,
              {
                headers: { 'Content-Type': 'text/html' }
              }
            );
          }
        })
    );
  }
});

// Helper function to cache and return response
function cacheAndReturn(cacheName, request, response) {
  // Clone the response as it can only be consumed once
  const responseClone = response.clone();
  
  caches.open(cacheName)
    .then((cache) => {
      cache.put(request, responseClone);
    })
    .catch((error) => {
      console.warn('Failed to cache:', request.url, error);
    });
  
  return response;
}

// Handle background sync for when the app comes back online
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform any background tasks here
      console.log('Performing background sync tasks...')
    );
  }
});

// Handle push notifications (for future features)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Selection Scanner', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle messages from the main app
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Handle app update availability
self.addEventListener('updatefound', () => {
  console.log('Service Worker: Update found');
  
  // Notify the app about the update
  self.registration.installing.addEventListener('statechange', () => {
    if (self.registration.installing.state === 'installed') {
      // New content is available
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'UPDATE_AVAILABLE'
          });
        });
      });
    }
  });
});

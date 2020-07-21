// Un service worker pasa por el siguiente ciclo de vida
// Instalacion: se inicializa el caché
// Activate: se limpia el caché anterior
// Fetch: se interceptan las peticiones de red para controlarlas

// Para que la app funcione offline se almacenan en caché los archivos mínimos necesarios para que esta funcione
const cacheName = 'contador-v1';
const appShellFiles = [
	'/',
	'index.html',
	'js/app.js',
	'css/app.css',
	'icons/icon-72x72.png',
	'icons/icon-96x96.png',
	'icons/icon-128x128.png',
	'icons/icon-144x144.png',
	'icons/icon-152x152.png',
	'icons/icon-192x192.png',
	'icons/icon-384x384.png',
	'icons/icon-512x512.png',
];
self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			console.log('Almacenando en caché');
			return cache.addAll(appShellFiles);
		})
	);
	console.log('SW installed');
});
// Se intercepta la petición y en este caso buscamos si el recurso existe en caché para responderlo
// Si no lo encuentra va a la red a solicitarlo
self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then((r) => {
			console.log(e.request.url);

			return (
				r ||
				fetch(e.request).then((response) => {
					return caches.open(cacheName).then((cache) => {
						console.log(e.request.url);
						cache.put(e.request, response.clone());
						return response;
					});
				})
			);
		})
	);
});

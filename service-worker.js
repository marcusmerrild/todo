/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function () {
	'use strict';

	var filesToCache = [
		'.',
		'/static/images/welcome-logo.png',
		'/static/images/welcome-background.png',
		'/static/images/pic_c_new.png',
		'/static/images/pic_b_new.png',
		'/static/images/pic_a_new.png',
		'/static/css/mobile-page.css',
		'/static/css/welcome-page.css',
		'/static/css/category-page.css',
		'/static/css/navigation-bar.css',
		'/static/css/calendar-page.css',
		'/static/js/jquery.js',
		'/static/js/bootstrap.min.js',
		'/static/js/mobile-page.js',
		'/static/js/swipe.js',
		'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
		'https://fonts.googleapis.com/css?family=Karla',
];

	var staticCacheName = 'pages-cache-v1';

	self.addEventListener('install', function (event) {
		console.log('Attempting to install service worker and cache static assets');
		event.waitUntil(
			caches.open(staticCacheName)
			.then(function (cache) {
				return cache.addAll(filesToCache);
			})
		);
	});

	self.addEventListener('fetch', function (event) {
		console.log('Fetch event for ', event.request.url);
		event.respondWith(
			caches.match(event.request).then(function (response) {
				if (response) {
					console.log('Found ', event.request.url, ' in cache');
					return response;
				}
				console.log('Network request for ', event.request.url);
				return fetch(event.request)

				// TODO - Add fetched files to the cache

			}).catch(function (error) {

				// TODO - Respond with custom offline page

			})
		);
	});

})();

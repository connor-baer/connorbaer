( function () {
  'use strict';
  const version = 'cb1.4::';
  const staticCacheName = version + 'static';
  const pagesCacheName = version + 'pages';
  const imagesCacheName = version + 'images';
  const offlinePages = [
    '/offline',
    '/',
    '/404',
    '/work',
    '/blog',
  ];

  function stashInCache( cacheName, request, response ) {
    caches.open( cacheName ).then( cache => cache.put( request, response ) );
  }

  function updateStaticCache() {
    caches.open( staticCacheName ).then( cache => {
      return cache.addAll( offlinePages.map( url => new Request( url, {
        credentials: 'same-origin',
      } ) ) );
    } );
  }

  function trimCache( cacheName, maxItems ) {
    caches.open( cacheName ).then( cache => {
      cache.keys().then( keys => {
        if ( keys.length > maxItems ) {
          cache.delete( keys[ 0 ] ).then( trimCache( cacheName, maxItems ) );
        }
      } );
    } );
  }

  function clearOldCaches() {
    return caches.keys().then( keys => {
      return Promise.all( keys.filter( key => key.indexOf( version ) !== 0 ).map( key => caches.delete( key ) ) );
    } );
  }

  self.addEventListener( 'message', event => {
    if ( event.data.command === 'trimCaches' ) {
      trimCache( pagesCacheName, 35 );
      trimCache( imagesCacheName, 20 );
    }
  } );

  self.addEventListener( 'fetch', event => {
    let request = event.request;
    let url = new URL( request.url );

    if ( request.url.indexOf( 'google-analytics' ) !== -1 ) {
      return;
    }

    if ( request.method !== 'GET' ) {
      return;
    }

    if ( request.headers.get( 'Accept' ).indexOf( 'text/html' ) !== -1 ) {
      event.respondWith( fetch( request ).then( response => {
        let copy = response.clone();

        if ( offlinePages.includes( url.pathname ) || offlinePages.includes( url.pathname + '/' ) ) {
          stashInCache( staticCacheName, request, copy );
        } else {
          stashInCache( pagesCacheName, request, copy );
        }
        return response;
      } ).catch( () => {
        return caches.match( request ).then( response => response || caches.match( '/offline' ) );
      } ) );
      return;
    }
    event.respondWith( caches.match( request ).then( response => {
      return response || fetch( request ).then( response => {
        if ( request.headers.get( 'Accept' ).indexOf( 'image' ) !== -1 ) {
          let copy = response.clone();

          stashInCache( imagesCacheName, request, copy );
        }
        return response;
      } ).catch( () => {
        if ( request.headers.get( 'Accept' ).indexOf( 'image' ) !== -1 ) {
          return new Response( '<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {
            headers: {
              'Content-Type': 'image/svg+xml'
            }
          } );
        }
      } );
    } ) );
  } );
} )();

/* global gapi */
import { useState, useEffect } from 'react';

import useScript from './use-script';

const GOOGLE_API_SOURCE = 'https://apis.google.com/js/api.js';

export default function useGoogle(scope, discoveryDocs) {
  const [isLoaded] = useScript(GOOGLE_API_SOURCE);
  const [isInitialized, setInitialized] = useState(false);
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    function initClient() {
      gapi.client
        .init({
          apiKey: process.env.GOOGLE_API_KEY,
          clientId: process.env.GOOGLE_CLIENT_ID,
          discoveryDocs,
          scope,
        })
        .then(() => {
          setInitialized(true);
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(setAuthorized);

          // Handle the initial sign-in state.
          setAuthorized(gapi.auth2.getAuthInstance().isSignedIn.get());
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }

    if (isLoaded) {
      gapi.load('client:auth2', initClient);
    }
  }, [discoveryDocs, isLoaded, scope]);

  if (!isInitialized) {
    return { isInitialized };
  }

  return {
    isInitialized,
    isAuthorized,
    signIn: gapi.auth2.getAuthInstance().signIn,
    signOut: gapi.auth2.getAuthInstance().signOut,
    client: gapi.client,
  };
}

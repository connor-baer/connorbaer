// Adapted from https://usehooks.com/useScript/
import { useState, useEffect } from 'react';

const isServer = typeof window === 'undefined';

const cachedScripts = {};

export default function useScript(src, async = true) {
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(() => {
    if (isServer) {
      return undefined;
    }

    // If cachedScripts array already includes src that means another instance
    // of this hook already loaded this script, so no need to load again.
    if (cachedScripts[src]) {
      setState({
        loaded: true,
        error: false
      });
      return undefined;
    }

    cachedScripts[src] = true;

    const script = document.createElement('script');

    script.src = src;
    script.async = async;

    const onScriptLoad = () => {
      setState({
        loaded: true,
        error: false
      });
    };

    const onScriptError = () => {
      cachedScripts[src] = false;

      script.remove();

      setState({
        loaded: true,
        error: true
      });
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };
  }, [src, async]);

  return [state.loaded, state.error];
}

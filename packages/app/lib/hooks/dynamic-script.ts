"use client";
import { useEffect, useState } from "react";

export const useDynamicScript = (props: { url: string }) => {
  const { url } = props;

  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (url === "") return;

    // @ts-ignore
    if (window.___LOADED_REMOTES === undefined) {
      // @ts-ignore
      window.___LOADED_REMOTES = [];
    }

    // @ts-ignore
    if (window.___INITIALIZED_SCOPES === undefined) {
      // @ts-ignore
      window.___INITIALIZED_SCOPES = [];
    }

    if (((window as any).___LOADED_REMOTES as string[]).includes(url)) {
      setIsReady(true);
      setIsError(false);

      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    script.onload = () => {
      ((window as any).___LOADED_REMOTES as string[]).push(url);

      setIsReady(true);
      setIsError(false);
    };

    script.onerror = () => {
      setIsReady(false);
      setIsError(true);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [url]);

  return {
    isError,
    isReady,
  };
};

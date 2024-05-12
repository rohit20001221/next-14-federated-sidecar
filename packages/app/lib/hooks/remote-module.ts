"use client";
import { useCallback, useEffect, useState } from "react";
import { federation } from "../utils/federation";

export const useRemoteModule = (props: {
  url: string;
  module: string;
  scope: string;
  type?: "global" | "esm";
}) => {
  const { module, scope, url, type } = props;

  const [isClient, setIsClient] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);

  const [mod, setMod] = useState<any>();

  const errorFallback = useCallback(() => {
    setIsReady(true);
    setIsError(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !isClient) setIsClient(true);
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    if (!federation.moduleCache.has(scope)) {
      try {
        federation.registerRemotes(
          [
            {
              entry: url,
              name: scope,
              shareScope: "default",
              type,
            },
          ],
          { force: true }
        );
      } catch {
        return errorFallback();
      }
    }

    (async () => {
      try {
        const m = await federation.loadRemote(`${scope}/${module}`);

        setIsReady(true);
        setMod(m);
      } catch {
        return errorFallback();
      }
    })();
  }, [isClient]);

  return {
    isReady,
    isError,
    mod,
  };
};

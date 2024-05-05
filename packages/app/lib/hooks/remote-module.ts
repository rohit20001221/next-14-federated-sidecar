"use client";
import { useEffect, useState } from "react";
import { loadRemoteScript } from "../utils/load-script";
import { useDynamicScript } from "./dynamic-script";

export const useRemoteModule = (props: {
  url: string;
  module: string;
  scope: string;
}) => {
  const { module, scope, url } = props;

  const { isReady, isError } = useDynamicScript({ url });

  const [mod, setMod] = useState<any>();

  useEffect(() => {
    if (!isReady || isError) return;

    loadRemoteScript({ module, scope }).then((m) => setMod(m));
  }, [isReady, isError, module, scope]);

  return {
    isReady,
    isError,
    mod,
  };
};

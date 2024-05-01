import { FC, Suspense, lazy, useEffect, useState } from "react";

const useDynamicScript = (props: { url: string }) => {
  const { url } = props;

  const [isReady, setIsReady] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (url === "") return;

    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    script.onload = () => {
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

const RemoteComponent: FC<{ url: string; module: string; scope: string }> = ({
  url,
  scope,
  module,
}) => {
  const { isReady, isError } = useDynamicScript({ url });

  if (!isReady) return <div>loading: {url}</div>;
  if (isError) return <div>failed to load: {url}</div>;

  const Component = lazy(async () => {
    // @ts-ignore
    await __webpack_init_sharing__("default");
    // @ts-ignore
    const container = global[scope];

    await container.init({
      react: {
        default: {
          get: () => () => require("react"),
          loaded: 1,
        },
      },
    });

    const factory = await container.get(module);
    const m = factory();

    return m;
  });

  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export default RemoteComponent;

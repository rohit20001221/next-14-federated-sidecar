import { FC, Suspense, lazy } from "react";
import { useDynamicScript } from "../hooks/dynamic-script";
import { loadRemoteScript } from "../utils/load-script";

const RemoteComponent: FC<{ url: string; module: string; scope: string }> = ({
  url,
  scope,
  module,
}) => {
  const { isReady, isError } = useDynamicScript({ url });

  if (!isReady) return <div>loading: {url}</div>;
  if (isError) return <div>failed to load: {url}</div>;

  const Component = lazy(() => loadRemoteScript({ scope, module }));

  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export default RemoteComponent;

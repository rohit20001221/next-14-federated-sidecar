"use client";
import { FC, Suspense, lazy, useEffect, useState } from "react";
import { federation } from "../utils/federation";

const RemoteComponentRuntime: FC<RemoteContainerRuntimeProps> = ({
  url,
  scope,
  module,
  type,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined && !isClient) setIsClient(true);
  }, [isClient]);

  if (!isClient) return null;

  const Component = lazy(async () => {
    if (!federation.moduleCache.has(scope)) {
      try {
        federation.registerRemotes(
          [
            {
              entry: url,
              name: scope,
              alias: scope,
              shareScope: "default",
              type,
            },
          ],
          { force: true }
        );
      } catch (e) {
        return { default: () => <div>{(e as Error).message}</div> };
      }
    }

    const m = (await federation.loadRemote(`${scope}/${module}`)) as {
      default: any;
    };

    return m;
  });

  return (
    <Suspense>
      <Component />
    </Suspense>
  );
};

export default RemoteComponentRuntime;

type RemoteContainerRuntimeProps = {
  url: string;
  scope: string;
  module: string;
  type?: "global" | "esm";
};

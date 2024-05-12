"use client";
import { FC, Suspense, lazy, useEffect, useState } from "react";
import { federation } from "../utils/federation";

const RemoteComponentRuntime: FC<RemoteContainerRuntimeProps> = ({
  url,
  scope,
  module,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined && !isClient) setIsClient(true);
  }, [isClient]);

  if (!isClient) return null;

  const Component = lazy(async () => {
    try {
      federation.registerRemotes(
        [
          {
            entry: url,
            name: scope,
            shareScope: "default",
          },
        ],
        { force: true }
      );
    } catch {
      return { default: () => null };
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
};

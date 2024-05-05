import RemoteComponent from "@/lib/components/RemoteComponent";
import { useRemoteModule } from "@/lib/hooks/remote-module";
import { useEffect } from "react";

export default function Home() {
  const { isError, isReady, mod } = useRemoteModule({
    url: "http://localhost:3000/__federated/remoteEntry.js",
    scope: "ui",
    module: "./Store",
  });

  useEffect(() => {
    if (!isReady || isError || !mod) return;

    const { store } = mod;

    console.log(store);

    const interval = setInterval(() => {
      store.dispatch({ type: "counter/increment", payload: {} });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isError, isReady, mod]);

  if (!isReady) return <div>...loading</div>;
  if (isError) return <div>...app crashed</div>;

  console.log(mod);

  return (
    <div>
      <RemoteComponent
        url="http://localhost:3000/__federated/remoteEntry.js"
        scope="ui"
        module="./App"
      />
    </div>
  );
}

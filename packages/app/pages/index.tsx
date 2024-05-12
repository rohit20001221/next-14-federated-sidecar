// import RemoteComponent from "@/lib/components/RemoteComponent";
import RemoteComponentRuntime from "@/lib/components/RemoteComponentRuntime";
import { useRemoteModule } from "@/lib/hooks/remote-module";

export default function Home() {
  const { mod, isReady, isError } = useRemoteModule({
    url: "http://localhost:3000/remoteEntry.js",
    scope: "ui",
    module: "Store",
  });

  if (!isReady) return null;

  console.log(mod);

  return (
    <div>
      <RemoteComponentRuntime
        url="http://localhost:3000/remoteEntry.js"
        scope="ui"
        module="App"
      />
    </div>
  );
}

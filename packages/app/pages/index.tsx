// import RemoteComponent from "@/lib/components/RemoteComponent";
import RemoteComponentRuntime from "@/lib/components/RemoteComponentRuntime";

export default function Home() {
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

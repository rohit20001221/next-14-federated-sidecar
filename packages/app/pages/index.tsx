import RemoteComponent from "@/lib/components/RemoteComponent";
import App from "ui/App";

export default function Home() {
  return (
    <div>
      <App />

      <RemoteComponent
        url="http://localhost:3001/remoteEntry.js"
        scope="ui"
        module="./App"
      />
    </div>
  );
}

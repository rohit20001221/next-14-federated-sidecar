import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={() => setCount((c) => c + 1)}>increment</button>
      </div>
    </div>
  );
};

export default App;

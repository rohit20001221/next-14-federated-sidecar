import { useDispatch, useSelector } from "react-redux";
import { StoreProvider } from "./lib/store/provider";
import { increment } from "./lib/store/slices/counterSlice";

const App = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={() => dispatch(increment())}>increment</button>
      </div>
    </div>
  );
};

const MainApp = () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
};

export default MainApp;

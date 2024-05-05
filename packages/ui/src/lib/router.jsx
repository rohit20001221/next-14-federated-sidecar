import { Link, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>page0</h1>
        <div>
          <Link to={`/1`}>page 1</Link>
        </div>
        <div>
          <Link to={`/2`}>page 2</Link>
        </div>
      </div>
    ),
  },
  {
    path: "/1",
    element: (
      <div>
        <h1>page1</h1>
        <div>
          <Link to={`/`}>page 0</Link>
        </div>
        <div>
          <Link to={`/2`}>page 2</Link>
        </div>
      </div>
    ),
  },
  {
    path: "/2",
    element: (
      <div>
        <h1>page2</h1>
        <div>
          <Link to={`/`}>page 0</Link>
        </div>
        <div>
          <Link to={`/1`}>page 1</Link>
        </div>
      </div>
    ),
  },
]);

export default router;

import { createBrowserRouter } from "react-router";
import Home from "./src/Layout/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component:Home,
  },
]);
export default router
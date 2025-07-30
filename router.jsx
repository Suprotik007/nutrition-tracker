import { createBrowserRouter } from "react-router";
import Home from "./src/Layout/Home";
import MealSections from "./src/Components/MealSections";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home, 
    children: [
      {
        path: "meals", 
        Component: MealSections,
      },
    ],
  }

]);
export default router
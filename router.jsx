import { createBrowserRouter } from "react-router";
import Home from "./src/Layout/Home";
import MealSections from "./src/Components/MealSections";
import NutritionDetails from "./src/Components/NutritionDetails";
import FoodListWithDetails from "./src/Elements/FoodListWithDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home, 
    children: [
      {
        path: "/", 
        Component: MealSections,
      },
    ],
  },
  {
    path:'/mealDetails',
    Component:NutritionDetails
  },
  {
    path:'/mealDetails',
    Component:FoodListWithDetails
  }
  

]);
export default router
import { createBrowserRouter } from "react-router";
import Home from "./src/Layout/Home";
import NutritionDetails from "./src/Components/NutritionDetails";
import FoodListWithDetails from "./src/Elements/FoodListWithDetails";

import MainLayout from "./src/Layout/MainLayout";
import Google from "./src/Authentication/Google";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout, 
 
    children: [
      
     {
   index:true,
     Component:Home
     },
     {
      path:'/google',
      Component:Google
     }
    
    ],
  },
  {
    path:'/mealDetails',
    Component:NutritionDetails
  },
  {
    path:'/mealDetails',
    Component:FoodListWithDetails
  },

    

]);
export default router
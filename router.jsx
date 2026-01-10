import { createBrowserRouter } from "react-router";
import Home from "./src/Layout/Home";
import NutritionDetails from "./src/Components/NutritionDetails";
import FoodListWithDetails from "./src/Elements/FoodListWithDetails";
import PrivateRoute from './src/Provider/PrivateRoute';
import MainLayout from "./src/Layout/MainLayout";
import Google from "./src/Authentication/Google";
import BMICalculator from "./src/Pages/BMI/BMIcalculator";

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
        path: 'bmi-calculator',
        element: (
          <PrivateRoute>
            <BMICalculator />
          </PrivateRoute>
        ),
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
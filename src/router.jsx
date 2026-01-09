import React from 'react';
import { createBrowserRouter } from "react-router";
import BMICalculator from './Pages/BMI/BMIcalculator';
import MainLayout from './Layout/MainLayout';
import PrivateRoute from './Provider/PrivateRoute';
import Home from './Layout/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'bmi-calculator',
        element: (
          <PrivateRoute>
            <BMICalculator />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

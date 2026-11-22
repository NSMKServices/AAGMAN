import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage';
import ExplorePage from '../pages/ExplorePage';
import DestinationDetailPage from '../pages/DestinationDetailPage';
import HeritageCulturePage from '../pages/HeritageCulturePage';
import InteractiveMapPage from '../pages/InteractiveMapPage';
import FestivalsPage from '../pages/FestivalsPage';
import TripsPage from '../pages/TripsPage';
import WishlistPage from '../pages/WishlistPage';
import BudgetPlannerPage from '../pages/BudgetPlannerPage';
import PlannerPage from '../pages/PlannerPage';
import FaqPage from '../pages/FaqPage';
import SettingsPage from '../pages/SettingsPage';
import DashboardPage from '../pages/DashboardPage';
import FortsPage from '../pages/FortsPage';
import TemplesPage from '../pages/TemplesPage';
import BeachesPage from '../pages/BeachesPage';
import HeritagePage from '../pages/HeritagePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: ':category/:slug', element: <DestinationDetailPage /> },
      { path: 'heritage-culture', element: <HeritageCulturePage /> },
      { path: 'map', element: <InteractiveMapPage /> },
      { path: 'festivals', element: <FestivalsPage /> },
      { path: 'trips', element: <TripsPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'budget', element: <BudgetPlannerPage /> },
      { path: 'planner', element: <PlannerPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'forts', element: <FortsPage /> },
      { path: 'temples', element: <TemplesPage /> },
      { path: 'beaches', element: <BeachesPage /> },
      { path: 'heritage', element: <HeritagePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

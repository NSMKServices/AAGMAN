import React from 'react';
import { Navigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Consumer Pages
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
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import VideosPage from '../pages/VideosPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';

// Admin Architecture & Protected Routes
import AdminProtectedRoute from '../components/admin/AdminProtectedRoute';
import AdminPublicOnlyRoute from '../components/admin/AdminPublicOnlyRoute';
import AdminForgotPasswordPage from '../pages/admin/AdminForgotPasswordPage';
import AdminResetPasswordPage from '../pages/admin/AdminResetPasswordPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminContentPage from '../pages/admin/AdminContentPage';
import AdminPlaceManagerPage from '../pages/admin/AdminPlaceManagerPage';
import AdminVideosPage from '../pages/admin/AdminVideosPage';
import AdminAuditLogsPage from '../pages/admin/AdminAuditLogsPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

export const router = createBrowserRouter([
  // 1. Public Consumer Tourism Experience (Full-width, Public Header & Footer)
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'forts', element: <FortsPage /> },
      { path: 'temples', element: <TemplesPage /> },
      { path: 'beaches', element: <BeachesPage /> },
      { path: 'heritage', element: <HeritagePage /> },
      { path: 'heritage-culture', element: <HeritageCulturePage /> },
      { path: 'map', element: <InteractiveMapPage /> },
      { path: 'festivals', element: <FestivalsPage /> },
      { path: 'planner', element: <PlannerPage /> },
      { path: 'videos', element: <VideosPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: ':category/:slug', element: <DestinationDetailPage /> }
    ]
  },

  // 2. Traveler Dashboard Portal Experience (Dedicated Workspace Layout with Sidebar)
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'trips', element: <TripsPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'budget', element: <BudgetPlannerPage /> },
      { path: 'settings', element: <SettingsPage /> }
    ]
  },

  // 3. Admin Authentication Public Routes (Redirects to /admin if already signed in)
  {
    path: '/admin',
    element: <AdminPublicOnlyRoute />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'login', element: <Navigate to="/login?mode=admin" replace /> },
      { path: 'forgot-password', element: <AdminForgotPasswordPage /> },
      { path: 'reset-password', element: <AdminResetPasswordPage /> }
    ]
  },

  // 4. Protected Administrative Portal (Requires Supabase Auth & Role-Based Authorization)
  {
    path: '/admin',
    element: <AdminProtectedRoute allowedRoles={['super_admin', 'content_manager', 'editor']} />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'places', element: <AdminPlaceManagerPage /> },
          { path: 'destinations', element: <AdminContentPage category="destinations" /> },
          { path: 'festivals', element: <AdminContentPage category="festivals" /> },
          { path: 'videos', element: <AdminVideosPage /> },
          // Content Managers and Super Admins
          {
            element: <AdminProtectedRoute allowedRoles={['super_admin', 'content_manager']} />,
            children: [
              { path: 'audit-logs', element: <AdminAuditLogsPage /> }
            ]
          },
          // Super Admin Only Protected Sub-tree
          {
            element: <AdminProtectedRoute allowedRoles={['super_admin']} />,
            children: [
              { path: 'users', element: <AdminUsersPage /> },
              { path: 'settings', element: <AdminSettingsPage /> }
            ]
          }
        ]
      }
    ]
  },

  // 5. Catch-all 404 Route
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import FeedPage from "./Pages/FeedPage";
import ProfilePage from "./Pages/ProfilePage";
import PostDetails from "./Pages/PostDetails";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoutes from "./Layouts/ProtectedRoutes";
import AuthProtectedRoutes from "./Layouts/AuthProtectedRoutes";

export default function App() {
  //notes on app
  //Fix: Tailwind v4 config working, HeroUI styling pending v4 compatibility

  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <FeedPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "Post-details/:id",
          element: (
            <ProtectedRoutes>
              <PostDetails />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: "register",
          element: (
            <AuthProtectedRoutes>
              <Register />
            </AuthProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtectedRoutes>
              <Login />
            </AuthProtectedRoutes>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

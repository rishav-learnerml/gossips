/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Layout from "../common/Layout";
import Shimmer from "../utils/Shimmer";
import ErrorPage from "../pages/ErrorPage";
import { lazy, Suspense } from "react";

const SignUp = lazy(() => import("../pages/SignUp"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Blog = lazy(() => import("../pages/Blog"));
const Blogs = lazy(() => import("../pages/Blogs"));
const Publish = lazy(() => import("../pages/Publish"));

const Approuter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: (
          <Suspense fallback={<Shimmer />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "signin",
        element: (
          <Suspense fallback={<Shimmer />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: "blog/:id",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
]);

export default Approuter;

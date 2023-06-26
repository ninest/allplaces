import React from "react";
import ReactDOM from "react-dom/client";
import { RootLayout, rootLayoutLoader } from "./root-layout.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IndexPage } from "./index-page.tsx";
import { CountryPage, countryPageLoader } from "./country-page.tsx";
import { PageLayout } from "./page-layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLayoutLoader,
    children: [
      {
        element: <PageLayout />,
        children: [
          { index: true, element: <IndexPage /> },
          { path: `/:cca2`, element: <CountryPage />, loader: countryPageLoader },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { RootLayout, rootLayoutLoader } from "./root-layout.tsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IndexPage } from "./index-page.tsx";
import { CountryPage, countryPageLoader } from "./country-page.tsx";
import { PageLayout } from "./page-layout.tsx";
import { DivisionPage, divisionPageLoader } from "./division-page.tsx";

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
          {
            // @ts-ignore
            loader: countryPageLoader,
            path: `/:cca2`,
            element: <CountryPage />,
            children: [
              // State/province/district page
              {
                // @ts-ignore
                loader: divisionPageLoader,
                path: `/:cca2/:divisionCode`,
                element: <DivisionPage />
              }
            ]
          },
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

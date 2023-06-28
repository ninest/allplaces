import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CountryPage, countryPageLoader } from "./app/explorer/country-page.tsx";
import { DivisionPage, divisionPageLoader } from "./app/explorer/division-page.tsx";
import { ExplorerIndexPage } from "./app/explorer/explorer-index-page.tsx";
import { ExplorerPageLayout } from "./app/explorer/explorer-page-layout.tsx";
import { ExplorerRootLayout, explorerRootLayoutLoader } from "./app/explorer/explorer-root-layout.tsx";
import "./index.scss";
import { LettersRootLayout } from "./app/letters/letters-root-layout.tsx";
import { LetterPage, letterPageLoader } from "./app/letters/letter-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ExplorerRootLayout />,
    loader: explorerRootLayoutLoader,
    children: [
      {
        element: <ExplorerPageLayout />,
        children: [
          { index: true, element: <ExplorerIndexPage /> },
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
  {
    path: '/letters',
    element: <LettersRootLayout />,
    children: [
      {
        // @ts-ignore
        loader: letterPageLoader,
        path: `/letters/:letter`,
        element: <LetterPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { LoginPage } from "./app/login/page";
import { CreateStudyPage } from "./app/(Studies)/create/page";
import { GetStudyBySlugPage } from "./app/(Studies)/getBySlug/page";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create",
    element: <CreateStudyPage />,
  },
  {
    path: "/study/*",
    element: <GetStudyBySlugPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>
);

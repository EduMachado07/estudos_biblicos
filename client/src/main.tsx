import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { LoginPage } from "./app/login/page";
import { CreateStudyPage } from "./app/(Studies)/create/page";
import { GetStudyBySlugPage } from "./app/(Studies)/getBySlug/page";
import { ProfilePage } from "./pages/profile";
import { GetStudiesPage } from "./app/(Studies)/get/page";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "",
    element: < App />,
    children: [
      {
        path: "/",
        element: <GetStudiesPage />,
      },
      {
        path: "/create",
        element: <CreateStudyPage />,
      },
      {
        path: "/study/*",
        element: <GetStudyBySlugPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>
);

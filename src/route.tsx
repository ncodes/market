import SwapPage from "@/pages/swap/swap.tsx";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errors/error-page.tsx";
import Layout from "./layouts/layout.tsx";
import LandingPage from "./pages/landing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout page={<LandingPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/swap/:orderId?",
    element: <Layout page={<SwapPage />} />,
    errorElement: <ErrorPage />,
  },
]);

export default router;

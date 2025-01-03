import SwapPage from "@/pages/swap/swap.tsx";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errors/error-page.tsx";
import Layout from "./layouts/layout.tsx";
import CreateMarketPage from "./pages/create/create-market.tsx";
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
  {
    path: "/create/market",
    element: <Layout page={<CreateMarketPage />} />,
    errorElement: <ErrorPage />,
  },
]);

export default router;

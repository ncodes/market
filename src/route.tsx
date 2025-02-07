import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errors/error-page";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/landing";
import SwapPage from "./pages/swap/swap";
import CreateLiquidityPage from "@/pages/liquidity/create/page.tsx";
import CreateMarketPage from "@/pages/markets/create/page.tsx";

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
    path: "/create/liquidity",
    element: <Layout page={<CreateLiquidityPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create/market",
    element: <Layout page={<CreateMarketPage />} />,
    errorElement: <ErrorPage />,
  }
]);

export default router;

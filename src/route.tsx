import CreateLiquidityPage from "@/pages/liquidity/create/page.tsx";
import MyLiquidityPage from "@/pages/liquidity/my-liquidity/page";
import CreateMarketPage from "@/pages/markets/create/page.tsx";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errors/error-page";
import Layout from "./layouts/Layout";
import LandingPage from "./pages/landing";
import SwapPage from "./pages/swap/swap";
import ViewLiquidityPage from "./pages/liquidity/view/page";
import ViewMarketPage from "./pages/markets/view/page";
import ExplorePage from "./pages/explore/page";

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
  },
  {
    path: "/liquidity",
    element: <Layout page={<MyLiquidityPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/liquidity/view",
    element: <Layout page={<ViewLiquidityPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/market/view",
    element: <Layout page={<ViewMarketPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/explore",
    element: <Layout page={<ExplorePage />} />,
    errorElement: <ErrorPage />,
  },
]);

export default router;

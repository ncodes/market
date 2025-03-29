import CreateLiquidityPage from "@/pages/liquidity/create/page.tsx";
import MyLiquidityPage from "@/pages/liquidity/my-liquidity/page";
import CreateMarketPage from "@/pages/markets/create/page.tsx";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errors/error-page";
import Layout from "./layouts/Layout";
import ExplorePage from "./pages/explore/page";
import LandingPage from "./pages/landing";
import ViewLiquidityPage from "./pages/liquidity/view/page";
import ViewMarketPage from "./pages/markets/view/page";
import SwapPage from "./pages/swap/swap";

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
    path: "/liquidity/create",
    element: <Layout page={<CreateLiquidityPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/market/create",
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
    path: "/market/view/:marketId",
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

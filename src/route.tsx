import CreateLiquidityPage from "@/pages/liquidity/create/page.tsx";
import MyLiquidityPage from "@/pages/liquidity/my-liquidity/page";
import CreateMarketPage from "@/pages/markets/create/page.tsx";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errors/error-page";
import Layout from "./layouts/Layout";
import ExplorePage from "./pages/explore/page";
import ViewLiquidityPage from "./pages/liquidity/view/page";
import ViewMarketPage from "./pages/markets/view/page";
import SwapPage from "./pages/swap/swap";
import PrivacyPolicyPage from "./pages/website/privacy-policy";
import TermsOfServicePage from "./pages/website/terms";
import WebsiteHomePage from "./pages/website/home";
import WebsiteTradePage from "./pages/website/trade";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout page={<WebsiteHomePage />} />,
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
    path: "/liquidity/:id",
    element: <Layout page={<ViewLiquidityPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/market/:marketId",
    element: <Layout page={<ViewMarketPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/explore",
    element: <Layout page={<ExplorePage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/privacy-policy",
    element: <Layout page={<PrivacyPolicyPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms",
    element: <Layout page={<TermsOfServicePage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/trade",
    element: <Layout page={<WebsiteTradePage />} />,
    errorElement: <ErrorPage />,
  },
]);

export default router;

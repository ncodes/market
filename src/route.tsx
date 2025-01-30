import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errors/error-page";
import Layout from "./layouts/Layout";
import CreateMarketPage from "./pages/create/create-market";
import LandingPage from "./pages/landing";
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
    path: "/create/market",
    element: <Layout page={<CreateMarketPage />} />,
    errorElement: <ErrorPage />,
  },
]);

export default router;

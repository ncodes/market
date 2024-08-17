import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./errors/error-page.tsx";
import Layout from "./layout.tsx";
import LandingPage from "./pages/landing.tsx";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout page={<LandingPage />} />,
    errorElement: <ErrorPage />,
  }
]);

export default router;

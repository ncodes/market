import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import ConnectorProvider from "./hooks/connectors/components/ConnectorProvider.tsx";
import "./local_assets.ts";
import "./polyfills.ts";
import router from "./route.tsx";
import "./styles/index.css";

import { Buffer } from "buffer";
(window as any).Buffer = (window as any).Buffer ?? Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConnectorProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </ConnectorProvider>
  </React.StrictMode>,
);

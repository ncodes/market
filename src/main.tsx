import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ConnectorProvider from "./hooks/connectors/components/ConnectorProvider.tsx";
import router from "./route.tsx";
import "./styles/index.css";
import "../polyfills.ts";

import { Buffer } from "buffer";
(window as any).Buffer = (window as any).Buffer ?? Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConnectorProvider>
      <RouterProvider router={router} />
    </ConnectorProvider>
    ,
  </React.StrictMode>,
);

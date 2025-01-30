import { useContext } from "react";
import { ConnectorContext } from "./context";
import { IConnector } from "./interface.ts";

export function useConnectorContext() {
  return useContext<IConnector>(ConnectorContext);
}

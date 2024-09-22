import { useEffect } from "react";
import { useInterval } from "usehooks-ts";
import { StoreAccessTokenKey } from "../constants";
import { useConnectorContext } from "./connectors/useConnectorContext";
import useStore from "./store/useStore";
export function useSession() {
  const { address } = useConnectorContext();
  const { token, setToken } = useStore((state) => ({
    token: state.token,
    setToken: state.setToken,
  }));

  useEffect(() => {
    setToken(localStorage.getItem(makeKey(address)) || "");
  }, []);

  useInterval(() => {
    const val = localStorage.getItem(makeKey(address));
    setToken(val || "");
  }, 5000);

  function makeKey(address: string) {
    return `${StoreAccessTokenKey}:${address}`;
  }

  function hasAccessToken(address: string) {
    return !!getAccessToken(address);
  }

  function getAccessToken(address: string) {
    setToken(localStorage.getItem(makeKey(address)) || "");
    return localStorage.getItem(makeKey(address));
  }

  function delAccessToken(address: string) {
    localStorage.removeItem(makeKey(address));
    setToken("");
  }

  function setAccessToken(address: string, token: string) {
    localStorage.setItem(makeKey(address), token);
    setToken(token);
  }

  return {
    token,
    hasAccessToken,
    getAccessToken,
    delAccessToken,
    setAccessToken,
  };
}

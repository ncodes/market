import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useConnectorContext } from "../hooks/connectors/useConnectorContext";
import { useUserService } from "../hooks/services/backend/useUserService";
import useStore from "../hooks/store/useStore";
import { useSession } from "../hooks/useSession";

export default function useLayout() {
  const { token, setAccessToken } = useSession();
  // const { getRequestCountryCode } = useMiscService();
  const { getUser } = useUserService();
  const { address, chainInfo } = useConnectorContext();
  const setUser = useStore((state) => state.setUser);
  // const setBrowserCountryCode = useStore((state) => state.setBrowserCountryCode);

  useEffect(() => {
    if (!token) setUser(undefined);
  }, [token]);

  // Fetch authenticated user info periodically
  const getAuthUserQry = useQuery({
    queryKey: ["authUser", { noAuth: false, addressOrUserId: address, net: chainInfo?.queryName }],
    queryFn: getUser,
    enabled: !!token,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 15000,
  });

  // Update user state and access token
  useEffect(() => {
    if (getAuthUserQry.isSuccess) {
      setUser(getAuthUserQry.data);
    } else {
      setUser(undefined);
      setAccessToken(address, "");
    }
  }, [getAuthUserQry.data, getAuthUserQry.isSuccess, getAuthUserQry.isError]);

  // const getCountryCode = useQuery({
  //   queryKey: ["getCountryCode", {}],
  // queryFn: getRequestCountryCode,
  //   enabled: true,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchInterval: false,
  // });

  // useEffect(() => {
  // if (getCountryCode.isSuccess) setBrowserCountryCode(getCountryCode.data);
  // }, [getCountryCode.isSuccess, getCountryCode.data]);

  return {};
}

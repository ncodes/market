import { useEffect, useState } from "react";
import useStore from "./store/useStore";

export default function useGeo() {
  const user = useStore((s) => s.user);
  const browserCountryCode = useStore((s) => s.browserCountryCode);
  const [country, setCountry] = useState("");

  useEffect(() => {
    setCountry(getCountry());
  }, [user, browserCountryCode]);

  function getCountry() {
    if (!user || !user.country) return browserCountryCode;
    return user.country;
  }

  return {
    country,
  };
}

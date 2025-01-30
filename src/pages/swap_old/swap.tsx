import { Header } from "@/components/header/Header";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { SwapOrder } from "./components/order/SwapOrder";
import { Swapper } from "./components/swapper/Swapper";

export default function SwapPage() {
  const { orderId } = useParams();

  return (
    <div className="overflow-hidden font-poppins text-white">
      <Helmet>
        <title>Swap</title>
      </Helmet>
      <Header />
      {!orderId && <Swapper />}
      {orderId && <SwapOrder />}
    </div>
  );
}

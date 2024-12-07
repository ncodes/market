import { Header } from "@/components/header/header.tsx";
import { useParams } from "react-router-dom";
import { SwapOrder } from "./components/order/SwapOrder";
import { Swapper } from "./components/swapper/Swapper";

export default function SwapPage() {
  const { orderId } = useParams();

  return (
    <div className="overflow-hidden font-poppins text-white">
      <Header />
      {!orderId && <Swapper />}
      {orderId && <SwapOrder />}
    </div>
  );
}

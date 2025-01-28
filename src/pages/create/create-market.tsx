import { Helmet } from "react-helmet-async";
import { Header } from "../../components/header/Header";
import { MarketCreator } from "./components/MarketCreator";

export default function CreateMarketPage() {
  return (
    <div className="font-poppins text-white">
      <Helmet>
        <title>Create Market</title>
      </Helmet>
      <Header />
      <MarketCreator />
    </div>
  );
}

import PageLayout from "@/layouts/PageLayout.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useMarketLogic } from "./useMarketLogic";
import CreateLiquidityComponent from "./create-liquidity";

export default function CreateLiquidityPage() {
  const { topMarkets } = useMarketLogic();

  return (
    <PageLayout title="Create Liquidity">
      <div className="flex w-full justify-center px-4">
        {topMarkets.isLoading && <PageLoader />}
        {((topMarkets.data && topMarkets.data.length) || null) && (
          <CreateLiquidityComponent market={topMarkets.data![0]} />
        )}
      </div>
    </PageLayout>
  );
}

function PageLoader() {
  return (
    <div className="mt-5 w-full max-w-sm overflow-hidden rounded-3xl border border-eerie-black bg-chinese-black px-4 py-5 lg:mt-10 lg:max-w-md">
      <Skeleton className="h-[40px] w-full max-w-[250px] rounded-xl bg-gunmetal" />
      <Skeleton className="mt-5 h-[80px] w-full rounded-xl bg-gunmetal" />
      <Skeleton className="mt-5 h-[80px] w-full rounded-xl bg-gunmetal" />
      <Skeleton className="mt-5 h-[80px] w-full rounded-xl bg-gunmetal" />
    </div>
  );
}

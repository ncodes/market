import PageLayout from "@/layouts/PageLayout";
import Swap from "@/components/Swap";

export default function SwapPage() {
  return (
    <PageLayout title="Swap">
      <div className="mt-16 flex w-full justify-center">
        <div className="w-[500px]">
          <Swap />
        </div>
      </div>
    </PageLayout>
  );
}

import PageLayout from "@/layouts/PageLayout";
import Swap from "@/components/Swap";

export default function SwapPage() {
  return (
    <PageLayout title="Swap">
      <div className="mt-16 flex w-full justify-center p-4 md:p-0">
        <div className="w-full md:w-[500px]">
          <Swap />
        </div>
      </div>
    </PageLayout>
  );
}

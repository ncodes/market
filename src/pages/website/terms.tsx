import ScrollSpy from "@/components/ScrollSpy";
import WebsiteLayout from "@/layouts/WebsiteLayout";
import { privacyPolicySections } from "@/libs/data";

export default function TermsOfServicePage() {
  return (
    <WebsiteLayout title="Terms of Service">
      <div className="mt-16 w-full px-28">
        <ScrollSpy sections={privacyPolicySections} title="Terms of Service" label="LEGAL" />
      </div>
    </WebsiteLayout>
  );
}

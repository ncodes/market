import ScrollSpy from "@/components/ScrollSpy";
import WebsiteLayout from "@/layouts/WebsiteLayout";
import { privacyPolicySections } from "@/libs/data";

export default function PrivacyPolicyPage() {
  return (
    <WebsiteLayout title="Privacy Policy">
      <div className="mt-4 w-full px-4 md:mt-16 md:px-28">
        <ScrollSpy sections={privacyPolicySections} title="Privacy Policy" label="LEGAL" />
      </div>
    </WebsiteLayout>
  );
}

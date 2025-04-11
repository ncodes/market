import ScrollSpy from "@/components/ScrollSpy";
import WebsiteLayout from "@/layouts/WebsiteLayout";
import { privacyPolicySections } from "@/libs/data";

export default function PrivacyPolicyPage() {
  return (
    <WebsiteLayout title="Privacy Policy">
      <div className="w-full px-28 mt-16">
        <ScrollSpy sections={privacyPolicySections} title="Privacy Policy" label="LEGAL" />
      </div>
    </WebsiteLayout>
  );
}

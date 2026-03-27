import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Clocking Systems Limited",
  description: "Privacy policy for Clocking Systems Limited and EvoTime Pro software.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#0A1628] mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: March 2025</p>

      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">1. Who we are</h2>
          <p>
            Clocking Systems Limited is a company registered in England and Wales, headquartered in Leeds, West Yorkshire. We supply time and attendance hardware terminals and cloud software (EvoTime Pro) to UK businesses.
          </p>
          <p>
            For the purposes of UK GDPR, Clocking Systems Limited is the data controller for personal data collected via our website and software.
          </p>
          <p>Contact: hello@clockingsystems.co.uk | 0113 258 7856</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">2. What data we collect</h2>
          <p><strong>Website visitors:</strong> IP address, pages visited, browser type, referring URL (via analytics). We do not use advertising cookies.</p>
          <p><strong>Customers (hardware and software):</strong> Name, email address, company name, phone number, billing and delivery address, order history.</p>
          <p><strong>EvoTime Pro users:</strong> Account login credentials, employee clocking data submitted by the customer, leave records, shift configurations. We act as a data processor for employee data on behalf of our business customers.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">3. How we use your data</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>To process and fulfil hardware orders</li>
            <li>To provide and maintain EvoTime Pro software accounts</li>
            <li>To provide customer support</li>
            <li>To send transactional emails (order confirmations, invoices)</li>
            <li>To comply with legal obligations (accounting, HMRC)</li>
          </ul>
          <p>We do not use your data for advertising or share it with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">4. Biometric data</h2>
          <p>
            Our hardware terminals may process biometric data (fingerprints, facial geometry, palm vein patterns). Biometric templates are stored locally on the terminal device. They are not transmitted to or stored in our cloud software. The data that syncs to EvoTime Pro is a clocking record (employee ID, timestamp) — not biometric data.
          </p>
          <p>
            Our business customers are the data controllers for any biometric data processed through our terminals. We provide guidance on GDPR compliance for biometric processing in our resources section.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">5. Data retention</h2>
          <p>Customer account and order data is retained for 7 years to comply with UK accounting regulations. EvoTime Pro clocking data is retained for the duration of the subscription plus 30 days after termination, after which it is deleted.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">6. Your rights</h2>
          <p>Under UK GDPR, you have the right to access, rectify, erase, restrict, and port your personal data, and to object to its processing. To exercise these rights, email hello@clockingsystems.co.uk.</p>
          <p>You have the right to lodge a complaint with the Information Commissioner&apos;s Office (ico.org.uk).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">7. Changes to this policy</h2>
          <p>We may update this policy from time to time. We will notify active customers of material changes by email.</p>
        </section>
      </div>
    </div>
  );
}

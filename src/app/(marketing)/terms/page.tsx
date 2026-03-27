import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Clocking Systems Limited",
  description: "Terms and conditions for purchasing hardware and EvoTime Pro software from Clocking Systems Limited.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-[#0A1628] mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: March 2025</p>

      <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-8">
        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">1. Introduction</h2>
          <p>
            These Terms of Service govern your purchase of hardware and software from Clocking Systems Limited (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), a company registered in England and Wales.
          </p>
          <p>By placing an order you agree to these terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">2. Hardware — purchase and warranty</h2>
          <p>Hardware terminals are sold as one-off purchases. All hardware carries a 3-year warranty from the date of purchase. During the warranty period, we will repair or replace faulty hardware at no charge, excluding damage caused by misuse, unauthorised modification, or failure to follow installation instructions.</p>
          <p>Hardware ships via tracked courier. Next day delivery is available on orders placed before 2pm on working days. Delivery is to UK mainland addresses only unless agreed in writing.</p>
          <p>Returns are accepted within 14 days of delivery for unused, undamaged hardware in its original packaging. Contact hello@clockingsystems.co.uk to arrange a return.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">3. EvoTime Pro software — subscription</h2>
          <p>EvoTime Pro is provided as an annual subscription. The subscription fee is charged in full at the start of each annual term. There are no monthly payment options.</p>
          <p>If you choose not to renew at the end of the annual term, your access to EvoTime Pro will end. Your data will be retained for 30 days following expiry, during which you may request an export.</p>
          <p>We do not offer a free trial. A full demonstration of the software is available at clockingsystems.co.uk/demo.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">4. Pricing and VAT</h2>
          <p>All prices displayed on our website are exclusive of VAT. VAT at the current UK rate (20%) is added at checkout. A full VAT invoice is issued with every order.</p>
          <p>We reserve the right to change prices at any time. Prices confirmed at checkout are fixed for that order.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">5. Limitation of liability</h2>
          <p>To the extent permitted by law, our liability to you in connection with any order or subscription is limited to the amount you paid for that order or subscription in the 12 months preceding the claim.</p>
          <p>We are not liable for indirect loss, loss of profits, loss of data, or business interruption.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">6. Governing law</h2>
          <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">7. Contact</h2>
          <p>hello@clockingsystems.co.uk | 0113 258 7856 | Leeds, West Yorkshire, UK</p>
        </section>
      </div>
    </div>
  );
}

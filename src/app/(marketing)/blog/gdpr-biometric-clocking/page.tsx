import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR & Biometric Clocking: What UK Employers Need to Know — Clocking Systems",
  description:
    "Is biometric time and attendance GDPR compliant in the UK? Learn what the law says about storing fingerprint and facial recognition data for employee clocking.",
  openGraph: {
    title: "GDPR & Biometric Clocking — What UK Employers Need to Know",
    description: "UK GDPR guidance on fingerprint and facial recognition time & attendance systems.",
    type: "article",
  },
};

export default function GDPRArticle() {
  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          <span className="text-xs font-semibold bg-purple-600 rounded-full px-3 py-1 mb-4 inline-block">Compliance</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            GDPR &amp; Biometric Clocking: What UK Employers Need to Know
          </h1>
          <div className="text-blue-200 text-sm">
            Published January 2025 · 7 min read · By Clocking Systems
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
          <p className="text-lg">
            Biometric data — including fingerprints and facial geometry — is classified as &ldquo;special category&rdquo; data under UK GDPR. This means it carries higher legal obligations than standard employee data. But that doesn&apos;t mean biometric clocking is off-limits. It means you need to handle it correctly.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">What counts as biometric data?</h2>
          <p>
            Under Article 9 of UK GDPR, biometric data processed for the purpose of uniquely identifying a natural person is special category data. In a clocking context, this includes:
          </p>
          <ul>
            <li>Fingerprint templates stored for 1:N matching</li>
            <li>Facial geometry data used for face recognition</li>
            <li>Palm vein patterns</li>
          </ul>
          <p>
            A photograph of an employee alone does not constitute biometric data unless it is processed through specific technical means to uniquely identify the individual.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">What legal basis can you use?</h2>
          <p>
            For special category data, you need both a standard lawful basis and an additional condition under Article 9. The most practical options for employers are:
          </p>
          <p>
            <strong>Explicit consent (Article 9(2)(a)):</strong> The employee gives clear, specific, informed and freely given consent. For employees, &ldquo;freely given&rdquo; is the challenge — if there is a power imbalance (which there usually is in employment), the ICO may question whether consent was truly voluntary.
          </p>
          <p>
            <strong>Substantial public interest (Article 9(2)(g)):</strong> This is unlikely to apply to most private businesses using clocking systems.
          </p>
          <p>
            <strong>Employment, social security or social protection law (Article 9(2)(b)):</strong> Processing is necessary for carrying out obligations and exercising rights in employment. This can apply if biometric clocking is genuinely necessary — but &ldquo;convenient&rdquo; is not the same as &ldquo;necessary&rdquo;.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">Practical steps for UK employers</h2>
          <ul className="space-y-3">
            <li><strong>Conduct a DPIA.</strong> A Data Protection Impact Assessment is required before implementing biometric processing. Document the purpose, the risks, and the mitigations.</li>
            <li><strong>Provide a legitimate alternative.</strong> Offer card or fob clocking as an alternative so employees who object to biometrics can still clock in. This also supports the &ldquo;freely given&rdquo; requirement if you are using consent.</li>
            <li><strong>Store templates, not images.</strong> Our terminals store mathematical templates, not actual fingerprint or face images. The template cannot be reverse-engineered into a biometric image.</li>
            <li><strong>Keep data on the device.</strong> Biometric templates in our systems are stored locally on the terminal, not transmitted to or stored in the cloud. The clocking record (time, employee ID) is what syncs to the software.</li>
            <li><strong>Update your privacy notice.</strong> Employees must be told what biometric data is processed, why, how long it is retained, and their rights.</li>
            <li><strong>Have a deletion process.</strong> When an employee leaves, delete their biometric template from the device promptly.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0A1628]">Is card/fob clocking simpler from a GDPR perspective?</h2>
          <p>
            Yes. If you use RFID cards or fobs for clocking, you are not processing biometric data. A card number is standard personal data, not special category data. This makes GDPR compliance straightforward: standard lawful basis applies (legitimate interests or contractual necessity), and you don&apos;t need a DPIA for the clocking system itself.
          </p>
          <p>
            Many businesses choose our A124 Cards/Fobs Only terminal (£275) precisely for this reason — simpler compliance, lower cost, no biometric concerns.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-[#0A1628] mb-2">Choose the right terminal for your compliance needs</h3>
            <p className="text-sm text-gray-600 mb-4">
              Card/fob clocking at £275 or biometric at £295 — we have options for every compliance posture. Call us if you have questions.
            </p>
            <div className="flex gap-3">
              <Link href="/hardware" className="inline-flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-blue-700 transition-colors">
                View hardware
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:01132587856" className="inline-flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                0113 258 7856
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

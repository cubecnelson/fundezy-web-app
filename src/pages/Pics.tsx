import { useAnalytics } from '../hooks/useAnalytics';

export default function Pics() {
  useAnalytics('PICS');

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Fundezy Personal Information Collection Statement (PICS) &lt;202504&gt;
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Fundezy.io (referred to as "we" or "us") values your privacy and is committed to safeguarding your personal data. This Personal Information Collection Statement (PICS) explains how we collect, use, and disclose your personal data when you interact with our platform. We adhere to applicable data protection laws—including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and Personal Data (Privacy) Ordinance (PDPO)—to ensure that your data is handled responsibly, transparently, and securely.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">What Personal Data Does Fundezy.io Collect?</h3>
          <ul className="mt-6 space-y-4 text-lg leading-8 text-gray-600 dark:text-gray-300 list-decimal list-inside">
            <li>
              <strong className="text-gray-900 dark:text-white">Personal Information:</strong> We gather details such as your full name, email address, and other information you provide during registration. This data forms the foundation for managing your account and ensuring secure interactions.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Usage Data:</strong> Information about your activities on our platform is collected, including browsing history, preferences, and activity logs. This data helps us understand user interactions, improve our services, and tailor content to your interests.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Trading Records:</strong> For users participating in the MT5 trading platform via Fundezy.io, we record behavioral data related to trading activities. This includes transactional details and usage patterns that assist in service management and risk mitigation.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">Device Information:</strong> We log details about the device you use to access Fundezy.io, such as your IP address, operating system, and browser type. This information is collected to optimize platform performance and enhance security measures.
            </li>
          </ul>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">How Does Fundezy.io Use Personal Data?</h3>
          <ul className="mt-6 space-y-4 text-lg leading-8 text-gray-600 dark:text-gray-300 list-disc list-inside">
            <li><strong className="text-gray-900 dark:text-white">Service Provision and Management:</strong> We use personal data to operate and manage the platform, including facilitating project interactions.</li>
            <li><strong className="text-gray-900 dark:text-white">Identity Verification and Account Security:</strong> Your data assists in verifying your identity, securing your account, and preventing fraud, ensuring that only authorized users access sensitive features.</li>
            <li><strong className="text-gray-900 dark:text-white">Platform Enhancement:</strong> Aggregated usage data and feedback are analyzed to improve the platform's functionality, design, and overall user experience.</li>
            <li><strong className="text-gray-900 dark:text-white">Communication and Support:</strong> We use your contact information to send updates, promotional messages (only with your explicit consent), and responses to support inquiries, keeping you informed about changes or opportunities relevant to your interests.</li>
            <li><strong className="text-gray-900 dark:text-white">Legal and Regulatory Compliance:</strong> Your personal data may be used to comply with legal obligations, including regulatory reporting, fraud prevention, and data protection requirements, thereby aligning our services with both local and international regulations.</li>
          </ul>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Use of Personal Data in Direct Marketing</h3>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Fundezy.io is committed to ensuring that direct marketing communications are sent only with your explicit consent. Should you agree to receive such communications, you will be informed about new features, promotions, and services. You retain the right to opt out of receiving marketing content at any time, and we will respect your choice to discontinue these communications.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Disclosure of Personal Data</h3>
          <ul className="mt-6 space-y-4 text-lg leading-8 text-gray-600 dark:text-gray-300 list-disc list-inside">
            <li><strong className="text-gray-900 dark:text-white">Service Providers:</strong> We share data with trusted third-party vendors who support various aspects of our operations, such as hosting, analytics, and customer support. These providers are bound by contractual obligations to protect your data.</li>
            <li><strong className="text-gray-900 dark:text-white">Legal and Regulatory Authorities:</strong> When required by law or in response to lawful requests by public authorities, we may disclose personal data to government or regulatory bodies to protect our legal rights or to comply with legal obligations.</li>
            <li><strong className="text-gray-900 dark:text-white">Business Partners:</strong> In certain cases, data may be shared with our collaborators to facilitate services, investment opportunities, or funding projects. Such sharing is conducted under strict confidentiality and data protection measures.</li>
          </ul>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            It is important to note that Fundezy.io does not sell your personal data to any third party.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Retention of Personal Data</h3>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We retain your personal data only as long as it is necessary for the purposes outlined in this PICS or as mandated by applicable law. Once your data is no longer required, we will either securely delete it or anonymize it to prevent re-identification.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Your Rights</h3>
          <ul className="mt-6 space-y-4 text-lg leading-8 text-gray-600 dark:text-gray-300 list-disc list-inside">
            <li><strong className="text-gray-900 dark:text-white">Access:</strong> The ability to request and obtain a copy of the personal data we hold about you.</li>
            <li><strong className="text-gray-900 dark:text-white">Correction:</strong> The right to have inaccurate or incomplete data corrected.</li>
            <li><strong className="text-gray-900 dark:text-white">Erasure:</strong> The right to request the deletion of your personal data, often referred to as the "right to be forgotten."</li>
            <li><strong className="text-gray-900 dark:text-white">Restriction:</strong> The right to request limitations on how your personal data is processed.</li>
            <li><strong className="text-gray-900 dark:text-white">Objection:</strong> The right to object to certain types of processing, including the processing of your data for direct marketing.</li>
            <li><strong className="text-gray-900 dark:text-white">Data Portability:</strong> The right to receive your data in a structured, machine-readable format for transfer to another entity.</li>
            <li><strong className="text-gray-900 dark:text-white">Withdrawal of Consent:</strong> Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of processing based on consent prior to its withdrawal.</li>
          </ul>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            To exercise any of these rights, please contact us using the contact details provided at the end of this statement.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Security of Personal Data</h3>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            The security of your personal data is a paramount concern. We employ appropriate technical and organizational measures to protect against unauthorized access, disclosure, alteration, or destruction of your data. These measures include encryption, regular security assessments, and strict internal controls.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contact Us</h3>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            For any inquiries regarding this PICS or to exercise your data rights, please reach out to us at:<br />
            <strong>Email: <a href="mailto:admin@fundezy.io" className="underline">admin@fundezy.io</a></strong>
          </p>
        </div>
      </div>
    </div>
  );
} 
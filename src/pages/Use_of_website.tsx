import { useAnalytics } from '../hooks/useAnalytics';

export default function UseOfWebsite() {
  useAnalytics('Use_of_Website');

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Fundezy Conditions for Use of Website &lt;202504&gt;
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-2xl lg:mx-0 space-y-8 text-lg leading-8 text-gray-600 dark:text-gray-300">
          <section>
            <p>Welcome to Fundezy.io. These Conditions for Use of Website ("Terms") govern your access to and use of our platform. By using Fundezy.io, you agree to these Terms. If you do not agree, please refrain from using our services.</p>
            <p>By clicking "I Agree" or using the Website, you confirm your acceptance of these Terms. Continued access or use of the Website after any changes to these Conditions constitutes your acceptance of the revised terms.</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Eligibility and Definitions</h3>
            <p>These Conditions apply to all users regardless of location. By accessing the Website, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Conditions in your jurisdiction.</p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>"User" or "you":</strong> refers to any individual or entity accessing or using the Website.</li>
              <li><strong>"Content":</strong> includes all text, images, graphics, audio, video, software, data, and other materials made available on the Website.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">User Registration, Account Security, and Identity Verification</h3>
            <p>In order to access certain features of the Website, registration or account creation may be required. You agree to:</p>
            <ol className="list-decimal list-inside ml-4">
              <li><strong>Provide Accurate Information:</strong> Provide accurate, current, and complete information during registration and update such information as necessary.</li>
              <li><strong>Account Security:</strong> Maintain the confidentiality of your login credentials and promptly notify us if you suspect any unauthorized use of your account. Unauthorized access or use of other users' accounts is strictly prohibited.</li>
              <li><strong>Identity Verification:</strong> Complete identity verification procedures where applicable to ensure a secure and trustworthy user community. Fundezy reserves the right to suspend or terminate your account if any information provided is found to be inaccurate or fraudulent.</li>
            </ol>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Ownership of User-Generated Content</h3>
            <p>By submitting content to the Website, you confirm that you own the rights to the content or have obtained the necessary permissions. You grant Fundezy a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, and distribute your content for promotional purposes.</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Funding and Refund Policies</h3>
            <ol className="list-decimal list-inside ml-4">
              <li><strong>Funding Triggers:</strong> Funds will only be released if specific project goals are met, as outlined in the campaign details.</li>
              <li><strong>Refunds:</strong> Refunds are subject to the terms specified in the campaign and are only issued under certain conditions.</li>
              <li><strong>Platform Fees:</strong> Fundezy charges a platform fee, which will be disclosed during the campaign setup process.</li>
            </ol>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Prohibited Activities</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Submitting fraudulent campaigns or misusing funds.</li>
              <li>Engaging in hate speech, harassment, or other harmful behavior.</li>
              <li>Violating intellectual property rights or uploading unauthorized content.</li>
            </ul>
            <p>Fundezy reserves the right to suspend or terminate accounts for violations of these terms.</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Disclaimers and Limitation of Liability</h3>
            <p>Fundezy does not guarantee the success of any campaign or the fulfillment of rewards promised by project creators. The platform is not responsible for the authenticity of projects or the use of funds by creators.</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Changes to These Terms</h3>
            <p>Fundezy reserves the right to update these Terms at any time. Users will be notified of significant changes, and continued use of the Website constitutes acceptance of the updated Terms.</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Contact Us</h3>
            <p>For any questions or concerns regarding these Terms, please contact us at <a href="mailto:admin@fundezy.io" className="underline">admin@fundezy.io</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
} 
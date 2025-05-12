import { useAnalytics } from '../hooks/useAnalytics';

export default function Pps() {
  useAnalytics('PPS');

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            Fundezy Privacy Policy Statement (PPS) &lt;202504&gt;
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-2xl lg:mx-0 space-y-8 text-lg leading-8 text-gray-600 dark:text-gray-300">
          <section>
            <p>At Fundezy, we are committed to protecting your personal data and ensuring transparency in how we collect, use, and share your information. This Privacy Policy outlines our practices and your rights under applicable data protection laws, including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and the Personal Data (Privacy) Ordinance (PDPO). By using our website (<a href="https://fundezy.io" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">https://fundezy.io</a>), you agree to the terms of this Privacy Policy.</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">1. Data We Collect</h3>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Personal Information:</strong> Name, email address, and other details provided during registration.</li>
              <li><strong>Usage Data:</strong> Information about your interactions with our website, including browsing history and preferences.</li>
              <li><strong>Device Information:</strong> Details about the device you use to access our website, such as IP address, operating system, and browser type.</li>
              <li><strong>Trading Records:</strong> Behavioral data on the MT5 trading platform registered via Fundezy.io.</li>
              <li><strong>Location Data:</strong> Geolocation data, if enabled on your device.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">2. How We Use Your Data</h3>
            <ul className="list-disc list-inside ml-4">
              <li>To provide and personalize our services.</li>
              <li>To communicate with you about updates, promotions, and support.</li>
              <li>To ensure the security and functionality of our website.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">3. Your Rights</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Right to access, correct, or delete your personal data.</li>
              <li>Right to object to or restrict data processing.</li>
              <li>Right to data portability.</li>
              <li>Right to withdraw consent at any time.</li>
              <li>Right to lodge a complaint with a supervisory authority, such as the Office of the Privacy Commissioner for Personal Data in Hong Kong.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">4. Data Sharing and Third Parties</h3>
            <p>We do not sell your personal data. However, we may share your data with trusted third-party service providers to facilitate our services. These providers are contractually obligated to comply with applicable data protection laws and to use your data only for the purposes specified by us.</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">5. Data Retention</h3>
            <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. The retention period may vary depending on legal, regulatory, or operational requirements.</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">6. Breach Notification</h3>
            <p>In the event of a data breach, we will notify affected users and the relevant supervisory authority within the timeframe required by applicable laws.</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">7. Contact Us</h3>
            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:admin@fundezy.io" className="underline">admin@fundezy.io</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
} 
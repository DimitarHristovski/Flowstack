import { useEffect } from 'react';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | AgentHub';
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          Last updated: March 15, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">1. Introduction</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            AgentHub ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">2. Data We Collect</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            We collect several different types of information for various purposes:
          </p>
          <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 mb-4">
            <li>Personal identification information (Name, email address, etc.)</li>
            <li>Usage data (How you interact with our services)</li>
            <li>Technical data (IP address, browser type, device information)</li>
            <li>Payment information (processed securely through our payment providers)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">3. How We Use Your Data</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            We use your data to:
          </p>
          <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 mb-4">
            <li>Provide and maintain our service</li>
            <li>Notify you about changes to our service</li>
            <li>Provide customer support</li>
            <li>Monitor the usage of our service</li>
            <li>Detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">4. Data Security</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            The security of your data is important to us. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">5. Your Rights</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
          </p>
          <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 mb-4">
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">6. Contact Us</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400">
            <li>Email: privacy@agenthub.ai</li>
            <li>Address: 123 AI Street, Tech City, TC 12345</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
import { useEffect } from 'react';

export default function CookiesPage() {
  useEffect(() => {
    document.title = 'Cookie Policy | AgentHub';
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-8">Cookie Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-surface-600 dark:text-surface-400 mb-6">
          Last updated: March 15, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">1. What Are Cookies</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and more useful to you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">2. How We Use Cookies</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400 mb-4">
            <li>Essential cookies: Required for the operation of our website</li>
            <li>Analytical cookies: Allow us to analyze your use of the site</li>
            <li>Functionality cookies: Remember your preferences</li>
            <li>Advertising cookies: Deliver relevant advertisements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">3. Types of Cookies We Use</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-surface-900 dark:text-white mb-2">Essential Cookies</h3>
              <p className="text-surface-600 dark:text-surface-400">
                These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-surface-900 dark:text-white mb-2">Performance Cookies</h3>
              <p className="text-surface-600 dark:text-surface-400">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-surface-900 dark:text-white mb-2">Functional Cookies</h3>
              <p className="text-surface-600 dark:text-surface-400">
                These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-surface-900 dark:text-white mb-2">Targeting Cookies</h3>
              <p className="text-surface-600 dark:text-surface-400">
                These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">4. Your Choices Regarding Cookies</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            If you prefer to avoid the use of cookies on the website, first you must disable the use of cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option for preventing the use of cookies at any time.
          </p>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            If you do not accept our cookies, you may experience some inconvenience in your use of the website and some features may not function properly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">5. How to Delete Cookies</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            You can delete cookies already stored on your computer:
          </p>
          <ul className="list-disc pl-6 text-surface-600 dark:text-surface-400">
            <li>Chrome: Settings → Privacy and security → Clear browsing data</li>
            <li>Firefox: Options → Privacy & Security → Clear Data</li>
            <li>Safari: Preferences → Privacy → Manage Website Data</li>
            <li>Edge: Settings → Privacy & services → Clear browsing data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">6. Contact Us</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            If you have any questions about our use of cookies, please contact us at:
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
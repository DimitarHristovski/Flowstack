import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { LinkButton } from '../ui/Button';

export default function PricingSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="pricing" className="py-20 bg-surface-50 dark:bg-surface-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4"
          >
            Custom AI Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
          >
            Get in touch to discuss your specific AI agent needs and requirements.
          </motion.p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-surface-900 dark:text-white mb-4">
                Enterprise Solutions
              </h3>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                Custom AI agents tailored to your business needs
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-surface-700 dark:text-surface-300">
                    Custom agent development
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-surface-700 dark:text-surface-300">
                    Dedicated support
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-surface-700 dark:text-surface-300">
                    Integration assistance
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-surface-700 dark:text-surface-300">
                    Custom training and onboarding
                  </span>
                </li>
              </ul>
              
              <LinkButton
                to="/contact"
                variant="primary"
                isFullWidth
              >
                Contact Us
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
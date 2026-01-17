import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, Settings, ChevronRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      className="bg-white dark:bg-surface-800 rounded-xl shadow-md dark:shadow-none dark:border dark:border-surface-700 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5 dark:hover:shadow-none dark:hover:border-primary-500/30"
    >
      <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3 w-12 h-12 flex items-center justify-center text-primary-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-surface-900 dark:text-white">{title}</h3>
      <p className="text-surface-600 dark:text-surface-400">{description}</p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Zap size={24} />,
      titleKey: 'landing.features.item1.title',
      descriptionKey: 'landing.features.item1.description',
    },
    {
      icon: <Settings size={24} />,
      titleKey: 'landing.features.item2.title',
      descriptionKey: 'landing.features.item2.description',
    },
    {
      icon: <Shield size={24} />,
      titleKey: 'landing.features.item3.title',
      descriptionKey: 'landing.features.item3.description',
    },
    {
      icon: <BarChart3 size={24} />,
      titleKey: 'landing.features.item4.title',
      descriptionKey: 'landing.features.item4.description',
    },
  ];

  return (
    <section id="features" className="py-20 bg-surface-50 dark:bg-surface-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-4"
          >
            {t('landing.features.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
          >
            {t('landing.features.subtitle')}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={t(feature.titleKey)}
              description={t(feature.descriptionKey)}
              index={index}
            />
          ))}
        </div>
        
        {/* Additional CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
            <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-2xl mx-auto">
              Join thousands of teams already using FlowStack to automate their workflows and boost productivity.
            </p>
            <a
              href="/marketplace"
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Browse Agents
              <ChevronRight className="ml-2" size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
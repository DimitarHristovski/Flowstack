import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { LinkButton } from '../ui/Button';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  isFeatured?: boolean;
  index: number;
}

function PricingCard({
  title,
  price,
  period,
  description,
  features,
  ctaText,
  ctaLink,
  isFeatured = false,
  index,
}: PricingCardProps) {
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
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isFeatured
          ? 'border-2 border-primary-500 shadow-xl shadow-primary-500/10 dark:shadow-none transform hover:-translate-y-1'
          : 'border border-surface-200 dark:border-surface-700 shadow-md dark:shadow-none hover:shadow-lg'
      }`}
    >
      {isFeatured && (
        <div className="bg-primary-500 text-white text-center py-2 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="bg-white dark:bg-surface-800 p-6 sm:p-8">
        <h3 className="text-xl font-semibold mb-2 text-surface-900 dark:text-white">{title}</h3>
        <p className="text-surface-600 dark:text-surface-400 mb-4">{description}</p>
        
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-surface-900 dark:text-white">{price}</span>
          <span className="text-surface-500 dark:text-surface-400 ml-2">{period}</span>
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <CheckCircle size={18} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-surface-700 dark:text-surface-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <LinkButton
          to={ctaLink}
          variant={isFeatured ? 'primary' : 'outline'}
          isFullWidth
          className={isFeatured ? '' : 'text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-900'}
        >
          {ctaText}
        </LinkButton>
      </div>
    </motion.div>
  );
}

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
            {t('landing.pricing.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
          >
            {t('landing.pricing.subtitle')}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PricingCard
            title={t('landing.pricing.free.title')}
            price={t('landing.pricing.free.price')}
            period={t('landing.pricing.free.period')}
            description={t('landing.pricing.free.description')}
            features={[
              t('landing.pricing.free.feature1'),
              t('landing.pricing.free.feature2'),
              t('landing.pricing.free.feature3'),
              t('landing.pricing.free.feature4'),
            ]}
            ctaText={t('landing.pricing.free.cta')}
            ctaLink="/signup"
            index={0}
          />
          
          <PricingCard
            title={t('landing.pricing.pro.title')}
            price={t('landing.pricing.pro.price')}
            period={t('landing.pricing.pro.period')}
            description={t('landing.pricing.pro.description')}
            features={[
              t('landing.pricing.pro.feature1'),
              t('landing.pricing.pro.feature2'),
              t('landing.pricing.pro.feature3'),
              t('landing.pricing.pro.feature4'),
            ]}
            ctaText={t('landing.pricing.pro.cta')}
            ctaLink="/signup?plan=pro"
            isFeatured
            index={1}
          />
          
          <PricingCard
            title={t('landing.pricing.enterprise.title')}
            price={t('landing.pricing.enterprise.price')}
            period={t('landing.pricing.enterprise.period')}
            description={t('landing.pricing.enterprise.description')}
            features={[
              t('landing.pricing.enterprise.feature1'),
              t('landing.pricing.enterprise.feature2'),
              t('landing.pricing.enterprise.feature3'),
              t('landing.pricing.enterprise.feature4'),
            ]}
            ctaText={t('landing.pricing.enterprise.cta')}
            ctaLink="/contact"
            index={2}
          />
        </div>
      </div>
    </section>
  );
}
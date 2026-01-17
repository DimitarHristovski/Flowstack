import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Zap, Crown } from 'lucide-react';
import { LinkButton } from '../ui/Button';
import { useCreditsStore } from '../../lib/store';
import { toast } from 'sonner';

interface PricingPlan {
  id: 'free' | 'pro' | 'enterprise';
  name: string;
  price: number | string;
  period: string;
  credits: number;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  buttonText: string;
  buttonLink: string;
}

export default function PricingSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { updateSubscription } = useCreditsStore();

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      credits: 100,
      description: 'Perfect for getting started',
      features: [
        'Access to all agents',
        '100 executions per month',
        'Community support',
        'Basic analytics',
      ],
      icon: <Sparkles className="w-6 h-6" />,
      buttonText: 'Get Started',
      buttonLink: '/marketplace',
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$29',
      period: '/month',
      credits: 1000,
      description: 'For professionals and small teams',
      features: [
        'Access to all agents',
        '1,000 executions per month',
        'Priority support',
        'Advanced analytics',
        'API access',
        'Custom integrations',
      ],
      popular: true,
      icon: <Zap className="w-6 h-6" />,
      buttonText: 'Start Free Trial',
      buttonLink: '/contact',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      credits: 10000,
      description: 'For large organizations',
      features: [
        'Access to all agents',
        'Unlimited executions',
        'Dedicated support',
        'Custom agent development',
        'SLA guarantees',
        'On-premise deployment',
        'White-label options',
      ],
      icon: <Crown className="w-6 h-6" />,
      buttonText: 'Contact Sales',
      buttonLink: '/contact',
    },
  ];

  const handleSubscribe = async (planId: 'free' | 'pro' | 'enterprise') => {
    if (planId === 'enterprise') {
      return; // Enterprise goes to contact page
    }
    try {
      await updateSubscription(planId);
      toast.success(`Successfully subscribed to ${planId} plan!`);
    } catch (error) {
      toast.error('Failed to update subscription');
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-surface-50 to-white dark:from-surface-900 dark:to-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto"
          >
            Choose a plan that fits your needs. All plans include monthly credits to use agents.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.2 }}
              className={`relative bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-lg border-2 transition-all ${
                plan.popular
                  ? 'border-primary-500 dark:border-primary-500 scale-105 shadow-xl'
                  : 'border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg text-primary-500 mr-3">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{plan.name}</h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400">{plan.description}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-surface-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-surface-600 dark:text-surface-400 ml-2">{plan.period}</span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-primary-600 dark:text-primary-400 font-semibold">
                    <Zap className="w-4 h-4 mr-1" />
                    {plan.id === 'enterprise' ? 'Unlimited' : `${plan.credits.toLocaleString()} executions`}/month
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle size={18} className="text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-surface-700 dark:text-surface-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <LinkButton
                  to={plan.buttonLink}
                  variant={plan.popular ? 'primary' : 'outline'}
                  isFullWidth
                  onClick={() => handleSubscribe(plan.id)}
                  className={plan.popular ? 'bg-primary-500 hover:bg-primary-600' : ''}
                >
                  {plan.buttonText}
                </LinkButton>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Credits info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
            <div className="flex items-start">
              <Sparkles className="w-6 h-6 text-primary-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                  All Agents Included
                </h4>
                <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">
                  Your subscription gives you access to all agents in our marketplace. No per-agent fees, 
                  no hidden costs. Simply subscribe and use any agent you need.
                </p>
                <div className="text-sm text-surface-600 dark:text-surface-400">
                  <strong>Note:</strong> Executions are counted per agent use, but all agents are available with your subscription.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8 text-surface-500 dark:text-surface-400 text-sm"
        >
          All plans include 14-day free trial • Cancel anytime • Credits roll over up to 2x your monthly limit
        </motion.p>
      </div>
    </section>
  );
}

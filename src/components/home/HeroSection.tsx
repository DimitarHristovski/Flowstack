import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight, Bot } from 'lucide-react';
import { LinkButton } from '../ui/Button';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-surface-900 dark:bg-surface-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-secondary-500/20" />
      
      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center mb-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90">
            <Bot size={16} className="mr-2 text-primary-400" />
            <span className="text-sm font-medium">Next-generation AI Agents</span>
          </div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('landing.hero.title')}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-surface-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('landing.hero.subtitle')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <LinkButton
              to="/marketplace"
              size="lg"
              rightIcon={<ChevronRight size={18} />}
              className="group"
            >
              {t('landing.hero.cta.explore')}
            </LinkButton>
            
            <LinkButton
              to="/signup"
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              {t('landing.hero.cta.try')}
            </LinkButton>
          </motion.div>
        </motion.div>
        
        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="bg-surface-950/40 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
              alt="AI Agents Dashboard" 
              className="w-full h-auto rounded-xl opacity-90"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl z-0" />
        </motion.div>
      </div>
    </div>
  );
}
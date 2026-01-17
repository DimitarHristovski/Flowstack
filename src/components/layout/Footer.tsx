import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Bot } from 'lucide-react';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-surface-900 text-white">
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Bot className="w-8 h-8 text-primary-400 mr-2" />
              <h2 className="text-2xl font-bold">{t('app.name')}</h2>
            </div>
            <p className="text-surface-300 mb-6 max-w-md leading-relaxed">
              {t('app.tagline')}
            </p>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-surface-400 hover:text-primary-400 transition-colors p-2 rounded-full hover:bg-surface-800" 
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-surface-400 hover:text-primary-400 transition-colors p-2 rounded-full hover:bg-surface-800" 
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-surface-400 hover:text-primary-400 transition-colors p-2 rounded-full hover:bg-surface-800" 
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-surface-400 hover:text-primary-400 transition-colors p-2 rounded-full hover:bg-surface-800" 
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
            {/* Contact info */}
            <div className="space-y-2 text-sm text-surface-400">
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-primary-400" />
                <a href="mailto:contact@flowstack.ai" className="hover:text-white transition-colors">
                  contact@flowstack.ai
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-primary-400" />
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
          
          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              {t('footer.product')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/marketplace" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  {t('nav.marketplace')}
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              {t('footer.company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Partner Program
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              {t('footer.support')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Status Page
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/licenses" className="text-surface-300 hover:text-primary-400 transition-colors inline-block">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-surface-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <p className="text-surface-400 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex gap-4 text-sm text-surface-400">
                <span>Made with ❤️ for AI automation</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Globe size={16} className="text-surface-400" />
                <span className="text-surface-400 text-sm">{t('footer.language')}:</span>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`text-sm px-2 py-1 rounded ${i18n.language === 'en' ? 'text-primary-400 bg-primary-400/10' : 'text-surface-300 hover:text-white'} transition-colors`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('de')}
                  className={`text-sm px-2 py-1 rounded ${i18n.language === 'de' ? 'text-primary-400 bg-primary-400/10' : 'text-surface-300 hover:text-white'} transition-colors`}
                >
                  DE
                </button>
                <button
                  onClick={() => changeLanguage('mk')}
                  className={`text-sm px-2 py-1 rounded ${i18n.language === 'mk' ? 'text-primary-400 bg-primary-400/10' : 'text-surface-300 hover:text-white'} transition-colors`}
                >
                  MK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
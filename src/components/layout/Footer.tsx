import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <footer className="bg-surface-900 text-white">
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">{t('app.name')}</h2>
            <p className="text-surface-300 mb-4 max-w-md">
              {t('app.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-surface-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-surface-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-surface-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-surface-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t('footer.product')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/marketplace" className="text-surface-300 hover:text-white transition-colors">
                  {t('nav.marketplace')}
                </Link>
              </li>
              <li>
                <Link to="/#features" className="text-surface-300 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-surface-300 hover:text-white transition-colors">
                  {t('nav.pricing')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-surface-300 hover:text-white transition-colors">
                  {t('nav.dashboard')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t('footer.company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-surface-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-surface-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-surface-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-surface-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-surface-300 hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-surface-300 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-surface-300 hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/licenses" className="text-surface-300 hover:text-white transition-colors">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-surface-700 flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-surface-400 text-sm">
            {t('footer.copyright')}
          </p>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Globe size={16} className="text-surface-400" />
              <span className="text-surface-400 text-sm">{t('footer.language')}:</span>
              <button
                onClick={() => changeLanguage('en')}
                className={`text-sm ${i18n.language === 'en' ? 'text-primary-400' : 'text-surface-300 hover:text-white'} transition-colors`}
              >
                EN
              </button>
              <span className="text-surface-600">|</span>
              <button
                onClick={() => changeLanguage('de')}
                className={`text-sm ${i18n.language === 'de' ? 'text-primary-400' : 'text-surface-300 hover:text-white'} transition-colors`}
              >
                DE
              </button>
              <span className="text-surface-600">|</span>
              <button
                onClick={() => changeLanguage('mk')}
                className={`text-sm ${i18n.language === 'mk' ? 'text-primary-400' : 'text-surface-300 hover:text-white'} transition-colors`}
              >
                MK
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
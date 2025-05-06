import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon, Computer, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // Check if the navbar should be transparent
  const isHome = location.pathname === '/';
  const shouldBeTransparent = isHome && !isScrolled;

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
  };

  const navClasses = cn(
    'fixed w-full z-50 transition-all duration-300',
    shouldBeTransparent 
      ? 'bg-transparent text-white' 
      : 'bg-white/80 dark:bg-surface-900/80 text-surface-900 dark:text-white backdrop-blur-md shadow-sm'
  );

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">{t('app.name')}</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) => cn(
                'transition-colors hover:text-primary-500',
                isActive ? 'text-primary-500 font-medium' : ''
              )}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/marketplace"
              className={({ isActive }) => cn(
                'transition-colors hover:text-primary-500',
                isActive ? 'text-primary-500 font-medium' : ''
              )}
            >
              {t('nav.marketplace')}
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => cn(
                'transition-colors hover:text-primary-500',
                isActive ? 'text-primary-500 font-medium' : ''
              )}
            >
              {t('nav.dashboard')}
            </NavLink>
            
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-1 hover:text-primary-500 transition-colors"
              >
                <Globe size={18} />
                <span>{i18n.language.toUpperCase()}</span>
                <ChevronDown size={16} />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-surface-800 rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={cn(
                      'block px-4 py-2 text-sm w-full text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors',
                      i18n.language === 'en' ? 'text-primary-500 font-medium' : 'text-surface-900 dark:text-white'
                    )}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('de')}
                    className={cn(
                      'block px-4 py-2 text-sm w-full text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors',
                      i18n.language === 'de' ? 'text-primary-500 font-medium' : 'text-surface-900 dark:text-white'
                    )}
                  >
                    Deutsch
                  </button>
                  <button
                    onClick={() => changeLanguage('mk')}
                    className={cn(
                      'block px-4 py-2 text-sm w-full text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors',
                      i18n.language === 'mk' ? 'text-primary-500 font-medium' : 'text-surface-900 dark:text-white'
                    )}
                  >
                    Македонски
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' && <Sun size={20} />}
                {theme === 'dark' && <Moon size={20} />}
                {theme === 'system' && <Computer size={20} />}
              </button>
              
              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-surface-800 rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => {
                      setTheme('light');
                      setIsThemeMenuOpen(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-surface-900 dark:text-white"
                  >
                    <Sun size={16} className="mr-2" />
                    Light
                  </button>
                  <button
                    onClick={() => {
                      setTheme('dark');
                      setIsThemeMenuOpen(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-surface-900 dark:text-white"
                  >
                    <Moon size={16} className="mr-2" />
                    Dark
                  </button>
                  <button
                    onClick={() => {
                      setTheme('system');
                      setIsThemeMenuOpen(false);
                    }}
                    className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors text-surface-900 dark:text-white"
                  >
                    <Computer size={16} className="mr-2" />
                    System
                  </button>
                </div>
              )}
            </div>
            
            <Link
              to="/login"
              className="text-surface-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {t('nav.login')}
            </Link>
            <Link
              to="/signup"
              className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              {t('nav.signup')}
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-surface-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) => cn(
                'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                isActive 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' 
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white'
              )}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/marketplace"
              className={({ isActive }) => cn(
                'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                isActive 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' 
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white'
              )}
            >
              {t('nav.marketplace')}
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => cn(
                'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                isActive 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' 
                  : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white'
              )}
            >
              {t('nav.dashboard')}
            </NavLink>
            
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4 pb-3">
              <div className="px-3 space-y-1">
                <button
                  onClick={() => changeLanguage('en')}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors',
                    i18n.language === 'en' 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' 
                      : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white'
                  )}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('de')}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors',
                    i18n.language === 'de' 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' 
                      : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white'
                  )}
                >
                  Deutsch
                </button>
                <button
                  onClick={() => changeLanguage('mk')}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors',
                    i18n.language === 'mk' 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' 
                      : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white'
                  )}
                >
                  Македонски
                </button>
              </div>
            </div>
            
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4 pb-3">
              <div className="flex items-center px-3">
                <button
                  onClick={() => setTheme('light')}
                  className={cn(
                    'flex-1 flex justify-center items-center p-3 rounded-md transition-colors',
                    theme === 'light' 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' 
                      : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white'
                  )}
                >
                  <Sun size={18} />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'flex-1 flex justify-center items-center p-3 rounded-md transition-colors',
                    theme === 'dark' 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' 
                      : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white'
                  )}
                >
                  <Moon size={18} />
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={cn(
                    'flex-1 flex justify-center items-center p-3 rounded-md transition-colors',
                    theme === 'system' 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-500' 
                      : 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-900 dark:text-white'
                  )}
                >
                  <Computer size={18} />
                </button>
              </div>
            </div>
            
            <div className="border-t border-surface-200 dark:border-surface-700 pt-4 pb-3">
              <div className="px-3 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-surface-900 dark:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-500 hover:bg-primary-600 text-white transition-colors"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
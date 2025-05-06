import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal, Star, X, ChevronDown, ArrowUpDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

type AgentCategory = 'all' | 'productivity' | 'creativity' | 'research' | 'communication' | 'finance' | 'coding';
type PriceRange = 'all' | 'free' | 'paid' | 'subscription';
type RatingFilter = 'all' | '4plus' | '3plus';
type SortOption = 'popular' | 'newest' | 'priceLowHigh' | 'priceHighLow';

interface Agent {
  id: string;
  name: string;
  description: string;
  price: number | 'free' | 'subscription';
  subscriptionPrice?: number;
  category: AgentCategory;
  rating: number;
  reviewCount: number;
  image: string;
  featured?: boolean;
  languages: string[];
  tags: string[];
}

export default function MarketplacePage() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AgentCategory>('all');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const mockAgents: Agent[] = [
    {
      id: '1',
      name: 'Content Writer Pro',
      description: 'AI-powered content writer that creates blog posts, articles, and social media content.',
      price: 29,
      category: 'creativity',
      rating: 4.7,
      reviewCount: 128,
      image: 'https://images.pexels.com/photos/6956503/pexels-photo-6956503.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      languages: ['en', 'de', 'mk'],
      tags: ['Writing', 'Content', 'Blogging'],
    },
    {
      id: '2',
      name: 'Research Assistant',
      description: 'Collects and analyzes data from various sources to help with your research projects.',
      price: 49,
      category: 'research',
      rating: 4.5,
      reviewCount: 72,
      image: 'https://images.pexels.com/photos/8438951/pexels-photo-8438951.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      languages: ['en'],
      tags: ['Research', 'Analysis', 'Academic'],
    },
    {
      id: '3',
      name: 'Email Manager',
      description: 'Organizes and prioritizes your emails, drafts responses, and helps maintain inbox zero.',
      price: 'subscription',
      subscriptionPrice: 9.99,
      category: 'productivity',
      rating: 4.2,
      reviewCount: 214,
      image: 'https://images.pexels.com/photos/8438952/pexels-photo-8438952.jpeg?auto=compress&cs=tinysrgb&w=600',
      languages: ['en', 'de'],
      tags: ['Email', 'Organization', 'Productivity'],
    },
    {
      id: '4',
      name: 'Code Assistant',
      description: 'Helps you write, review, and optimize code across multiple programming languages.',
      price: 79,
      category: 'coding',
      rating: 4.8,
      reviewCount: 156,
      image: 'https://images.pexels.com/photos/6956579/pexels-photo-6956579.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      languages: ['en'],
      tags: ['Coding', 'Programming', 'Development'],
    },
    {
      id: '5',
      name: 'Social Media Manager',
      description: 'Creates and schedules social media posts, analyzes engagement, and suggests improvements.',
      price: 39,
      category: 'communication',
      rating: 4.4,
      reviewCount: 98,
      image: 'https://images.pexels.com/photos/6962024/pexels-photo-6962024.jpeg?auto=compress&cs=tinysrgb&w=600',
      languages: ['en', 'de', 'mk'],
      tags: ['Social Media', 'Marketing', 'Content'],
    },
    {
      id: '6',
      name: 'Personal Finance Advisor',
      description: 'Analyzes your spending habits, creates budgets, and offers personalized financial advice.',
      price: 'subscription',
      subscriptionPrice: 14.99,
      category: 'finance',
      rating: 4.6,
      reviewCount: 182,
      image: 'https://images.pexels.com/photos/7947452/pexels-photo-7947452.jpeg?auto=compress&cs=tinysrgb&w=600',
      languages: ['en'],
      tags: ['Finance', 'Budgeting', 'Planning'],
    },
    {
      id: '7',
      name: 'Task Organizer',
      description: 'Helps you manage tasks, set priorities, and meet deadlines.',
      price: 'free',
      category: 'productivity',
      rating: 4.0,
      reviewCount: 245,
      image: 'https://images.pexels.com/photos/6956579/pexels-photo-6956579.jpeg?auto=compress&cs=tinysrgb&w=600',
      languages: ['en', 'de', 'mk'],
      tags: ['Tasks', 'Organization', 'Productivity'],
    },
    {
      id: '8',
      name: 'Meeting Summarizer',
      description: 'Records and transcribes meetings, creates summaries, and extracts action items.',
      price: 29,
      category: 'productivity',
      rating: 4.3,
      reviewCount: 67,
      image: 'https://images.pexels.com/photos/6956509/pexels-photo-6956509.jpeg?auto=compress&cs=tinysrgb&w=600',
      languages: ['en'],
      tags: ['Meetings', 'Notes', 'Transcription'],
    },
  ];
  
  // Filter and sort agents
  const filteredAgents = mockAgents.filter((agent) => {
    // Filter by search query
    if (
      searchQuery &&
      !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by category
    if (selectedCategory !== 'all' && agent.category !== selectedCategory) {
      return false;
    }
    
    // Filter by price range
    if (priceRange === 'free' && agent.price !== 'free') {
      return false;
    } else if (priceRange === 'paid' && (agent.price === 'free' || agent.price === 'subscription')) {
      return false;
    } else if (priceRange === 'subscription' && agent.price !== 'subscription') {
      return false;
    }
    
    // Filter by rating
    if (ratingFilter === '4plus' && agent.rating < 4) {
      return false;
    } else if (ratingFilter === '3plus' && agent.rating < 3) {
      return false;
    }
    
    // Filter by language
    if (!agent.languages.includes(i18n.language)) {
      return false;
    }
    
    return true;
  });
  
  // Sort agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      case 'priceLowHigh':
        if (a.price === 'free') return -1;
        if (b.price === 'free') return 1;
        if (a.price === 'subscription' && b.price === 'subscription') {
          return (a.subscriptionPrice || 0) - (b.subscriptionPrice || 0);
        }
        if (a.price === 'subscription') return 1;
        if (b.price === 'subscription') return -1;
        return (a.price as number) - (b.price as number);
      case 'priceHighLow':
        if (a.price === 'free') return 1;
        if (b.price === 'free') return -1;
        if (a.price === 'subscription' && b.price === 'subscription') {
          return (b.subscriptionPrice || 0) - (a.subscriptionPrice || 0);
        }
        if (a.price === 'subscription') return -1;
        if (b.price === 'subscription') return 1;
        return (b.price as number) - (a.price as number);
      case 'popular':
      default:
        return b.rating * b.reviewCount - a.rating * a.reviewCount;
    }
  });
  
  // Featured agents
  const featuredAgents = mockAgents.filter((agent) => agent.featured);

  // Update page title
  useEffect(() => {
    document.title = `${t('marketplace.title')} | AgentHub`;
  }, [t]);

  return (
    <div className="bg-surface-50 dark:bg-surface-900 min-h-screen pt-20">
      {/* Marketplace header */}
      <div className="bg-primary-600/10 dark:bg-primary-900/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-2">{t('marketplace.title')}</h1>
              <p className="text-surface-600 dark:text-surface-400">{t('marketplace.subtitle')}</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="relative mr-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
                <input
                  type="text"
                  placeholder={t('marketplace.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-80"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <Button
                variant="outline"
                leftIcon={<SlidersHorizontal size={18} />}
                className="md:hidden"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                Filter
              </Button>
            </div>
          </div>
          
          {/* Featured agents carousel */}
          {featuredAgents.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">{t('marketplace.featured.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredAgents.slice(0, 3).map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-white dark:bg-surface-800 rounded-lg shadow-md overflow-hidden border border-surface-200 dark:border-surface-700 transition-all hover:shadow-lg dark:hover:border-surface-600"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{agent.name}</h3>
                      <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">{agent.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="text-warning-500 fill-warning-500" size={16} />
                          <span className="text-surface-900 dark:text-white ml-1">{agent.rating.toFixed(1)}</span>
                          <span className="text-surface-500 text-xs ml-1">({agent.reviewCount})</span>
                        </div>
                        <div>
                          {agent.price === 'free' ? (
                            <span className="text-success-600 dark:text-success-400 font-medium">Free</span>
                          ) : agent.price === 'subscription' ? (
                            <span className="text-primary-600 dark:text-primary-400 font-medium">${agent.subscriptionPrice}/mo</span>
                          ) : (
                            <span className="text-surface-900 dark:text-white font-medium">${agent.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters (desktop) */}
          <div className="hidden md:block w-64 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">{t('marketplace.filter.title')}</h3>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">{t('marketplace.filter.categories')}</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">All Categories</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'productivity'}
                      onChange={() => setSelectedCategory('productivity')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">Productivity</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'creativity'}
                      onChange={() => setSelectedCategory('creativity')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">Creativity</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'research'}
                      onChange={() => setSelectedCategory('research')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">Research</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'communication'}
                      onChange={() => setSelectedCategory('communication')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">Communication</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'finance'}
                      onChange={() => setSelectedCategory('finance')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">Finance</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'coding'}
                      onChange={() => setSelectedCategory('coding')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">Coding</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">{t('marketplace.filter.price')}</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'all'}
                      onChange={() => setPriceRange('all')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">All Prices</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'free'}
                      onChange={() => setPriceRange('free')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">Free</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'paid'}
                      onChange={() => setPriceRange('paid')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">One-time Payment</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === 'subscription'}
                      onChange={() => setPriceRange('subscription')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">Subscription</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">{t('marketplace.filter.rating')}</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingFilter === 'all'}
                      onChange={() => setRatingFilter('all')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">All Ratings</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingFilter === '4plus'}
                      onChange={() => setRatingFilter('4plus')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">4+ Stars</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={ratingFilter === '3plus'}
                      onChange={() => setRatingFilter('3plus')}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-surface-700 dark:text-surface-300">3+ Stars</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                    setRatingFilter('all');
                    setSearchQuery('');
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile filter drawer */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-50 flex md:hidden">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="ml-auto w-full max-w-xs bg-white dark:bg-surface-800 h-full overflow-y-auto"
              >
                <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-surface-900 dark:text-white">{t('marketplace.filter.title')}</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-4 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      {t('marketplace.filter.categories')}
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === 'all'}
                          onChange={() => setSelectedCategory('all')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">All Categories</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === 'productivity'}
                          onChange={() => setSelectedCategory('productivity')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Productivity</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === 'creativity'}
                          onChange={() => setSelectedCategory('creativity')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Creativity</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === 'research'}
                          onChange={() => setSelectedCategory('research')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Research</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === 'communication'}
                          onChange={() => setSelectedCategory('communication')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Communication</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === 'finance'}
                          onChange={() => setSelectedCategory('finance')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Finance</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === 'coding'}
                          onChange={() => setSelectedCategory('coding')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Coding</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">{t('marketplace.filter.price')}</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="price-mobile"
                          checked={priceRange === 'all'}
                          onChange={() => setPriceRange('all')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">All Prices</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="price-mobile"
                          checked={priceRange === 'free'}
                          onChange={() => setPriceRange('free')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Free</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="price-mobile"
                          checked={priceRange === 'paid'}
                          onChange={() => setPriceRange('paid')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">One-time Payment</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="price-mobile"
                          checked={priceRange === 'subscription'}
                          onChange={() => setPriceRange('subscription')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">Subscription</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">{t('marketplace.filter.rating')}</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="rating-mobile"
                          checked={ratingFilter === 'all'}
                          onChange={() => setRatingFilter('all')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">All Ratings</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="rating-mobile"
                          checked={ratingFilter === '4plus'}
                          onChange={() => setRatingFilter('4plus')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">4+ Stars</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="rating-mobile"
                          checked={ratingFilter === '3plus'}
                          onChange={() => setRatingFilter('3plus')}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-surface-700 dark:text-surface-300">3+ Stars</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-surface-200 dark:border-surface-700 space-y-3">
                  <Button
                    variant="primary"
                    isFullWidth
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    isFullWidth
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange('all');
                      setRatingFilter('all');
                      setSearchQuery('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Agents grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                Showing {sortedAgents.length} results
              </p>
              
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-800 rounded-md border border-surface-300 dark:border-surface-600 px-3 py-1.5 text-sm font-medium transition-colors hover:border-surface-400 dark:hover:border-surface-500"
                >
                  <span className="mr-1">Sort by:</span>
                  <span className="font-semibold mr-1">
                    {sortOption === 'popular' && 'Popular'}
                    {sortOption === 'newest' && 'Newest'}
                    {sortOption === 'priceLowHigh' && 'Price: Low to High'}
                    {sortOption === 'priceHighLow' && 'Price: High to Low'}
                  </span>
                  <ChevronDown size={16} />
                </button>
                
                {isFilterOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-surface-800 rounded-md shadow-lg border border-surface-300 dark:border-surface-600 z-10">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setSortOption('popular');
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors",
                          sortOption === 'popular'
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                            : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                        )}
                      >
                        <div className="flex items-center">
                          <ArrowUpDown size={14} className="mr-2" />
                          Popular
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setSortOption('newest');
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors",
                          sortOption === 'newest'
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                            : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                        )}
                      >
                        <div className="flex items-center">
                          <ArrowUpDown size={14} className="mr-2" />
                          Newest
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setSortOption('priceLowHigh');
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors",
                          sortOption === 'priceLowHigh'
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                            : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                        )}
                      >
                        <div className="flex items-center">
                          <ArrowUpDown size={14} className="mr-2" />
                          Price: Low to High
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setSortOption('priceHighLow');
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors",
                          sortOption === 'priceHighLow'
                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                            : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                        )}
                      >
                        <div className="flex items-center">
                          <ArrowUpDown size={14} className="mr-2" />
                          Price: High to Low
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {sortedAgents.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-surface-800 rounded-lg border border-dashed border-surface-300 dark:border-surface-700">
                <p className="text-surface-600 dark:text-surface-400 mb-4">No agents found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange('all');
                    setRatingFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedAgents.map((agent) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-surface-800 rounded-lg overflow-hidden shadow-md border border-surface-200 dark:border-surface-700 hover:shadow-lg hover:border-surface-300 dark:hover:border-surface-600 transition-all"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      {agent.featured && (
                        <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{agent.name}</h3>
                        <div>
                          {agent.price === 'free' ? (
                            <span className="text-xs bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400 font-medium px-2 py-1 rounded-full">Free</span>
                          ) : agent.price === 'subscription' ? (
                            <span className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-medium px-2 py-1 rounded-full">Subscription</span>
                          ) : (
                            <span className="text-xs bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 font-medium px-2 py-1 rounded-full">One-time</span>
                          )}
                        </div>
                      </div>
                      <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">{agent.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {agent.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="text-warning-500 fill-warning-500" size={16} />
                          <span className="text-surface-900 dark:text-white ml-1">{agent.rating.toFixed(1)}</span>
                          <span className="text-surface-500 text-xs ml-1">({agent.reviewCount})</span>
                        </div>
                        <div>
                          {agent.price === 'free' ? (
                            <span className="text-success-600 dark:text-success-400 font-medium">Free</span>
                          ) : agent.price === 'subscription' ? (
                            <span className="text-primary-600 dark:text-primary-400 font-medium">${agent.subscriptionPrice}/mo</span>
                          ) : (
                            <span className="text-surface-900 dark:text-white font-medium">${agent.price}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {agent.price === 'free' ? (
                          <Button isFullWidth>{t('marketplace.agent.buyNow')}</Button>
                        ) : agent.price === 'subscription' ? (
                          <Button isFullWidth>{t('marketplace.agent.subscribe')}</Button>
                        ) : (
                          <Button isFullWidth>{t('marketplace.agent.buyNow')}</Button>
                        )}
                        <Button variant="outline" isFullWidth>{t('marketplace.agent.preview')}</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
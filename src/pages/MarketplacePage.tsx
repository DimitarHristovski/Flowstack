import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bot, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';
import { useAgentStore } from '../lib/store';

type AgentCategory = 'all' | 'productivity' | 'creativity' | 'research' | 'communication' | 'finance' | 'coding';
type SortOption = 'newest' | 'priceLowHigh' | 'priceHighLow';

export default function MarketplacePage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AgentCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { agents, loading, fetchAgents } = useAgentStore();

  // Fetch agents on mount
  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  // Filter agents - only show active agents
  const filteredAgents = agents.filter((agent) => {
    // Only show active agents
    if (agent.status !== 'active') {
      return false;
    }

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
    
    return true;
  });

  // Sort agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'priceLowHigh':
        return (a.price || 0) - (b.price || 0);
      case 'priceHighLow':
        return (b.price || 0) - (a.price || 0);
      default:
        return 0;
    }
  });

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
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-4">
              <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-md transition-colors',
                    selectedCategory === 'all'
                      ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                  )}
                >
                  All Categories
                </button>
                {['productivity', 'creativity', 'research', 'communication', 'finance', 'coding'].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category as AgentCategory)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md transition-colors capitalize',
                      selectedCategory === category
                        ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                        : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
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
                        Newest
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
                        Price: Low to High
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
                        Price: High to Low
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <Bot size={32} className="animate-spin mx-auto text-primary-500 mb-4" />
                <p className="text-surface-600 dark:text-surface-400">Loading agents...</p>
              </div>
            ) : sortedAgents.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-surface-800 rounded-lg border border-dashed border-surface-300 dark:border-surface-700">
                <Bot size={48} className="mx-auto text-surface-400 mb-4" />
                <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No agents found</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-6">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Try adjusting your filters to find what you\'re looking for.'
                    : 'No agents are currently available.'}
                </p>
                {(searchQuery || selectedCategory !== 'all') && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
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
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{agent.name}</h3>
                        <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                          ${agent.price || 0}
                        </span>
                      </div>
                      <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">{agent.description}</p>
                      
                      <div className="mt-4">
                        <Button isFullWidth>
                          Purchase Agent
                        </Button>
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
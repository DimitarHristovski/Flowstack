import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bot, ChevronDown, X, Sparkles, Filter, Grid, List, Star, Zap, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';
import { useAgentStore } from '../lib/store';
import { AGENT_CATEGORIES, AgentCategory, formatCategoryName } from '../lib/categories';
import { toast } from 'sonner';

type SortOption = 'newest' | 'name';
type ViewMode = 'grid' | 'list';

export default function MarketplacePage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AgentCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchResults, setResearchResults] = useState<any | null>(null);

  const { agents, loading, fetchAgents } = useAgentStore();
  
  // Set page title
  useEffect(() => {
    document.title = "Available Agents | FlowStack";
  }, []);
  
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
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      default:
        return 0;
    }
  });

  const handleExecuteAgent = async (agent: any) => {
    // Open the research dashboard modal
    setSelectedAgent(agent);
    setIsAgentModalOpen(true);
  };

  const handleResearch = async () => {
    if (!selectedAgent || !companyName.trim()) return;
    
    setIsResearching(true);
    try {
      // Prepare the API body with the company name/URL
      const apiBody = {
        company_url: companyName.trim()
      };
      
      const response = await fetch(selectedAgent.apiEndpoint, {
        method: selectedAgent.apiMethod || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(selectedAgent.apiHeaders || {})
        },
        body: JSON.stringify(apiBody)
      });
      
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResearchResults(data);
      toast.success('Research completed successfully!');
    } catch (apiError: any) {
      console.error('API call error:', apiError);
      toast.error(`Failed to research company: ${apiError.message || 'Unknown error'}`);
      setResearchResults(null);
    } finally {
      setIsResearching(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-surface-50 to-white dark:from-surface-900 dark:to-surface-950 min-h-screen pt-20">
      {/* Agents header */}
      <div className="bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-primary-900/20 border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center justify-center mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-full px-4 py-1.5">
                <Bot size={16} className="mr-2 text-primary-500" />
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  Browse & Use AI Agents
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white mb-3">
                Available Agents
              </h1>
              <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mb-2">
                Browse through our curated collection of AI agents and use any agent you need with your subscription.
              </p>
              <p className="text-sm text-surface-500 dark:text-surface-400 max-w-2xl">
                All agents are included with your subscription. Simply browse, select, and use the agents that help you most.
              </p>
            </div>
            
            {/* Search bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-400" size={20} />
              <input
                type="text"
                placeholder={t('marketplace.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg border border-surface-200 dark:border-surface-700 p-6">
                <div className="flex items-center mb-4">
                  <Filter size={20} className="text-primary-500 mr-2" />
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Categories</h3>
                </div>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl transition-all font-medium',
                      selectedCategory === 'all'
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-surface-50 dark:bg-surface-900 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                    )}
                  >
                    All Categories
                  </button>
                  {AGENT_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        'w-full text-left px-4 py-2.5 rounded-xl transition-all',
                        selectedCategory === category
                          ? 'bg-primary-500 text-white shadow-md font-medium'
                          : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                      )}
                    >
                      {formatCategoryName(category)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Agents grid */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-surface-600 dark:text-surface-400 font-medium">
                  {sortedAgents.length} {sortedAgents.length === 1 ? 'agent' : 'agents'} available
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                {/* View mode toggle */}
                <div className="flex items-center gap-1 bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-surface-700 text-primary-500 shadow-sm'
                        : 'text-surface-500 hover:text-surface-900 dark:hover:text-white'
                    )}
                    aria-label="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'list'
                        ? 'bg-white dark:bg-surface-700 text-primary-500 shadow-sm'
                        : 'text-surface-500 hover:text-surface-900 dark:hover:text-white'
                    )}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
                
                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-surface-800 rounded-xl border-2 border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-300 hover:border-primary-500 dark:hover:border-primary-500 transition-all font-medium"
                  >
                    <span>Sort:</span>
                    <span className="text-primary-500">
                      {sortOption === 'newest' && 'Newest First'}
                      {sortOption === 'name' && 'Name (A-Z)'}
                    </span>
                    <ChevronDown size={16} className={cn('transition-transform', isFilterOpen && 'rotate-180')} />
                  </button>
                  
                  {isFilterOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsFilterOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-surface-800 rounded-xl shadow-xl border-2 border-surface-200 dark:border-surface-700 z-20">
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setSortOption('newest');
                              setIsFilterOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-2.5 rounded-lg transition-colors font-medium",
                              sortOption === 'newest'
                                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                            )}
                          >
                            Newest First
                          </button>
                          <button
                            onClick={() => {
                              setSortOption('name');
                              setIsFilterOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-2.5 rounded-lg transition-colors font-medium",
                              sortOption === 'name'
                                ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                            )}
                          >
                            Name (A-Z)
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-20">
                <Bot size={48} className="animate-spin mx-auto text-primary-500 mb-4" />
                <p className="text-surface-600 dark:text-surface-400 text-lg">Loading agents...</p>
              </div>
            ) : sortedAgents.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-surface-800 rounded-2xl border-2 border-dashed border-surface-300 dark:border-surface-700">
                <Bot size={64} className="mx-auto text-surface-400 mb-4" />
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">No agents found</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-md mx-auto">
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
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-lg border-2 border-surface-200 dark:border-surface-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Agent image */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20">
                      <img
                        src={agent.image || 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600'}
                        alt={agent.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {agent.category ? formatCategoryName(agent.category) : 'Agent'}
                          </span>
                          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Included
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Agent info */}
                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                          {agent.name}
                        </h3>
                        <p className="text-surface-600 dark:text-surface-400 text-sm line-clamp-2 leading-relaxed">
                          {agent.description || 'No description available'}
                        </p>
                      </div>
                      
                      {/* Agent stats */}
                      <div className="flex items-center gap-4 mb-4 text-xs text-surface-500 dark:text-surface-400">
                        <div className="flex items-center">
                          <Zap size={14} className="mr-1" />
                          <span>Active</span>
                        </div>
                      </div>
                      
                      {/* Execute button */}
                      <Button 
                        isFullWidth
                        onClick={() => handleExecuteAgent(agent)}
                        className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                      >
                        <Zap size={18} className="mr-2" />
                        Use Agent
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-lg border-2 border-surface-200 dark:border-surface-700 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Agent image */}
                      <div className="md:w-64 h-48 md:h-auto overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20">
                        <img
                          src={agent.image || 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600'}
                          alt={agent.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Agent info */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors">
                                  {agent.name}
                                </h3>
                                <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-semibold">
                                  {agent.category ? formatCategoryName(agent.category) : 'Agent'}
                                </span>
                              </div>
                              <p className="text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
                                {agent.description || 'No description available'}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2 ml-4">
                              <div className="flex items-center bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-xl">
                                <Zap size={18} className="mr-2" />
                                <span className="text-sm font-semibold">Included</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
                          <div className="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
                            <div className="flex items-center">
                              <Zap size={16} className="mr-1" />
                              <span>Active Agent</span>
                            </div>
                          </div>
                          <Button 
                            onClick={() => handleExecuteAgent(agent)}
                            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2.5 rounded-xl"
                          >
                            <Zap size={18} className="mr-2" />
                            Use Agent
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Agent Research Dashboard Modal */}
      {isAgentModalOpen && selectedAgent && (
        <div 
          className="fixed inset-0 bg-surface-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setIsAgentModalOpen(false);
            setCompanyName('');
            setResearchResults(null);
          }}
        >
          <div 
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-2xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700 sticky top-0 bg-white dark:bg-surface-800 z-10">
              <div>
                <h3 className="text-2xl font-bold text-surface-900 dark:text-white">
                  {selectedAgent.name}
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                  {selectedAgent.description}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAgentModalOpen(false);
                  setCompanyName('');
                  setResearchResults(null);
                }}
                className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Research Dashboard Content */}
            <div className="p-6">
              {!researchResults ? (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="company-name" className="block text-sm font-semibold text-surface-900 dark:text-white mb-2">
                      Company Name or URL
                    </label>
                    <div className="flex gap-3">
                      <input
                        id="company-name"
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Enter company name or website URL (e.g., Apple, apple.com)"
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && companyName.trim() && !isResearching) {
                            handleResearch();
                          }
                        }}
                        disabled={isResearching}
                      />
                      <Button
                        onClick={handleResearch}
                        disabled={!companyName.trim() || isResearching}
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isResearching ? (
                          <>
                            <Loader2 size={18} className="mr-2 animate-spin" />
                            Researching...
                          </>
                        ) : (
                          <>
                            <Search size={18} className="mr-2" />
                            Research
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-surface-500 dark:text-surface-400">
                      Enter a company name or website URL to get comprehensive research and analysis.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-surface-900 dark:text-white">
                      Research Results for: <span className="text-primary-500">{companyName}</span>
                    </h4>
                    <Button
                      onClick={() => {
                        setResearchResults(null);
                        setCompanyName('');
                      }}
                      variant="outline"
                      className="px-4 py-2"
                    >
                      New Research
                    </Button>
                  </div>
                  <div className="bg-surface-50 dark:bg-surface-900 rounded-xl p-6 border-2 border-surface-200 dark:border-surface-700">
                    <pre className="whitespace-pre-wrap text-sm text-surface-700 dark:text-surface-300 font-mono overflow-auto max-h-[500px]">
                      {JSON.stringify(researchResults, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

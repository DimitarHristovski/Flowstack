import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, PlusCircle, Bot, CircleSlash as SlashCircle, Filter, SlidersHorizontal, Trash2, PencilLine, Play, Activity, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

// Agent types and mock data
type AgentStatus = 'active' | 'idle' | 'stopped' | 'error';

interface Agent {
  id: string;
  name: string;
  description: string;
  image: string;
  status: AgentStatus;
  currentTask: string | null;
  lastActive: string;
  type: string;
  performance: number;
}

export default function MyAgentsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AgentStatus | 'all'>('all');
  
  // Mock agents data
  const mockAgents: Agent[] = [
    {
      id: '1',
      name: 'Content Writer Pro',
      description: 'AI-powered content writer that creates blog posts, articles, and social media content.',
      image: 'https://images.pexels.com/photos/6956503/pexels-photo-6956503.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'active',
      currentTask: 'Writing blog post about AI trends',
      lastActive: '10 minutes ago',
      type: 'Creativity',
      performance: 96,
    },
    {
      id: '2',
      name: 'Research Assistant',
      description: 'Collects and analyzes data from various sources to help with your research projects.',
      image: 'https://images.pexels.com/photos/8438951/pexels-photo-8438951.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'active',
      currentTask: 'Analyzing market data for Q3 report',
      lastActive: '30 minutes ago',
      type: 'Research',
      performance: 89,
    },
    {
      id: '3',
      name: 'Email Manager',
      description: 'Organizes and prioritizes your emails, drafts responses, and helps maintain inbox zero.',
      image: 'https://images.pexels.com/photos/8438952/pexels-photo-8438952.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'idle',
      currentTask: null,
      lastActive: '2 hours ago',
      type: 'Productivity',
      performance: 92,
    },
    {
      id: '4',
      name: 'Code Assistant',
      description: 'Helps you write, review, and optimize code across multiple programming languages.',
      image: 'https://images.pexels.com/photos/6956579/pexels-photo-6956579.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'active',
      currentTask: 'Refactoring JavaScript codebase',
      lastActive: '5 minutes ago',
      type: 'Coding',
      performance: 94,
    },
    {
      id: '5',
      name: 'Social Media Manager',
      description: 'Creates and schedules social media posts, analyzes engagement, and suggests improvements.',
      image: 'https://images.pexels.com/photos/6962024/pexels-photo-6962024.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'stopped',
      currentTask: null,
      lastActive: '3 days ago',
      type: 'Communication',
      performance: 87,
    },
    {
      id: '6',
      name: 'Personal Finance Advisor',
      description: 'Analyzes your spending habits, creates budgets, and offers personalized financial advice.',
      image: 'https://images.pexels.com/photos/7947452/pexels-photo-7947452.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'error',
      currentTask: null,
      lastActive: '1 day ago',
      type: 'Finance',
      performance: 78,
    },
    {
      id: '7',
      name: 'Task Organizer',
      description: 'Helps you manage tasks, set priorities, and meet deadlines.',
      image: 'https://images.pexels.com/photos/6956579/pexels-photo-6956579.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'idle',
      currentTask: null,
      lastActive: '4 hours ago',
      type: 'Productivity',
      performance: 91,
    },
    {
      id: '8',
      name: 'Meeting Summarizer',
      description: 'Records and transcribes meetings, creates summaries, and extracts action items.',
      image: 'https://images.pexels.com/photos/6956509/pexels-photo-6956509.jpeg?auto=compress&cs=tinysrgb&w=600',
      status: 'stopped',
      currentTask: null,
      lastActive: '1 week ago',
      type: 'Productivity',
      performance: 85,
    },
  ];
  
  // Filter agents
  const filteredAgents = mockAgents.filter((agent) => {
    // Filter by search query
    if (
      searchQuery &&
      !agent.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && agent.status !== statusFilter) {
      return false;
    }
    
    return true;
  });

  // Get counts by status
  const agentCounts = {
    all: mockAgents.length,
    active: mockAgents.filter(agent => agent.status === 'active').length,
    idle: mockAgents.filter(agent => agent.status === 'idle').length,
    stopped: mockAgents.filter(agent => agent.status === 'stopped').length,
    error: mockAgents.filter(agent => agent.status === 'error').length,
  };

  // Helper function for status badge
  const getStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400">
            <span className="w-1.5 h-1.5 rounded-full bg-success-500 mr-1.5 animate-pulse"></span>
            Active
          </span>
        );
      case 'idle':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-1.5"></span>
            Idle
          </span>
        );
      case 'stopped':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
            <span className="w-1.5 h-1.5 rounded-full bg-surface-500 mr-1.5"></span>
            Stopped
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400">
            <span className="w-1.5 h-1.5 rounded-full bg-error-500 mr-1.5"></span>
            Error
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">My AI Agents</h1>
        <div className="mt-4 sm:mt-0">
          <Button
            leftIcon={<PlusCircle size={16} />}
          >
            Add New Agent
          </Button>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === 'all' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<Bot size={16} />}
              onClick={() => setStatusFilter('all')}
              className="whitespace-nowrap"
            >
              All
              <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {agentCounts.all}
              </span>
            </Button>
            
            <Button
              variant={statusFilter === 'active' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<Activity size={16} />}
              onClick={() => setStatusFilter('active')}
              className="whitespace-nowrap"
            >
              Active
              <span className={`ml-1.5 ${statusFilter === 'active' ? 'bg-white/20' : 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'} px-1.5 py-0.5 rounded-full text-xs`}>
                {agentCounts.active}
              </span>
            </Button>
            
            <Button
              variant={statusFilter === 'idle' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<RefreshCw size={16} />}
              onClick={() => setStatusFilter('idle')}
              className="whitespace-nowrap"
            >
              Idle
              <span className={`ml-1.5 ${statusFilter === 'idle' ? 'bg-white/20' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'} px-1.5 py-0.5 rounded-full text-xs`}>
                {agentCounts.idle}
              </span>
            </Button>
            
            <Button
              variant={statusFilter === 'stopped' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<SlashCircle size={16} />}
              onClick={() => setStatusFilter('stopped')}
              className="whitespace-nowrap"
            >
              Stopped
              <span className={`ml-1.5 ${statusFilter === 'stopped' ? 'bg-white/20' : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'} px-1.5 py-0.5 rounded-full text-xs`}>
                {agentCounts.stopped}
              </span>
            </Button>
            
            <Button
              variant={statusFilter === 'error' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<SlidersHorizontal size={16} />}
              onClick={() => setStatusFilter('error')}
              className="whitespace-nowrap"
            >
              Error
              <span className={`ml-1.5 ${statusFilter === 'error' ? 'bg-white/20' : 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400'} px-1.5 py-0.5 rounded-full text-xs`}>
                {agentCounts.error}
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Agents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-surface-900/0 to-surface-900/60"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                {getStatusBadge(agent.status)}
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2 h-10">
                {agent.description}
              </p>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-surface-500 dark:text-surface-400 mb-1">Current Task</div>
                  <div className="text-sm text-surface-900 dark:text-white font-medium line-clamp-1">
                    {agent.currentTask || 'No active task'}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs text-surface-500 dark:text-surface-400 mb-1">Last Active</div>
                    <div className="text-sm text-surface-900 dark:text-white">{agent.lastActive}</div>
                  </div>
                  <div>
                    <div className="text-xs text-surface-500 dark:text-surface-400 mb-1">Performance</div>
                    <div className="text-sm text-surface-900 dark:text-white font-medium flex items-center">
                      <span className={cn(
                        agent.performance >= 90 ? 'text-success-500' : 
                        agent.performance >= 70 ? 'text-warning-500' : 
                        'text-error-500'
                      )}>
                        {agent.performance}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-2">
                {agent.status === 'active' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<SlashCircle size={14} />}
                    isFullWidth
                  >
                    Stop
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Play size={14} />}
                    isFullWidth
                  >
                    Start
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<PencilLine size={14} />}
                  isFullWidth
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Trash2 size={14} />}
                  isFullWidth
                  className="text-error-500 hover:text-error-600 dark:hover:text-error-400 hover:border-error-300 dark:hover:border-error-800"
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Empty state */}
      {filteredAgents.length === 0 && (
        <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-8 text-center">
          <Bot size={48} className="mx-auto text-surface-400 mb-4" />
          <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No agents found</h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            {searchQuery || statusFilter !== 'all' 
              ? 'Try adjusting your filters to find what you\'re looking for.' 
              : t('dashboard.agents.empty')}
          </p>
          <div className="flex justify-center space-x-4">
            {(searchQuery || statusFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                }}
              >
                Clear Filters
              </Button>
            )}
            <Button
              leftIcon={<PlusCircle size={16} />}
            >
              Add New Agent
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
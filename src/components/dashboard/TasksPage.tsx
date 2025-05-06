import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Play, PlusCircle, CheckCircle, Clock, AlertCircle, RefreshCw, Filter, SlidersHorizontal, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

type TaskStatus = 'completed' | 'in-progress' | 'queued' | 'failed';
type SortOrder = 'newest' | 'oldest';

interface Task {
  id: string;
  title: string;
  description: string;
  agent: string;
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
  priority: 'low' | 'medium' | 'high';
  duration?: string;
}

export default function TasksPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  
  // Mock tasks data
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Write a blog post about AI trends',
      description: 'Create a 1500-word article covering the latest trends in artificial intelligence, focusing on practical applications for businesses.',
      agent: 'Content Writer Pro',
      status: 'completed',
      createdAt: '2023-10-15T09:30:00Z',
      completedAt: '2023-10-15T11:45:00Z',
      priority: 'high',
      duration: '2h 15m',
    },
    {
      id: '2',
      title: 'Analyze Q3 financial report',
      description: 'Review the Q3 financial data, identify key trends, and prepare a summary with actionable insights.',
      agent: 'Research Assistant',
      status: 'in-progress',
      createdAt: '2023-10-16T14:20:00Z',
      priority: 'high',
    },
    {
      id: '3',
      title: 'Respond to customer inquiries',
      description: 'Process and respond to 15 customer support emails with appropriate information and solutions.',
      agent: 'Email Manager',
      status: 'queued',
      createdAt: '2023-10-16T16:45:00Z',
      priority: 'medium',
    },
    {
      id: '4',
      title: 'Optimize landing page code',
      description: 'Review and refactor the JavaScript code for the marketing landing page to improve performance.',
      agent: 'Code Assistant',
      status: 'in-progress',
      createdAt: '2023-10-14T11:00:00Z',
      priority: 'medium',
    },
    {
      id: '5',
      title: 'Schedule social media posts for the week',
      description: 'Create and schedule 5 LinkedIn posts and 10 Twitter posts about our latest product release.',
      agent: 'Social Media Manager',
      status: 'completed',
      createdAt: '2023-10-13T09:15:00Z',
      completedAt: '2023-10-13T12:30:00Z',
      priority: 'medium',
      duration: '3h 15m',
    },
    {
      id: '6',
      title: 'Analyze monthly expenses and suggest budget optimizations',
      description: 'Review October expenses, categorize them, and provide recommendations for cost savings.',
      agent: 'Personal Finance Advisor',
      status: 'failed',
      createdAt: '2023-10-15T13:20:00Z',
      priority: 'low',
    },
    {
      id: '7',
      title: 'Reorganize project tasks and deadlines',
      description: 'Review all current tasks, organize by priority, and adjust deadlines for the product launch.',
      agent: 'Task Organizer',
      status: 'completed',
      createdAt: '2023-10-12T10:30:00Z',
      completedAt: '2023-10-12T11:45:00Z',
      priority: 'high',
      duration: '1h 15m',
    },
    {
      id: '8',
      title: 'Transcribe and summarize team meeting',
      description: 'Create a detailed summary with action items from the product team\'s weekly meeting.',
      agent: 'Meeting Summarizer',
      status: 'queued',
      createdAt: '2023-10-16T18:00:00Z',
      priority: 'low',
    },
  ];
  
  // Get unique agents
  const agents = ['all', ...Array.from(new Set(mockTasks.map(task => task.agent)))];
  
  // Filter tasks
  const filteredTasks = mockTasks.filter((task) => {
    // Filter by search query
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && task.status !== statusFilter) {
      return false;
    }
    
    // Filter by priority
    if (selectedPriority !== 'all' && task.priority !== selectedPriority) {
      return false;
    }
    
    // Filter by agent
    if (selectedAgent !== 'all' && task.agent !== selectedAgent) {
      return false;
    }
    
    return true;
  });
  
  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    
    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
  
  // Get counts by status
  const taskCounts = {
    all: mockTasks.length,
    completed: mockTasks.filter(task => task.status === 'completed').length,
    'in-progress': mockTasks.filter(task => task.status === 'in-progress').length,
    queued: mockTasks.filter(task => task.status === 'queued').length,
    failed: mockTasks.filter(task => task.status === 'failed').length,
  };
  
  // Helper function for status badge
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400">
            <RefreshCw size={12} className="mr-1 animate-spin" />
            In Progress
          </span>
        );
      case 'queued':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300">
            <Clock size={12} className="mr-1" />
            Queued
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400">
            <AlertCircle size={12} className="mr-1" />
            Failed
          </span>
        );
    }
  };
  
  // Helper function for priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400">
            Low
          </span>
        );
      default:
        return null;
    }
  };
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Tasks</h1>
        <div className="mt-4 sm:mt-0">
          <Button
            leftIcon={<PlusCircle size={16} />}
          >
            Create New Task
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
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('all')}
              className="whitespace-nowrap"
            >
              All
              <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {taskCounts.all}
              </span>
            </Button>
            
            <Button
              variant={statusFilter === 'completed' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<CheckCircle size={14} />}
              onClick={() => setStatusFilter('completed')}
              className="whitespace-nowrap"
            >
              Completed
              <span className={`ml-1.5 ${statusFilter === 'completed' ? 'bg-white/20' : 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'} px-1.5 py-0.5 rounded-full text-xs`}>
                {taskCounts.completed}
              </span>
            </Button>
            
            <Button
              variant={statusFilter === 'in-progress' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<RefreshCw size={14} />}
              onClick={() => setStatusFilter('in-progress')}
              className="whitespace-nowrap"
            >
              In Progress
              <span className={`ml-1.5 ${statusFilter === 'in-progress' ? 'bg-white/20' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'} px-1.5 py-0.5 rounded-full text-xs`}>
                {taskCounts['in-progress']}
              </span>
            </Button>
            
            <Button
              variant={statusFilter === 'queued' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<Clock size={14} />}
              onClick={() => setStatusFilter('queued')}
              className="whitespace-nowrap"
            >
              Queued
              <span className={`ml-1.5 ${statusFilter === 'queued' ? 'bg-white/20' : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'} px-1.5 py-0.5 rounded-full text-xs`}>
                {taskCounts.queued}
              </span>
            </Button>
            
            <Button
              variant={statusFilter === 'failed' ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<AlertCircle size={14} />}
              onClick={() => setStatusFilter('failed')}
              className="whitespace-nowrap"
            >
              Failed
              <span className={`ml-1.5 ${statusFilter === 'failed' ? 'bg-white/20' : 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400'} px-1.5 py-0.5 rounded-full text-xs`}>
                {taskCounts.failed}
              </span>
            </Button>
            
            <div className="relative ml-auto">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<SlidersHorizontal size={14} />}
                rightIcon={<ChevronDown size={14} />}
                className="whitespace-nowrap"
              >
                More Filters
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-surface-500 dark:text-surface-400">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded p-1 text-surface-900 dark:text-white"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-surface-500 dark:text-surface-400">Agent:</span>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded p-1 text-surface-900 dark:text-white"
            >
              {agents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent === 'all' ? 'All Agents' : agent}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-surface-500 dark:text-surface-400">Sort:</span>
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="flex items-center gap-1 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {sortOrder === 'newest' ? (
                <>
                  Newest first
                  <ChevronDown size={14} />
                </>
              ) : (
                <>
                  Oldest first
                  <ChevronUp size={14} />
                </>
              )}
            </button>
          </div>
          
          {(statusFilter !== 'all' || selectedPriority !== 'all' || selectedAgent !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setStatusFilter('all');
                setSelectedPriority('all');
                setSelectedAgent('all');
                setSearchQuery('');
              }}
              className="flex items-center gap-1 text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-300"
            >
              <X size={14} />
              Clear filters
            </button>
          )}
        </div>
      </div>
      
      {/* Tasks list */}
      <div className="space-y-4">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden"
          >
            <div className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white">{task.title}</h3>
                    {getPriorityBadge(task.priority)}
                  </div>
                  <div className="mt-1 text-sm text-surface-600 dark:text-surface-400">
                    Agent: {task.agent}
                  </div>
                </div>
                <div className="mt-2 sm:mt-0">
                  {getStatusBadge(task.status)}
                </div>
              </div>
              
              <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">{task.description}</p>
              
              <div className="flex flex-wrap gap-4 text-xs text-surface-500 dark:text-surface-400">
                <div>
                  Created: {formatDate(task.createdAt)}
                </div>
                {task.completedAt && (
                  <div>
                    Completed: {formatDate(task.completedAt)}
                  </div>
                )}
                {task.duration && (
                  <div>
                    Duration: {task.duration}
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {task.status === 'queued' && (
                  <Button
                    size="sm"
                    leftIcon={<Play size={14} />}
                  >
                    Run Now
                  </Button>
                )}
                
                {task.status === 'failed' && (
                  <Button
                    size="sm"
                    leftIcon={<RefreshCw size={14} />}
                  >
                    Retry
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                >
                  View Details
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-error-500 hover:text-error-600 dark:hover:text-error-400 hover:border-error-300 dark:hover:border-error-800"
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Empty state */}
        {sortedTasks.length === 0 && (
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-8 text-center">
            <Clock size={48} className="mx-auto text-surface-400 mb-4" />
            <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No tasks found</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              {statusFilter !== 'all' || selectedPriority !== 'all' || selectedAgent !== 'all' || searchQuery
                ? 'Try adjusting your filters to find what you\'re looking for.'
                : 'No tasks have been created yet. Create your first task to get started.'}
            </p>
            <div className="flex justify-center space-x-4">
              {(statusFilter !== 'all' || selectedPriority !== 'all' || selectedAgent !== 'all' || searchQuery) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatusFilter('all');
                    setSelectedPriority('all');
                    setSelectedAgent('all');
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              )}
              <Button
                leftIcon={<PlusCircle size={16} />}
              >
                Create New Task
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
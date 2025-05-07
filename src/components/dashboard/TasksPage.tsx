import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Play, PlusCircle, CheckCircle, Clock, AlertCircle, RefreshCw, Filter, SlidersHorizontal, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useTaskStore, useAgentStore } from '../../lib/store';
import { toast } from 'sonner';

type TaskStatus = 'completed' | 'in-progress' | 'queued' | 'failed';
type SortOrder = 'newest' | 'oldest';

interface NewTaskData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  agent_id: string | null;
}

export default function TasksPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState<NewTaskData>({
    title: '',
    description: '',
    priority: 'medium',
    agent_id: null,
  });
  
  const { tasks, loading, fetchTasks, addTask, updateTask, deleteTask } = useTaskStore();
  const { agents, fetchAgents } = useAgentStore();

  // Fetch tasks and agents on mount
  useEffect(() => {
    fetchTasks();
    fetchAgents();
  }, [fetchTasks, fetchAgents]);

  // Handle task creation
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTask(newTaskData);
      toast.success('Task created successfully');
      setIsCreateModalOpen(false);
      setNewTaskData({
        title: '',
        description: '',
        priority: 'medium',
        agent_id: null,
      });
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  // Handle task start
  const handleStartTask = async (id: string) => {
    try {
      await updateTask(id, { status: 'in-progress' });
      toast.success('Task started successfully');
    } catch (error) {
      toast.error('Failed to start task');
    }
  };

  // Handle task retry
  const handleRetryTask = async (id: string) => {
    try {
      await updateTask(id, { status: 'queued' });
      toast.success('Task queued for retry');
    } catch (error) {
      toast.error('Failed to retry task');
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
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
    if (selectedAgent !== 'all' && task.agent_id !== selectedAgent) {
      return false;
    }
    
    return true;
  });
  
  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      default:
        return 0;
    }
  });
  
  // Get counts by status
  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    'in-progress': tasks.filter(task => task.status === 'in-progress').length,
    queued: tasks.filter(task => task.status === 'queued').length,
    failed: tasks.filter(task => task.status === 'failed').length,
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
            onClick={() => setIsCreateModalOpen(true)}
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
              <option value="all">All Agents</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
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
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw size={32} className="animate-spin mx-auto text-primary-500 mb-4" />
          <p className="text-surface-600 dark:text-surface-400">Loading tasks...</p>
        </div>
      ) : sortedTasks.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-surface-800 rounded-lg border border-dashed border-surface-300 dark:border-surface-700">
          <Clock size={48} className="mx-auto text-surface-400 mb-4" />
          <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            {searchQuery || statusFilter !== 'all' || selectedPriority !== 'all' || selectedAgent !== 'all'
              ? 'Try adjusting your filters to find what you\'re looking for.'
              : 'No tasks have been created yet. Create your first task to get started.'}
          </p>
          <div className="flex justify-center space-x-4">
            {(searchQuery || statusFilter !== 'all' || selectedPriority !== 'all' || selectedAgent !== 'all') && (
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
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create New Task
            </Button>
          </div>
        </div>
      ) : (
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
                      <span className={cn(
                        'px-2 py-0.5 rounded-md text-xs font-medium',
                        task.priority === 'high' ? 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400' :
                        task.priority === 'medium' ? 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400' :
                        'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                      )}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-surface-600 dark:text-surface-400">
                      Agent: {agents.find(a => a.id === task.agent_id)?.name || 'Unassigned'}
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    {getStatusBadge(task.status as TaskStatus)}
                  </div>
                </div>
                
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">{task.description}</p>
                
                <div className="flex flex-wrap gap-4 text-xs text-surface-500 dark:text-surface-400">
                  <div>
                    Created: {formatDate(task.created_at)}
                  </div>
                  {task.completed_at && (
                    <div>
                      Completed: {formatDate(task.completed_at)}
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
                      onClick={() => handleStartTask(task.id)}
                    >
                      Run Now
                    </Button>
                  )}
                  
                  {task.status === 'failed' && (
                    <Button
                      size="sm"
                      leftIcon={<RefreshCw size={14} />}
                      onClick={() => handleRetryTask(task.id)}
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
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-medium text-surface-900 dark:text-white">Create New Task</h3>
            </div>
            <form onSubmit={handleCreateTask} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTaskData.title}
                    onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                    required
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTaskData.description}
                    onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTaskData.priority}
                    onChange={(e) => setNewTaskData({ ...newTaskData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Assign Agent
                  </label>
                  <select
                    value={newTaskData.agent_id || ''}
                    onChange={(e) => setNewTaskData({ ...newTaskData, agent_id: e.target.value || null })}
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Unassigned</option>
                    {agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setNewTaskData({
                      title: '',
                      description: '',
                      priority: 'medium',
                      agent_id: null,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Create Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Play, 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  RefreshCw, 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  X, 
  PencilLine, 
  Trash2, 
  Bot, 
  Activity, 
  CircleSlash,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useAgentStore } from '../../lib/store';
import { toast } from 'sonner';

type AgentStatus = 'active' | 'idle' | 'stopped' | 'error';

interface EditAgentData {
  name: string;
  description: string;
  image: string;
}

interface NewAgentData {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export default function MyAgentsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AgentStatus | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditAgentData>({
    name: '',
    description: '',
    image: '',
  });
  const [newAgentData, setNewAgentData] = useState<NewAgentData>({
    name: '',
    description: '',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 0,
    category: 'productivity'
  });

  const { agents, loading, fetchAgents, startAgent, stopAgent, deleteAgent, editAgent, addAgent } = useAgentStore();

  // Fetch agents on mount
  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
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
    all: agents.length,
    active: agents.filter(agent => agent.status === 'active').length,
    idle: agents.filter(agent => agent.status === 'idle').length,
    stopped: agents.filter(agent => agent.status === 'stopped').length,
    error: agents.filter(agent => agent.status === 'error').length,
  };

  // Handle agent actions
  const handleStartAgent = async (id: string) => {
    try {
      await startAgent(id);
      toast.success('Agent started successfully');
    } catch (error) {
      toast.error('Failed to start agent');
    }
  };

  const handleStopAgent = async (id: string) => {
    try {
      await stopAgent(id);
      toast.success('Agent stopped successfully');
    } catch (error) {
      toast.error('Failed to stop agent');
    }
  };

  const handleDeleteAgent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await deleteAgent(id);
        toast.success('Agent deleted successfully');
      } catch (error) {
        toast.error('Failed to delete agent');
      }
    }
  };

  const handleEditAgent = async (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (agent) {
      setEditingAgent(id);
      setEditData({
        name: agent.name,
        description: agent.description,
        image: agent.image,
      });
      setIsEditModalOpen(true);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAgent) return;

    try {
      await editAgent(editingAgent, editData);
      toast.success('Agent updated successfully');
      setIsEditModalOpen(false);
      setEditingAgent(null);
    } catch (error) {
      toast.error('Failed to update agent');
    }
  };

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAgent(newAgentData);
      toast.success('Agent added successfully');
      setIsAddModalOpen(false);
      setNewAgentData({
        name: '',
        description: '',
        image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: 0,
        category: 'productivity'
      });
    } catch (error) {
      toast.error('Failed to add agent');
    }
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
            onClick={() => setIsAddModalOpen(true)}
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
              leftIcon={<CircleSlash size={16} />}
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
              leftIcon={<AlertCircle size={16} />}
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
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw size={32} className="animate-spin mx-auto text-primary-500 mb-4" />
          <p className="text-surface-600 dark:text-surface-400">Loading agents...</p>
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-surface-800 rounded-lg border border-dashed border-surface-300 dark:border-surface-700">
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
              onClick={() => setIsAddModalOpen(true)}
            >
              Add New Agent
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
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
                  {getStatusBadge(agent.status as AgentStatus)}
                </div>
                <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">{agent.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-surface-500 dark:text-surface-400 mb-1">Current Task</div>
                    <div className="text-sm text-surface-900 dark:text-white font-medium line-clamp-1">
                      {agent.current_task || 'No active task'}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {agent.status === 'active' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<CircleSlash size={14} />}
                      isFullWidth
                      onClick={() => handleStopAgent(agent.id)}
                    >
                      Stop
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Play size={14} />}
                      isFullWidth
                      onClick={() => handleStartAgent(agent.id)}
                    >
                      Start
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<PencilLine size={14} />}
                    isFullWidth
                    onClick={() => handleEditAgent(agent.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Trash2 size={14} />}
                    isFullWidth
                    className="text-error-500 hover:text-error-600 dark:hover:text-error-400 hover:border-error-300 dark:hover:border-error-800"
                    onClick={() => handleDeleteAgent(agent.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Agent Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-medium text-surface-900 dark:text-white">Add New Agent</h3>
            </div>
            <form onSubmit={handleAddAgent} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newAgentData.name}
                    onChange={(e) => setNewAgentData({ ...newAgentData, name: e.target.value })}
                    required
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newAgentData.description}
                    onChange={(e) => setNewAgentData({ ...newAgentData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-surface-500" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={newAgentData.price}
                      onChange={(e) => setNewAgentData({ ...newAgentData, price: parseFloat(e.target.value) })}
                      required
                      className="pl-8 w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newAgentData.category}
                    onChange={(e) => setNewAgentData({ ...newAgentData, category: e.target.value })}
                    required
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="productivity">Productivity</option>
                    <option value="creativity">Creativity</option>
                    <option value="research">Research</option>
                    <option value="communication">Communication</option>
                    <option value="finance">Finance</option>
                    <option value="coding">Coding</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setNewAgentData({
                      name: '',
                      description: '',
                      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
                      price: 0,
                      category: 'productivity'
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Agent
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Agent Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-medium text-surface-900 dark:text-white">Edit Agent</h3>
            </div>
            <form onSubmit={handleEditSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    required
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingAgent(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
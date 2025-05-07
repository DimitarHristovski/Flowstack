import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, Zap, CheckCircle, DollarSign, ChevronRight, Clock, Bot, BarChart3 } from 'lucide-react';
import { formatNumber } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useProfileStore, useAgentStore, useTaskStore } from '../../lib/store';

export default function DashboardOverview() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile } = useProfileStore();
  const { agents } = useAgentStore();
  const { tasks } = useTaskStore();

  // Calculate stats
  const stats = [
    { 
      id: 'total-agents', 
      label: 'dashboard.stats.totalAgents', 
      value: agents.length,
      icon: <Users className="text-primary-500" />,
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
      textColor: 'text-primary-500' 
    },
    { 
      id: 'active-agents', 
      label: 'dashboard.stats.activeAgents', 
      value: agents.filter(agent => agent.status === 'active').length,
      icon: <Zap className="text-secondary-500" />,
      bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
      textColor: 'text-secondary-500'
    },
    { 
      id: 'tasks-completed', 
      label: 'dashboard.stats.tasksCompleted', 
      value: tasks.filter(task => task.status === 'completed').length,
      icon: <CheckCircle className="text-success-500" />,
      bgColor: 'bg-success-50 dark:bg-success-900/20',
      textColor: 'text-success-500'
    },
    { 
      id: 'monthly-spend', 
      label: 'dashboard.stats.monthlySpend', 
      value: '$0', // This would come from a billing system
      icon: <DollarSign className="text-warning-500" />,
      bgColor: 'bg-warning-50 dark:bg-warning-900/20',
      textColor: 'text-warning-500'
    },
  ];

  // Quick action handlers
  const handleCreateAgent = () => {
    navigate('/dashboard/agents');
  };

  const handleNewTask = () => {
    navigate('/dashboard/tasks');
  };

  const handleViewAnalytics = () => {
    navigate('/dashboard/analytics');
  };

  const handleMoreActions = () => {
    navigate('/dashboard/settings');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-1">
            {t('dashboard.welcome')}, {profile?.full_name || 'User'}!
          </h1>
          <p className="text-surface-600 dark:text-surface-400">Here's what's happening with your agents today.</p>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-5"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-md ${stat.bgColor}`}>
                {stat.icon}
              </div>
              <span className="text-surface-400 dark:text-surface-500 text-sm font-medium">{t(stat.label)}</span>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold text-surface-900 dark:text-white">
                {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Quick actions */}
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-6">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            leftIcon={<Bot size={16} />}
            isFullWidth
            onClick={handleCreateAgent}
          >
            Create Agent
          </Button>
          <Button
            variant="outline"
            leftIcon={<Clock size={16} />}
            isFullWidth
            onClick={handleNewTask}
          >
            New Task
          </Button>
          <Button
            variant="outline"
            leftIcon={<BarChart3 size={16} />}
            isFullWidth
            onClick={handleViewAnalytics}
          >
            View Analytics
          </Button>
          <Button
            variant="outline"
            leftIcon={<ChevronRight size={16} />}
            isFullWidth
            onClick={handleMoreActions}
          >
            More Actions
          </Button>
        </div>
      </div>
    </div>
  );
}
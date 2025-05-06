import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, Zap, CheckCircle, DollarSign, ChevronRight, Clock, Bot, BarChart3 } from 'lucide-react';
import { formatNumber, formatCurrency } from '../../lib/utils';
import { Button, LinkButton } from '../ui/Button';

// Mock data
const stats = [
  { 
    id: 'total-agents', 
    label: 'dashboard.stats.totalAgents', 
    value: 8, 
    icon: <Users className="text-primary-500" />,
    bgColor: 'bg-primary-50 dark:bg-primary-900/20',
    textColor: 'text-primary-500' 
  },
  { 
    id: 'active-agents', 
    label: 'dashboard.stats.activeAgents', 
    value: 5, 
    icon: <Zap className="text-secondary-500" />,
    bgColor: 'bg-secondary-50 dark:bg-secondary-900/20',
    textColor: 'text-secondary-500'
  },
  { 
    id: 'tasks-completed', 
    label: 'dashboard.stats.tasksCompleted', 
    value: 1254, 
    icon: <CheckCircle className="text-success-500" />,
    bgColor: 'bg-success-50 dark:bg-success-900/20',
    textColor: 'text-success-500'
  },
  { 
    id: 'monthly-spend', 
    label: 'dashboard.stats.monthlySpend', 
    value: '$149', 
    icon: <DollarSign className="text-warning-500" />,
    bgColor: 'bg-warning-50 dark:bg-warning-900/20',
    textColor: 'text-warning-500'
  },
];

const recentAgents = [
  { 
    id: 1,
    name: 'Content Writer Pro',
    status: 'active',
    currentTask: 'Writing blog post',
    lastActive: '10 minutes ago',
    image: 'https://images.pexels.com/photos/6956503/pexels-photo-6956503.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  { 
    id: 2,
    name: 'Research Assistant',
    status: 'active',
    currentTask: 'Market research',
    lastActive: '30 minutes ago',
    image: 'https://images.pexels.com/photos/8438951/pexels-photo-8438951.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  { 
    id: 3,
    name: 'Email Manager',
    status: 'idle',
    currentTask: 'None',
    lastActive: '2 hours ago',
    image: 'https://images.pexels.com/photos/8438952/pexels-photo-8438952.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const recentTasks = [
  {
    id: 1,
    title: 'Write a blog post about AI trends',
    agent: 'Content Writer Pro',
    status: 'completed',
    completedAt: '2 hours ago',
  },
  {
    id: 2,
    title: 'Analyze Q3 financial report',
    agent: 'Research Assistant',
    status: 'in-progress',
    startedAt: '30 minutes ago',
  },
  {
    id: 3,
    title: 'Respond to customer inquiries',
    agent: 'Email Manager',
    status: 'queued',
    createdAt: 'Just now',
  },
];

export default function DashboardOverview() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-1">{t('dashboard.welcome')}, John!</h1>
          <p className="text-surface-600 dark:text-surface-400">Here's what's happening with your agents today.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <LinkButton 
            to="/marketplace"
            variant="primary"
            leftIcon={<Bot size={16} />}
          >
            Explore More Agents
          </LinkButton>
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
              <div className="flex items-center mt-1 text-sm">
                <span className="text-success-500 flex items-center">
                  +12%
                  <span className="ml-0.5">↑</span>
                </span>
                <span className="text-surface-500 dark:text-surface-400 ml-2">vs last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent agents */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
          <div className="p-5 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
            <div className="flex items-center">
              <Bot size={18} className="text-primary-500 mr-2" />
              <h2 className="text-lg font-semibold text-surface-900 dark:text-white">{t('dashboard.agents.title')}</h2>
            </div>
            <LinkButton
              to="/dashboard/agents"
              variant="ghost"
              size="sm"
              rightIcon={<ChevronRight size={16} />}
            >
              View all
            </LinkButton>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-50 dark:bg-surface-700/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    {t('dashboard.agents.name')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    {t('dashboard.agents.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider hidden md:table-cell">
                    {t('dashboard.agents.currentTask')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider hidden md:table-cell">
                    {t('dashboard.agents.lastActive')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                    {t('dashboard.agents.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                {recentAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-md overflow-hidden flex-shrink-0">
                          <img src={agent.image} alt={agent.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-surface-900 dark:text-white">{agent.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        agent.status === 'active' 
                          ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                          : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                      }`}>
                        {agent.status === 'active' ? 'Active' : 'Idle'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400 hidden md:table-cell">
                      {agent.currentTask === 'None' ? '-' : agent.currentTask}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-600 dark:text-surface-400 hidden md:table-cell">
                      {agent.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent tasks */}
        <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
          <div className="p-5 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
            <div className="flex items-center">
              <Clock size={18} className="text-secondary-500 mr-2" />
              <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Recent Tasks</h2>
            </div>
            <LinkButton
              to="/dashboard/tasks"
              variant="ghost"
              size="sm"
              rightIcon={<ChevronRight size={16} />}
            >
              View all
            </LinkButton>
          </div>
          
          <div className="p-5 space-y-4">
            {recentTasks.map((task) => (
              <div 
                key={task.id}
                className="p-3 rounded-md hover:bg-surface-50 dark:hover:bg-surface-700/50 border border-surface-200 dark:border-surface-700 transition-colors"
              >
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-surface-900 dark:text-white">{task.title}</h3>
                  <span 
                    className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                      task.status === 'completed' 
                        ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                        : task.status === 'in-progress'
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                        : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                    }`}
                  >
                    {task.status === 'completed' ? 'Completed' : task.status === 'in-progress' ? 'In Progress' : 'Queued'}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center text-xs">
                  <span className="text-surface-600 dark:text-surface-400">Agent: {task.agent}</span>
                  <span className="text-surface-500 dark:text-surface-500">
                    {task.completedAt || task.startedAt || task.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-surface-50 dark:bg-surface-700/50 p-4 border-t border-surface-200 dark:border-surface-700">
            <Button
              variant="outline"
              leftIcon={<Clock size={16} />}
              isFullWidth
            >
              Create New Task
            </Button>
          </div>
        </div>
      </div>
      
      {/* Quick analytics */}
      <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="p-5 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 size={18} className="text-primary-500 mr-2" />
            <h2 className="text-lg font-semibold text-surface-900 dark:text-white">Usage Analytics</h2>
          </div>
          <LinkButton
            to="/dashboard/analytics"
            variant="ghost"
            size="sm"
            rightIcon={<ChevronRight size={16} />}
          >
            Details
          </LinkButton>
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-md">
              <div className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">Daily Tasks</div>
              <div className="text-2xl font-bold text-surface-900 dark:text-white">42</div>
              <div className="mt-2 text-xs text-success-500 flex items-center">
                +18%
                <span className="ml-0.5">↑</span>
                <span className="text-surface-500 dark:text-surface-400 ml-1">vs yesterday</span>
              </div>
            </div>
            
            <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-md">
              <div className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">Weekly Tasks</div>
              <div className="text-2xl font-bold text-surface-900 dark:text-white">283</div>
              <div className="mt-2 text-xs text-success-500 flex items-center">
                +7%
                <span className="ml-0.5">↑</span>
                <span className="text-surface-500 dark:text-surface-400 ml-1">vs last week</span>
              </div>
            </div>
            
            <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-md">
              <div className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">Completion Rate</div>
              <div className="text-2xl font-bold text-surface-900 dark:text-white">94.2%</div>
              <div className="mt-2 text-xs text-success-500 flex items-center">
                +2.1%
                <span className="ml-0.5">↑</span>
                <span className="text-surface-500 dark:text-surface-400 ml-1">vs last month</span>
              </div>
            </div>
            
            <div className="p-4 bg-surface-50 dark:bg-surface-700/50 rounded-md">
              <div className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">Average Response</div>
              <div className="text-2xl font-bold text-surface-900 dark:text-white">1.2m</div>
              <div className="mt-2 text-xs text-error-500 flex items-center">
                +0.3m
                <span className="ml-0.5">↑</span>
                <span className="text-surface-500 dark:text-surface-400 ml-1">slower</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 h-60 flex items-center justify-center bg-surface-50 dark:bg-surface-700/50 rounded-md p-4">
            <div className="text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-surface-400" />
              <h3 className="mt-2 text-sm font-medium text-surface-900 dark:text-white">Detailed Analytics</h3>
              <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">View complete analytics in the Analytics section</p>
              <div className="mt-4">
                <LinkButton
                  to="/dashboard/analytics"
                  variant="outline"
                  size="sm"
                >
                  View Analytics
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
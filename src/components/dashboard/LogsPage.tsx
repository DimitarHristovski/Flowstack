import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Download, Filter, XCircle, CheckCircle, AlertCircle, Layers, RefreshCw, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

type LogType = 'info' | 'error' | 'warning' | 'success';
type LogSource = 'system' | 'agent' | 'task' | 'user';
type SortOrder = 'newest' | 'oldest';

interface Log {
  id: string;
  type: LogType;
  source: LogSource;
  message: string;
  details?: string;
  timestamp: string;
  agent?: string;
  task?: string;
}

export default function LogsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<LogType | 'all'>('all');
  const [sourceFilter, setSourceFilter] = useState<LogSource | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  
  // Mock logs data
  const mockLogs: Log[] = [
    {
      id: '1',
      type: 'info',
      source: 'system',
      message: 'System started successfully',
      details: 'All services initialized and running. Memory usage: 256MB, CPU: 5%',
      timestamp: '2023-10-16T09:00:00Z',
    },
    {
      id: '2',
      type: 'error',
      source: 'agent',
      message: 'Agent failed to access external API',
      details: 'Personal Finance Advisor encountered a timeout while trying to connect to financial data service. Error code: TIMEOUT_ERROR',
      timestamp: '2023-10-16T09:15:00Z',
      agent: 'Personal Finance Advisor',
    },
    {
      id: '3',
      type: 'success',
      source: 'task',
      message: 'Task completed successfully',
      details: 'Blog post about AI trends was created successfully. Word count: 1523, Time taken: 2h 15m',
      timestamp: '2023-10-16T11:45:00Z',
      agent: 'Content Writer Pro',
      task: 'Write a blog post about AI trends',
    },
    {
      id: '4',
      type: 'warning',
      source: 'system',
      message: 'High resource usage detected',
      details: 'System is experiencing high CPU usage (85%). This may affect performance.',
      timestamp: '2023-10-16T12:30:00Z',
    },
    {
      id: '5',
      type: 'info',
      source: 'agent',
      message: 'Agent started new task',
      details: 'Research Assistant started analyzing market data for Q3 report. Estimated completion time: 1h 30m',
      timestamp: '2023-10-16T14:20:00Z',
      agent: 'Research Assistant',
      task: 'Analyze Q3 financial report',
    },
    {
      id: '6',
      type: 'info',
      source: 'user',
      message: 'User updated agent settings',
      details: 'User (john.doe@example.com) updated settings for Email Manager agent. Changed response templates and priority rules.',
      timestamp: '2023-10-16T15:05:00Z',
      agent: 'Email Manager',
    },
    {
      id: '7',
      type: 'warning',
      source: 'task',
      message: 'Task taking longer than expected',
      details: 'The code optimization task is taking longer than the estimated time. Original estimate: 45m, Current duration: 1h 10m',
      timestamp: '2023-10-16T15:30:00Z',
      agent: 'Code Assistant',
      task: 'Optimize landing page code',
    },
    {
      id: '8',
      type: 'success',
      source: 'system',
      message: 'Automatic backup completed',
      details: 'System successfully completed the scheduled daily backup. Backup size: 2.3GB, Duration: 5m',
      timestamp: '2023-10-16T16:00:00Z',
    },
    {
      id: '9',
      type: 'error',
      source: 'task',
      message: 'Task failed to complete',
      details: 'The task failed due to insufficient data. Agent could not access required financial records to complete the analysis.',
      timestamp: '2023-10-16T16:30:00Z',
      agent: 'Personal Finance Advisor',
      task: 'Analyze monthly expenses and suggest budget optimizations',
    },
    {
      id: '10',
      type: 'info',
      source: 'user',
      message: 'User created new task',
      details: 'User (john.doe@example.com) created a new task for Email Manager agent: "Respond to customer inquiries"',
      timestamp: '2023-10-16T16:45:00Z',
      agent: 'Email Manager',
      task: 'Respond to customer inquiries',
    },
  ];
  
  // Toggle log expansion
  const toggleLogExpansion = (logId: string) => {
    const newExpandedLogs = new Set(expandedLogs);
    if (expandedLogs.has(logId)) {
      newExpandedLogs.delete(logId);
    } else {
      newExpandedLogs.add(logId);
    }
    setExpandedLogs(newExpandedLogs);
  };
  
  // Filter logs
  const filteredLogs = mockLogs.filter((log) => {
    // Filter by search query
    if (
      searchQuery &&
      !log.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.details?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by type
    if (typeFilter !== 'all' && log.type !== typeFilter) {
      return false;
    }
    
    // Filter by source
    if (sourceFilter !== 'all' && log.source !== sourceFilter) {
      return false;
    }
    
    return true;
  });
  
  // Sort logs
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    
    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
  
  // Get counts by type
  const logCounts = {
    all: mockLogs.length,
    info: mockLogs.filter(log => log.type === 'info').length,
    error: mockLogs.filter(log => log.type === 'error').length,
    warning: mockLogs.filter(log => log.type === 'warning').length,
    success: mockLogs.filter(log => log.type === 'success').length,
  };
  
  // Helper function for log type icon and color
  const getLogTypeInfo = (type: LogType) => {
    switch (type) {
      case 'info':
        return {
          icon: <Layers size={16} />,
          textColor: 'text-primary-500',
          bgColor: 'bg-primary-100 dark:bg-primary-900/30',
          label: 'Info',
        };
      case 'error':
        return {
          icon: <XCircle size={16} />,
          textColor: 'text-error-500',
          bgColor: 'bg-error-100 dark:bg-error-900/30',
          label: 'Error',
        };
      case 'warning':
        return {
          icon: <AlertCircle size={16} />,
          textColor: 'text-warning-500',
          bgColor: 'bg-warning-100 dark:bg-warning-900/30',
          label: 'Warning',
        };
      case 'success':
        return {
          icon: <CheckCircle size={16} />,
          textColor: 'text-success-500',
          bgColor: 'bg-success-100 dark:bg-success-900/30',
          label: 'Success',
        };
    }
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">System Logs</h1>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="outline"
            leftIcon={<Download size={16} />}
          >
            Export Logs
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
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as LogType | 'all')}
              className="rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 px-3 py-2"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as LogSource | 'all')}
              className="rounded-md border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 px-3 py-2"
            >
              <option value="all">All Sources</option>
              <option value="system">System</option>
              <option value="agent">Agent</option>
              <option value="task">Task</option>
              <option value="user">User</option>
            </select>
            
            <Button
              variant="outline"
              leftIcon={<SlidersHorizontal size={16} />}
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            >
              {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={typeFilter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setTypeFilter('all')}
          >
            All
            <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
              {logCounts.all}
            </span>
          </Button>
          
          <Button
            variant={typeFilter === 'info' ? 'primary' : 'outline'}
            size="sm"
            leftIcon={<Layers size={14} className={typeFilter !== 'info' ? 'text-primary-500' : ''} />}
            onClick={() => setTypeFilter('info')}
          >
            Info
            <span className={`ml-1.5 ${typeFilter === 'info' ? 'bg-white/20' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'} px-1.5 py-0.5 rounded-full text-xs`}>
              {logCounts.info}
            </span>
          </Button>
          
          <Button
            variant={typeFilter === 'success' ? 'primary' : 'outline'}
            size="sm"
            leftIcon={<CheckCircle size={14} className={typeFilter !== 'success' ? 'text-success-500' : ''} />}
            onClick={() => setTypeFilter('success')}
          >
            Success
            <span className={`ml-1.5 ${typeFilter === 'success' ? 'bg-white/20' : 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'} px-1.5 py-0.5 rounded-full text-xs`}>
              {logCounts.success}
            </span>
          </Button>
          
          <Button
            variant={typeFilter === 'warning' ? 'primary' : 'outline'}
            size="sm"
            leftIcon={<AlertCircle size={14} className={typeFilter !== 'warning' ? 'text-warning-500' : ''} />}
            onClick={() => setTypeFilter('warning')}
          >
            Warning
            <span className={`ml-1.5 ${typeFilter === 'warning' ? 'bg-white/20' : 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400'} px-1.5 py-0.5 rounded-full text-xs`}>
              {logCounts.warning}
            </span>
          </Button>
          
          <Button
            variant={typeFilter === 'error' ? 'primary' : 'outline'}
            size="sm"
            leftIcon={<XCircle size={14} className={typeFilter !== 'error' ? 'text-error-500' : ''} />}
            onClick={() => setTypeFilter('error')}
          >
            Error
            <span className={`ml-1.5 ${typeFilter === 'error' ? 'bg-white/20' : 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400'} px-1.5 py-0.5 rounded-full text-xs`}>
              {logCounts.error}
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={() => {
              setTypeFilter('all');
              setSourceFilter('all');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      </div>
      
      {/* Logs list */}
      <div className="space-y-4">
        {sortedLogs.length === 0 ? (
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-8 text-center">
            <Layers size={48} className="mx-auto text-surface-400 mb-4" />
            <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">No logs found</h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              No logs match the current filter criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setTypeFilter('all');
                setSourceFilter('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          sortedLogs.map((log, index) => {
            const typeInfo = getLogTypeInfo(log.type);
            const isExpanded = expandedLogs.has(log.id);
            
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className={cn(
                  "bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden",
                  log.type === 'error' && "border-l-4 border-l-error-500",
                  log.type === 'warning' && "border-l-4 border-l-warning-500",
                  log.type === 'success' && "border-l-4 border-l-success-500",
                  log.type === 'info' && "border-l-4 border-l-primary-500",
                )}
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors"
                  onClick={() => toggleLogExpansion(log.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={cn("p-2 rounded-md", typeInfo.bgColor)}>
                        <span className={typeInfo.textColor}>
                          {typeInfo.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-surface-900 dark:text-white">{log.message}</h3>
                        <div className="mt-1 text-xs text-surface-500 dark:text-surface-400 flex flex-wrap gap-x-4 gap-y-1">
                          <span>
                            {formatTimestamp(log.timestamp)}
                          </span>
                          <span className="capitalize">
                            Source: {log.source}
                          </span>
                          {log.agent && (
                            <span>
                              Agent: {log.agent}
                            </span>
                          )}
                          {log.task && (
                            <span className="truncate max-w-[200px]">
                              Task: {log.task}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLogExpansion(log.id);
                      }}
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                  </div>
                  
                  {isExpanded && log.details && (
                    <div className="mt-4 p-3 bg-surface-50 dark:bg-surface-700/50 rounded text-sm text-surface-700 dark:text-surface-300 whitespace-pre-wrap">
                      {log.details}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
      
      {/* Pagination */}
      {sortedLogs.length > 0 && (
        <div className="flex justify-between items-center bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-4">
          <div className="text-sm text-surface-600 dark:text-surface-400">
            Showing {sortedLogs.length} of {sortedLogs.length} logs
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
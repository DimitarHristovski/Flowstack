import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Agent {
  id: string;
  name: string;
  description: string;
  image: string;
  status: string;
  current_task: string | null;
  last_active: string | null;
  type: string | null;
  performance: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  category?: string;
  apiEndpoint?: string;
  apiMethod?: string;
  apiBody?: Record<string, any>;
  apiHeaders?: Record<string, string>;
  iframeUrl?: string;
}

interface Profile {
  id: string;
  full_name: string | null;
  company: string | null;
  website: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

interface AgentState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  startAgent: (id: string) => Promise<void>;
  stopAgent: (id: string) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  editAgent: (id: string, data: Partial<Agent>) => Promise<void>;
  addAgent: (data: Partial<Agent>) => Promise<void>;
}

interface TaskState {
  tasks: any[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (data: any) => Promise<void>;
  updateTask: (id: string, data: any) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

interface LogState {
  logs: any[];
  loading: boolean;
  error: string | null;
  fetchLogs: () => Promise<void>;
  exportLogs: () => Promise<void>;
  deleteLogs: (ids: string[]) => Promise<void>;
}

interface Subscription {
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'expired';
  currentPeriodEnd: string;
  creditsPerMonth: number;
}

interface CreditsState {
  credits: number;
  subscription: Subscription;
  loading: boolean;
  error: string | null;
  fetchCredits: () => Promise<void>;
  addCredits: (amount: number) => Promise<void>;
  deductCredits: (amount: number) => Promise<void>;
  updateSubscription: (plan: 'free' | 'pro' | 'enterprise') => Promise<void>;
  purchaseCredits: (amount: number, price: number) => Promise<void>;
}

// Helper to generate IDs
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Mock user for authentication
const mockUser = {
  id: 'user-1',
  email: 'demo@example.com',
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      loading: false,
      error: null,
      fetchProfile: async () => {
        set({ loading: true });
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const stored = localStorage.getItem('profile');
          const profile = stored ? JSON.parse(stored) : null;
          
          set({ profile, loading: false, error: null });
        } catch (error: any) {
          set({ error: error?.message || 'Failed to fetch profile', loading: false });
        }
      },
      updateProfile: async (data: Partial<Profile>) => {
        try {
          const stored = localStorage.getItem('profile');
          const current = stored ? JSON.parse(stored) : {
            id: mockUser.id,
            full_name: null,
            company: null,
            website: null,
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          
          const updated = {
            ...current,
            ...data,
            updated_at: new Date().toISOString(),
          };
          
          localStorage.setItem('profile', JSON.stringify(updated));
          
          set((state) => ({
            profile: updated,
            error: null
          }));
        } catch (error) {
          set({ error: 'Failed to update profile' });
        }
      }
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
      login: async (email: string, password: string) => {
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Simple mock authentication - accept any email/password
          set({
            isAuthenticated: true,
            user: { ...mockUser, email },
            error: null,
          });
        } catch (error) {
          set({ error: 'Authentication failed' });
          throw error;
        }
      },
      logout: async () => {
        try {
          set({
            isAuthenticated: false,
            user: null,
            error: null,
          });
        } catch (error) {
          set({ error: 'Logout failed' });
          throw error;
        }
      },
      checkAuth: async () => {
        try {
          // Check localStorage for auth state
          const stored = localStorage.getItem('auth-storage');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.state?.isAuthenticated) {
              set({
                isAuthenticated: true,
                user: parsed.state.user,
                loading: false,
                error: null,
              });
              return;
            }
          }
          
          set({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,
          });
        } catch (error) {
          set({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: 'Authentication check failed',
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAgentStore = create<AgentState>()(
  persist(
    (set, get) => ({
      agents: [],
      loading: false,
      error: null,
      fetchAgents: async () => {
        set({ loading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Get current agents from Zustand state (which includes persisted data)
          let agents = [...(get().agents || [])];
          
          // Initialize with default research agent if it doesn't exist
          const researchAgentId = 'research-agent-default';
          const hasResearchAgent = agents.some((a: Agent) => a.id === researchAgentId);
          
          if (!hasResearchAgent) {
            const defaultResearchAgent: Agent = {
              id: researchAgentId,
              name: 'Company Research Agent',
              description: 'Research and analyze company information, market data, and business insights. Perfect for competitive analysis, market research, and business intelligence.',
              image: 'https://images.pexels.com/photos/5905717/pexels-photo-5905717.jpeg?auto=compress&cs=tinysrgb&w=600',
              status: 'active',
              current_task: null,
              last_active: null,
              type: 'research',
              performance: 0,
              user_id: mockUser.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              category: 'research',
              apiEndpoint: 'https://api-d7b62b.stack.tryrelevance.com/latest/studios/a6376851-b383-4f36-9cf4-a70c12797617/trigger_webhook?project=e07a0393518d-4969-b912-f34c438e50dc',
              apiMethod: 'POST',
              apiBody: { company_url: '' },
              iframeUrl: 'https://app.relevanceai.com/form/d7b62b/6f91f193-bd9c-4ce8-8979-3416a0a67ea2?version=latest'
            };
            agents = [defaultResearchAgent, ...agents];
          }
          
          set({ agents, loading: false, error: null });
        } catch (error: any) {
          set({ error: error?.message || 'Failed to fetch agents', loading: false });
        }
      },
      startAgent: async (id: string) => {
        try {
          set((state) => ({
            agents: state.agents.map(agent =>
              agent.id === id ? { 
                ...agent, 
                status: 'active', 
                last_active: new Date().toISOString() 
              } : agent
            )
          }));
        } catch (error) {
          console.error('Failed to start agent:', error);
          throw error;
        }
      },
      stopAgent: async (id: string) => {
        try {
          set((state) => ({
            agents: state.agents.map(agent =>
              agent.id === id ? { 
                ...agent, 
                status: 'stopped', 
                current_task: null 
              } : agent
            )
          }));
        } catch (error) {
          console.error('Failed to stop agent:', error);
          throw error;
        }
      },
      deleteAgent: async (id: string) => {
        try {
          set((state) => ({
            agents: state.agents.filter(agent => agent.id !== id)
          }));
        } catch (error) {
          console.error('Failed to delete agent:', error);
          throw error;
        }
      },
      editAgent: async (id: string, data: Partial<Agent>) => {
        try {
          set((state) => ({
            agents: state.agents.map(agent =>
              agent.id === id ? { 
                ...agent, 
                ...data, 
                updated_at: new Date().toISOString() 
              } : agent
            )
          }));
        } catch (error) {
          console.error('Failed to edit agent:', error);
          throw error;
        }
      },
      addAgent: async (data: Partial<Agent>) => {
        try {
          const newAgent: Agent = {
            id: generateId(),
            name: data.name || 'Unnamed Agent',
            description: data.description || '',
            image: data.image || '',
            status: 'idle',
            current_task: null,
            last_active: null,
            type: data.type || null,
            performance: 0,
            user_id: mockUser.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...data,
          };
          
          set((state) => ({
            agents: [newAgent, ...state.agents]
          }));
        } catch (error) {
          console.error('Failed to add agent:', error);
          throw error;
        }
      }
    }),
    {
      name: 'agents-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      loading: false,
      error: null,
      fetchTasks: async () => {
        set({ loading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const stored = localStorage.getItem('tasks-storage');
          const parsed = stored ? JSON.parse(stored) : { state: { tasks: [] } };
          
          set({ tasks: parsed.state?.tasks || [], loading: false, error: null });
        } catch (error: any) {
          set({ error: error?.message || 'Failed to fetch tasks', loading: false });
        }
      },
      addTask: async (data: any) => {
        try {
          const newTask = {
            id: generateId(),
            title: data.title || 'Untitled Task',
            description: data.description || '',
            status: data.status || 'pending',
            priority: data.priority || 'medium',
            agent_id: data.agent_id || null,
            user_id: mockUser.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            agents: data.agent_id ? { name: 'Agent' } : null,
            ...data,
          };

          // If an agent is assigned, update the agent's current_task
          if (data.agent_id) {
            const { agents } = useAgentStore.getState();
            const agent = agents.find(a => a.id === data.agent_id);
            if (agent) {
              useAgentStore.getState().editAgent(data.agent_id, {
                current_task: newTask.title,
                status: 'active',
              });
            }
          }

          set((state) => ({
            tasks: [newTask, ...state.tasks]
          }));
        } catch (error) {
          console.error('Failed to add task:', error);
          throw error;
        }
      },
      updateTask: async (id: string, data: any) => {
        try {
          const { tasks } = useTaskStore.getState();
          const currentTask = tasks.find(t => t.id === id);

          // Update the task
          set((state) => ({
            tasks: state.tasks.map(task =>
              task.id === id ? { 
                ...task, 
                ...data, 
                updated_at: new Date().toISOString() 
              } : task
            )
          }));

          // If agent assignment changed, update the agents
          if (currentTask && currentTask.agent_id !== data.agent_id) {
            const { agents } = useAgentStore.getState();
            
            // Clear the previous agent's current_task if there was one
            if (currentTask.agent_id) {
              const prevAgent = agents.find(a => a.id === currentTask.agent_id);
              if (prevAgent) {
                useAgentStore.getState().editAgent(currentTask.agent_id, {
                  current_task: null,
                  status: 'idle',
                });
              }
            }

            // Set the new agent's current_task if there is one
            if (data.agent_id) {
              const newAgent = agents.find(a => a.id === data.agent_id);
              if (newAgent) {
                useAgentStore.getState().editAgent(data.agent_id, {
                  current_task: data.title || currentTask.title,
                  status: 'active',
                });
              }
            }
          }
        } catch (error) {
          console.error('Failed to update task:', error);
          throw error;
        }
      },
      deleteTask: async (id: string) => {
        try {
          const { tasks } = useTaskStore.getState();
          const task = tasks.find(t => t.id === id);

          // If task has an assigned agent, clear its current_task
          if (task?.agent_id) {
            const { agents } = useAgentStore.getState();
            const agent = agents.find(a => a.id === task.agent_id);
            if (agent) {
              useAgentStore.getState().editAgent(task.agent_id, {
                current_task: null,
                status: 'idle',
              });
            }
          }

          set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id)
          }));
        } catch (error) {
          console.error('Failed to delete task:', error);
          throw error;
        }
      },
    }),
    {
      name: 'tasks-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useLogStore = create<LogState>()(
  persist(
    (set) => ({
      logs: [],
      loading: false,
      error: null,
      fetchLogs: async () => {
        set({ loading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const stored = localStorage.getItem('logs-storage');
          const parsed = stored ? JSON.parse(stored) : { state: { logs: [] } };
          
          set({ logs: parsed.state?.logs || [], loading: false, error: null });
        } catch (error: any) {
          set({ error: error?.message || 'Failed to fetch logs', loading: false });
        }
      },
      exportLogs: async () => {
        try {
          const { logs } = useLogStore.getState();
          
          // Create CSV content
          const headers = ['Type', 'Source', 'Message', 'Details', 'Created At'];
          const csvContent = [
            headers.join(','),
            ...logs.map(log => [
              log.type || '',
              log.source || '',
              `"${(log.message || '').replace(/"/g, '""')}"`,
              `"${((log.details || '').toString()).replace(/"/g, '""')}"`,
              log.created_at ? new Date(log.created_at).toISOString() : '',
            ].join(','))
          ].join('\n');
          
          // Create and download file
          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `logs_${new Date().toISOString()}.csv`;
          link.click();
          URL.revokeObjectURL(link.href);
        } catch (error) {
          console.error('Failed to export logs:', error);
          throw error;
        }
      },
      deleteLogs: async (ids: string[]) => {
        try {
          set((state) => ({
            logs: state.logs.filter(log => !ids.includes(log.id))
          }));
        } catch (error) {
          console.error('Failed to delete logs:', error);
          throw error;
        }
      },
    }),
    {
      name: 'logs-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Subscription and Credits Store
const getCreditsForPlan = (plan: 'free' | 'pro' | 'enterprise'): number => {
  switch (plan) {
    case 'free': return 100; // 100 credits per month
    case 'pro': return 1000; // 1,000 credits per month
    case 'enterprise': return 10000; // 10,000 credits per month
    default: return 100;
  }
};

export const useCreditsStore = create<CreditsState>()(
  persist(
    (set, get) => ({
      credits: 0,
      subscription: {
        plan: 'free',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        creditsPerMonth: 100,
      },
      loading: false,
      error: null,
      fetchCredits: async () => {
        set({ loading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 300));
          
          const stored = localStorage.getItem('credits-storage');
          const parsed = stored ? JSON.parse(stored) : { state: { credits: 0, subscription: null } };
          
          const subscription = parsed.state?.subscription || {
            plan: 'free' as const,
            status: 'active' as const,
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            creditsPerMonth: 100,
          };
          
          set({ 
            credits: parsed.state?.credits || getCreditsForPlan(subscription.plan),
            subscription,
            loading: false, 
            error: null 
          });
        } catch (error: any) {
          set({ error: error?.message || 'Failed to fetch credits', loading: false });
        }
      },
      addCredits: async (amount: number) => {
        try {
          const currentCredits = get().credits;
          set({ credits: currentCredits + amount });
        } catch (error) {
          console.error('Failed to add credits:', error);
          throw error;
        }
      },
      deductCredits: async (amount: number) => {
        try {
          const currentCredits = get().credits;
          if (currentCredits < amount) {
            throw new Error('Insufficient credits');
          }
          set({ credits: currentCredits - amount });
        } catch (error) {
          console.error('Failed to deduct credits:', error);
          throw error;
        }
      },
      updateSubscription: async (plan: 'free' | 'pro' | 'enterprise') => {
        try {
          const creditsPerMonth = getCreditsForPlan(plan);
          const subscription: Subscription = {
            plan,
            status: 'active',
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            creditsPerMonth,
          };
          
          // Add monthly credits when subscription is updated
          const currentCredits = get().credits;
          set({ 
            subscription,
            credits: currentCredits + creditsPerMonth 
          });
        } catch (error) {
          console.error('Failed to update subscription:', error);
          throw error;
        }
      },
      purchaseCredits: async (amount: number, price: number) => {
        try {
          // In a real app, this would process payment first
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const currentCredits = get().credits;
          set({ credits: currentCredits + amount });
        } catch (error) {
          console.error('Failed to purchase credits:', error);
          throw error;
        }
      },
    }),
    {
      name: 'credits-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

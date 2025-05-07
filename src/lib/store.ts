import { create } from 'zustand';
import { supabase } from './supabase';

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

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      set({ profile: data, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to fetch profile', loading: false });
    }
  },
  updateProfile: async (data: Partial<Profile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;

      set((state) => ({
        profile: state.profile ? { ...state.profile, ...data } : null,
        error: null
      }));
    } catch (error) {
      set({ error: 'Failed to update profile' });
    }
  }
}));

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      set({
        isAuthenticated: true,
        user: data.user,
        error: null,
      });
    } catch (error) {
      set({ error: 'Authentication failed' });
      throw error;
    }
  },
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
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
      const { data: { session } } = await supabase.auth.getSession();
      set({
        isAuthenticated: !!session,
        user: session?.user || null,
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
}));

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  loading: false,
  error: null,
  fetchAgents: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ agents: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch agents', loading: false });
    }
  },
  startAgent: async (id: string) => {
    try {
      const { error } = await supabase
        .from('agents')
        .update({ status: 'active', last_active: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({
        agents: state.agents.map(agent =>
          agent.id === id ? { ...agent, status: 'active', last_active: new Date().toISOString() } : agent
        )
      }));
    } catch (error) {
      console.error('Failed to start agent:', error);
      throw error;
    }
  },
  stopAgent: async (id: string) => {
    try {
      const { error } = await supabase
        .from('agents')
        .update({ status: 'stopped', current_task: null })
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({
        agents: state.agents.map(agent =>
          agent.id === id ? { ...agent, status: 'stopped', current_task: null } : agent
        )
      }));
    } catch (error) {
      console.error('Failed to stop agent:', error);
      throw error;
    }
  },
  deleteAgent: async (id: string) => {
    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
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
      const { error } = await supabase
        .from('agents')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({
        agents: state.agents.map(agent =>
          agent.id === id ? { ...agent, ...data } : agent
        )
      }));
    } catch (error) {
      console.error('Failed to edit agent:', error);
      throw error;
    }
  },
  addAgent: async (data: Partial<Agent>) => {
    try {
      const { data: newAgent, error } = await supabase
        .from('agents')
        .insert([{ ...data, user_id: (await supabase.auth.getUser()).data.user?.id }])
        .select()
        .single();
      
      if (error) throw error;
      set((state) => ({
        agents: [newAgent, ...state.agents]
      }));
    } catch (error) {
      console.error('Failed to add agent:', error);
      throw error;
    }
  }
}));

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*, agents(name)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ tasks: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', loading: false });
    }
  },
  addTask: async (data: any) => {
    try {
      // Start a transaction by using multiple operations
      const { data: newTask, error: taskError } = await supabase
        .from('tasks')
        .insert([{ ...data, user_id: (await supabase.auth.getUser()).data.user?.id }])
        .select()
        .single();
      
      if (taskError) throw taskError;

      // If an agent is assigned, update the agent's current_task
      if (data.agent_id) {
        const { error: agentError } = await supabase
          .from('agents')
          .update({ current_task: newTask.title, status: 'active' })
          .eq('id', data.agent_id);
        
        if (agentError) throw agentError;
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
      // Get the current task to check if agent assignment changed
      const { data: currentTask } = await supabase
        .from('tasks')
        .select('agent_id')
        .eq('id', id)
        .single();

      // Update the task
      const { error: taskError } = await supabase
        .from('tasks')
        .update(data)
        .eq('id', id);
      
      if (taskError) throw taskError;

      // If agent assignment changed, update the agents
      if (currentTask && currentTask.agent_id !== data.agent_id) {
        // Clear the previous agent's current_task if there was one
        if (currentTask.agent_id) {
          await supabase
            .from('agents')
            .update({ current_task: null, status: 'idle' })
            .eq('id', currentTask.agent_id);
        }

        // Set the new agent's current_task if there is one
        if (data.agent_id) {
          await supabase
            .from('agents')
            .update({ current_task: data.title, status: 'active' })
            .eq('id', data.agent_id);
        }
      }

      // Refresh tasks to get updated data
      const { data: updatedTasks } = await supabase
        .from('tasks')
        .select('*, agents(name)')
        .order('created_at', { ascending: false });

      set({ tasks: updatedTasks || [] });
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  },
  deleteTask: async (id: string) => {
    try {
      // Get the task to check if it has an assigned agent
      const { data: task } = await supabase
        .from('tasks')
        .select('agent_id')
        .eq('id', id)
        .single();

      // If task has an assigned agent, clear its current_task
      if (task?.agent_id) {
        await supabase
          .from('agents')
          .update({ current_task: null, status: 'idle' })
          .eq('id', task.agent_id);
      }

      // Delete the task
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      
      if (error) throw error;

      set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }));
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error;
    }
  },
}));

export const useLogStore = create<LogState>((set) => ({
  logs: [],
  loading: false,
  error: null,
  fetchLogs: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('logs')
        .select('*, agents(name), tasks(title)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ logs: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch logs', loading: false });
    }
  },
  exportLogs: async () => {
    try {
      const { data, error } = await supabase
        .from('logs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Create CSV content
      const headers = ['Type', 'Source', 'Message', 'Details', 'Created At'];
      const csvContent = [
        headers.join(','),
        ...data.map(log => [
          log.type,
          log.source,
          `"${log.message.replace(/"/g, '""')}"`,
          `"${(log.details || '').replace(/"/g, '""')}"`,
          new Date(log.created_at).toISOString(),
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
      const { error } = await supabase
        .from('logs')
        .delete()
        .in('id', ids);
      
      if (error) throw error;
      set((state) => ({
        logs: state.logs.filter(log => !ids.includes(log.id))
      }));
    } catch (error) {
      console.error('Failed to delete logs:', error);
      throw error;
    }
  },
}));
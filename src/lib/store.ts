import { create } from 'zustand';
import { supabase } from './supabase';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

interface AgentState {
  agents: any[];
  loading: boolean;
  error: string | null;
  fetchAgents: () => Promise<void>;
  startAgent: (id: string) => Promise<void>;
  stopAgent: (id: string) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  editAgent: (id: string, data: any) => Promise<void>;
  addAgent: (data: any) => Promise<void>;
}

interface UserProfileState {
  profile: any | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ isAuthenticated: true, user: data.user });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ isAuthenticated: false, user: null });
      window.location.href = '/login'; // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ 
        isAuthenticated: !!session, 
        user: session?.user || null 
      });
    } catch (error) {
      console.error('Auth check error:', error);
      set({ isAuthenticated: false, user: null });
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
        .update({ status: 'active' })
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({
        agents: state.agents.map(agent =>
          agent.id === id ? { ...agent, status: 'active' } : agent
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
        .update({ status: 'stopped' })
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({
        agents: state.agents.map(agent =>
          agent.id === id ? { ...agent, status: 'stopped' } : agent
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
  editAgent: async (id: string, data: any) => {
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
  addAgent: async (data: any) => {
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
  },
}));

export const useProfileStore = create<UserProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // First try to fetch the existing profile
      const { data: profiles, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id);

      if (fetchError) throw fetchError;

      // If no profile exists, create one
      if (!profiles || profiles.length === 0) {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            full_name: '',
            avatar_url: '',
            company: '',
            website: '',
          })
          .select()
          .single();

        if (insertError) throw insertError;
        set({ profile: newProfile, loading: false });
      } else {
        // Use the first profile if one exists
        set({ profile: profiles[0], loading: false });
      }
    } catch (error) {
      console.error('Profile fetch/create error:', error);
      set({ error: 'Failed to fetch profile', loading: false });
    }
  },
  updateProfile: async (data: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, ...data })
        .eq('id', user.id);

      if (error) throw error;
      set((state) => ({ profile: { ...state.profile, ...data } }));
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  },
  updatePassword: async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to update password:', error);
      throw error;
    }
  },
}));
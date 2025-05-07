import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Lock, Bell, Globe, Eye, EyeOff, CheckCircle, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { useProfileStore, useAuthStore } from '../../lib/store';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  
  // Profile state
  const { profile, updateProfile } = useProfileStore();
  const [profileData, setProfileData] = useState({
    full_name: '',
    company: '',
    website: '',
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskCompletions: true,
    agentStatus: true,
    systemUpdates: false,
    marketingEmails: false,
  });

  // Load profile data
  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || '',
        company: profile.company || '',
        website: profile.website || '',
      });
    }
  }, [profile]);

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Handle password update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Here you would typically call your password update function
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update password');
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Handle notification update
  const handleNotificationUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // Here you would typically call your notification settings update function
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Notification preferences updated');
    } catch (error) {
      toast.error('Failed to update notification preferences');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-surface-600 dark:text-surface-400">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings navigation */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-lg font-medium text-surface-900 dark:text-white">Settings</h2>
            </div>
            <div className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full p-2 rounded-md text-left transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                <User size={18} className="mr-3" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`flex items-center w-full p-2 rounded-md text-left transition-colors ${
                  activeTab === 'password'
                    ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                <Lock size={18} className="mr-3" />
                <span>Password</span>
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center w-full p-2 rounded-md text-left transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                <Bell size={18} className="mr-3" />
                <span>Notifications</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Settings content */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 overflow-hidden">
            {/* Profile settings */}
            {activeTab === 'profile' && (
              <>
                <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-surface-900 dark:text-white">Profile Information</h2>
                </div>
                <div className="p-4">
                  <form onSubmit={handleProfileUpdate}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={profileData.full_name}
                          onChange={(e) => setProfileData({...profileData, full_name: e.target.value})}
                          className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                          className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                          className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Language
                        </label>
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-surface-500" />
                          <select
                            id="language"
                            value={i18n.language}
                            onChange={(e) => i18n.changeLanguage(e.target.value)}
                            className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="en">English</option>
                            <option value="de">Deutsch</option>
                            <option value="mk">Македонски</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        type="submit"
                        leftIcon={isUpdating ? undefined : <Save size={16} />}
                        isLoading={isUpdating}
                        loadingText="Saving..."
                      >
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            )}
            
            {/* Password settings */}
            {activeTab === 'password' && (
              <>
                <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                  <h2 className="text-lg font-medium text-surface-900 dark:text-white">Password</h2>
                </div>
                <div className="p-4">
                  <form onSubmit={handlePasswordUpdate}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="current-password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                            className="w-full rounded-md border border-surface-300 dark:border-surface-600 pr-10 pl-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="new-password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            className="w-full rounded-md border border-surface-300 dark:border-surface-600 pr-10 pl-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirm-password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            className="w-full rounded-md border border-surface-300 dark:border-surface-600 pr-10 pl-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        type="submit"
                        leftIcon={isUpdating ? undefined : <Save size={16} />}
                        isLoading={isUpdating}
                        loadingText="Updating..."
                      >
                        {isUpdating ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            )}
            
            {/* Notification settings */}
            {activeTab === 'notifications' && (
              <>
                <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                  <h2 className="text-lg font-medium text-surface-900 dark:text-white">Notifications</h2>
                </div>
                <div className="p-4">
                  <form onSubmit={handleNotificationUpdate}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="text-sm font-medium text-surface-900 dark:text-white">Email Notifications</h3>
                          <p className="text-xs text-surface-500 dark:text-surface-400">
                            Receive email notifications for important events
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.emailNotifications}
                            onChange={() => setNotifications({
                              ...notifications,
                              emailNotifications: !notifications.emailNotifications
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-surface-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer dark:bg-surface-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-surface-600 peer-checked:bg-primary-500"></div>
                        </label>
                      </div>
                      
                      <hr className="border-surface-200 dark:border-surface-700" />
                      
                      <div className="pl-2 space-y-3">
                        <div className="flex items-center justify-between py-1">
                          <label htmlFor="task-completion" className="text-sm text-surface-700 dark:text-surface-300">
                            Task completions
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="task-completion"
                              checked={notifications.taskCompletions}
                              onChange={() => setNotifications({
                                ...notifications,
                                taskCompletions: !notifications.taskCompletions
                              })}
                              className="sr-only peer"
                              disabled={!notifications.emailNotifications}
                            />
                            <div className={`w-9 h-5 ${notifications.emailNotifications ? 'bg-surface-300 dark:bg-surface-600 peer-checked:bg-primary-500' : 'bg-surface-200 dark:bg-surface-700'} peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-surface-600`}></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-1">
                          <label htmlFor="agent-status" className="text-sm text-surface-700 dark:text-surface-300">
                            Agent status changes
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="agent-status"
                              checked={notifications.agentStatus}
                              onChange={() => setNotifications({
                                ...notifications,
                                agentStatus: !notifications.agentStatus
                              })}
                              className="sr-only peer"
                              disabled={!notifications.emailNotifications}
                            />
                            <div className={`w-9 h-5 ${notifications.emailNotifications ? 'bg-surface-300 dark:bg-surface-600 peer-checked:bg-primary-500' : 'bg-surface-200 dark:bg-surface-700'} peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-surface-600`}></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-1">
                          <label htmlFor="system-updates" className="text-sm text-surface-700 dark:text-surface-300">
                            System updates
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="system-updates"
                              checked={notifications.systemUpdates}
                              onChange={() => setNotifications({
                                ...notifications,
                                systemUpdates: !notifications.systemUpdates
                              })}
                              className="sr-only peer"
                              disabled={!notifications.emailNotifications}
                            />
                            <div className={`w-9 h-5 ${notifications.emailNotifications ? 'bg-surface-300 dark:bg-surface-600 peer-checked:bg-primary-500' : 'bg-surface-200 dark:bg-surface-700'} peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-surface-600`}></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between py-1">
                          <label htmlFor="marketing" className="text-sm text-surface-700 dark:text-surface-300">
                            Marketing communications
                          </label>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              id="marketing"
                              checked={notifications.marketingEmails}
                              onChange={() => setNotifications({
                                ...notifications,
                                marketingEmails: !notifications.marketingEmails
                              })}
                              className="sr-only peer"
                              disabled={!notifications.emailNotifications}
                            />
                            <div className={`w-9 h-5 ${notifications.emailNotifications ? 'bg-surface-300 dark:bg-surface-600 peer-checked:bg-primary-500' : 'bg-surface-200 dark:bg-surface-700'} peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-surface-600`}></div>
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        type="submit"
                        leftIcon={isUpdating ? undefined : <Save size={16} />}
                        isLoading={isUpdating}
                        loadingText="Saving..."
                      >
                        {isUpdating ? 'Saving...' : 'Save Preferences'}
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
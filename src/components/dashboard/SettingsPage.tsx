import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Lock, CreditCard, Bell, Globe, Eye, EyeOff, CheckCircle, Save } from 'lucide-react';
import { Button } from '../ui/Button';

// Mock settings data
interface UserProfile {
  name: string;
  email: string;
  company: string;
  timeZone: string;
  language: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  taskCompletions: boolean;
  agentStatus: boolean;
  systemUpdates: boolean;
  marketingEmails: boolean;
}

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  
  // Mock user profile data
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Acme Inc.',
    timeZone: 'America/New_York',
    language: i18n.language,
  });
  
  // Mock notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    taskCompletions: true,
    agentStatus: true,
    systemUpdates: false,
    marketingEmails: false,
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }, 1000);
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
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
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
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
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
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                }`}
              >
                <Bell size={18} className="mr-3" />
                <span>Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`flex items-center w-full p-2 rounded-md text-left transition-colors ${
                  activeTab === 'billing'
                    ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                <span>Billing</span>
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
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
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
                          value={profile.company}
                          onChange={(e) => setProfile({...profile, company: e.target.value})}
                          className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Time Zone
                        </label>
                        <select
                          id="timezone"
                          value={profile.timeZone}
                          onChange={(e) => setProfile({...profile, timeZone: e.target.value})}
                          className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="America/New_York">Eastern Time (US & Canada)</option>
                          <option value="America/Chicago">Central Time (US & Canada)</option>
                          <option value="America/Denver">Mountain Time (US & Canada)</option>
                          <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                          <option value="Europe/London">London</option>
                          <option value="Europe/Paris">Paris</option>
                          <option value="Europe/Berlin">Berlin</option>
                          <option value="Europe/Athens">Athens</option>
                          <option value="Asia/Tokyo">Tokyo</option>
                          <option value="Asia/Shanghai">Shanghai</option>
                          <option value="Australia/Sydney">Sydney</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Language
                        </label>
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-surface-500" />
                          <select
                            id="language"
                            value={profile.language}
                            onChange={(e) => {
                              setProfile({...profile, language: e.target.value});
                              i18n.changeLanguage(e.target.value);
                            }}
                            className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-3 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="en">English</option>
                            <option value="de">Deutsch</option>
                            <option value="mk">Македонски</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center">
                      <Button
                        type="submit"
                        leftIcon={isUpdating ? undefined : <Save size={16} />}
                        isLoading={isUpdating}
                        loadingText="Saving..."
                      >
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                      </Button>
                      
                      {updateSuccess && (
                        <div className="ml-4 text-success-500 flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          <span>Profile updated successfully!</span>
                        </div>
                      )}
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
                    
                    <div className="mt-6 flex items-center">
                      <Button
                        type="submit"
                        leftIcon={isUpdating ? undefined : <Save size={16} />}
                        isLoading={isUpdating}
                        loadingText="Updating..."
                      >
                        {isUpdating ? 'Updating...' : 'Update Password'}
                      </Button>
                      
                      {updateSuccess && (
                        <div className="ml-4 text-success-500 flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          <span>Password updated successfully!</span>
                        </div>
                      )}
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
                    
                    <div className="mt-6 flex items-center">
                      <Button
                        type="submit"
                        leftIcon={isUpdating ? undefined : <Save size={16} />}
                        isLoading={isUpdating}
                        loadingText="Saving..."
                      >
                        {isUpdating ? 'Saving...' : 'Save Preferences'}
                      </Button>
                      
                      {updateSuccess && (
                        <div className="ml-4 text-success-500 flex items-center">
                          <CheckCircle size={16} className="mr-1" />
                          <span>Notification preferences updated!</span>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </>
            )}
            
            {/* Billing settings */}
            {activeTab === 'billing' && (
              <>
                <div className="p-4 border-b border-surface-200 dark:border-surface-700">
                  <h2 className="text-lg font-medium text-surface-900 dark:text-white">Billing & Subscription</h2>
                </div>
                <div className="p-4">
                  <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4 border border-primary-100 dark:border-primary-800 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-surface-900 dark:text-white">Pro Plan</h3>
                        <p className="text-surface-600 dark:text-surface-400 text-sm">
                          $29/month • Renews on October 12, 2025
                        </p>
                      </div>
                      <Button variant="outline">
                        Manage Subscription
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-md font-medium text-surface-900 dark:text-white mb-3">Payment Method</h3>
                      <div className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-16 bg-surface-100 dark:bg-surface-700 rounded-md flex items-center justify-center mr-3">
                              <span className="text-surface-700 dark:text-surface-300 font-medium">VISA</span>
                            </div>
                            <div>
                              <p className="text-surface-900 dark:text-white font-medium">•••• •••• •••• 4242</p>
                              <p className="text-surface-500 dark:text-surface-400 text-sm">Expires 12/2025</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-md font-medium text-surface-900 dark:text-white mb-3">Billing History</h3>
                      <div className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-surface-200 dark:divide-surface-700">
                          <thead className="bg-surface-50 dark:bg-surface-800">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                                Description
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                                Receipt
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-surface-800 divide-y divide-surface-200 dark:divide-surface-700">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                                Sep 12, 2025
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                                Pro Plan - Monthly
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                                $29.00
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button variant="ghost" size="sm">
                                  Download
                                </Button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                                Aug 12, 2025
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                                Pro Plan - Monthly
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                                $29.00
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button variant="ghost" size="sm">
                                  Download
                                </Button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                                Jul 12, 2025
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                                Pro Plan - Monthly
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-surface-900 dark:text-white">
                                $29.00
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button variant="ghost" size="sm">
                                  Download
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
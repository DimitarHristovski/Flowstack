import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  PackageSearch,
  ListChecks,
  BarChart2,
  Settings,
  CreditCard,
  Users,
  LogOut,
  PlusCircle,
  Menu,
  X,
  Bot,
  Search,
  Bell,
  ChevronDown,
  User,
  AlertCircle,
  Folder,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/Button";
import { useAuthStore, useProfileStore } from "../lib/store";
import { toast } from "sonner";

// Dashboard components
import DashboardOverview from "../components/dashboard/DashboardOverview";
import MyAgentsPage from "../components/dashboard/MyAgentsPage";
import TasksPage from "../components/dashboard/TasksPage";
import LogsPage from "../components/dashboard/LogsPage";
import SettingsPage from "../components/dashboard/SettingsPage";

export default function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const { logout, user } = useAuthStore();
  const { profile, fetchProfile } = useProfileStore();

  // Update page title
  useEffect(() => {
    document.title = `${t("dashboard.overview.title")} | FlowStack`;
  }, [t]);

  // Fetch user profile
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const sidebarLinks = [
    {
      to: "/dashboard",
      icon: <Home size={20} />,
      label: t("nav.dashboard"),
      exact: true,
    },
    {
      to: "/dashboard/agents",
      icon: <Bot size={20} />,
      label: t("dashboard.agents.title"),
    },
    { to: "/dashboard/tasks", icon: <ListChecks size={20} />, label: "Tasks" },
    { to: "/dashboard/logs", icon: <Folder size={20} />, label: "Logs" },
    {
      to: "/dashboard/settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
  ];

  return (
    <div className="h-screen flex flex-col pt-16">
      {/* Dashboard header */}
      <div className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden mr-3 p-1 rounded-md text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-700"
          >
            <Menu size={24} />
          </button>

          <div className="relative max-w-md w-full hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400"
              size={18}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsUserMenuOpen(false);
              }}
              className="p-2 rounded-md text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-700 relative"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {/*}  <span className="absolute top-1 right-1 w-4 h-4 bg-error-500 text-white text-xs flex items-center justify-center rounded-full">
                3
            </span>*/}
            </button>

            {/*   {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-surface-800 rounded-md shadow-lg border border-surface-200 dark:border-surface-700 z-10">
                <div className="p-3 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
                  <h3 className="font-medium text-surface-900 dark:text-white">
                    Notifications
                  </h3>
                  <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full">
                    3 new
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700 cursor-pointer">
                    <div className="flex items-start">
                      <div className="rounded-full bg-primary-100 dark:bg-primary-900/40 p-2 mr-3">
                        <Bot size={16} className="text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm text-surface-900 dark:text-white font-medium">
                          New agent available
                        </p>
                        <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                          Content Writer Pro now supports multiple languages
                        </p>
                        <p className="text-xs text-surface-400 dark:text-surface-500 mt-1">
                          10 minutes ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
         )}*/}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center space-x-2 p-2 rounded-md text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-700"
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-500 font-medium">
                {profile?.full_name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join("") || "U"}
              </div>
              <span className="hidden md:block text-sm text-surface-900 dark:text-white font-medium">
                {profile?.full_name || "User"}
              </span>
              <ChevronDown size={16} className="hidden md:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-800 rounded-md shadow-lg border border-surface-200 dark:border-surface-700 z-10">
                <div className="p-3 border-b border-surface-200 dark:border-surface-700">
                  <div className="font-medium text-surface-900 dark:text-white">
                    {profile?.full_name || "User"}
                  </div>
                  <div className="text-sm text-surface-500 dark:text-surface-400">
                    {user?.email}
                  </div>
                </div>
                <div className="p-2">
                  <NavLink
                    to="/dashboard/settings"
                    className="flex items-center w-full text-left px-3 py-2 text-sm rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-2 text-sm rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-64 border-r border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 overflow-y-auto">
          <div className="p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-md font-medium transition-colors",
                    isActive
                      ? "bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400"
                      : "hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white"
                  )
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </aside>
        {/* Mobile sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 bg-surface-900/50 backdrop-blur-sm z-50 flex lg:hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-64 bg-white dark:bg-surface-800 h-full overflow-y-auto"
            >
              <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
                <h3 className="font-medium text-surface-900 dark:text-white">
                  Menu
                </h3>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 space-y-1">
                {sidebarLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.exact}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-md font-medium transition-colors",
                        isActive
                          ? "bg-primary-50 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400"
                          : "hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white"
                      )
                    }
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>

            <div
              className="flex-grow"
              onClick={() => setIsMobileSidebarOpen(false)}
            ></div>
          </div>
        )}
        FlowStack
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-surface-100 dark:bg-surface-900 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/agents" element={<MyAgentsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

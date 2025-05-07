import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sign Up | AgentHub';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-50 dark:bg-surface-900">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-white dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary-500" />
          </div>
          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
            Registration Closed
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            This is a private marketplace. Only authorized administrators can create and sell agents.
          </p>
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
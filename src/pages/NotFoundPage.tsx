import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { LinkButton } from "../components/ui/Button";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found | FlowStack";
  }, []);

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-primary-500 mb-8">404</h1>
        <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <LinkButton to="/" leftIcon={<Home size={18} />}>
            Back to Home
          </LinkButton>
          <LinkButton
            to="#"
            variant="outline"
            leftIcon={<ArrowLeft size={18} />}
            onClick={() => window.history.back()}
          >
            Go Back
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

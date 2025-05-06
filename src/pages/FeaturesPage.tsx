import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, Settings, Bot, Brain, Code, MessageSquare } from 'lucide-react';

export default function FeaturesPage() {
  useEffect(() => {
    document.title = 'Features | AgentHub';
  }, []);

  const features = [
    {
      icon: <Bot className="w-8 h-8 text-primary-500" />,
      title: "Intelligent AI Agents",
      description: "Access a marketplace of specialized AI agents designed to handle specific tasks and workflows.",
    },
    {
      icon: <Brain className="w-8 h-8 text-primary-500" />,
      title: "Advanced Learning",
      description: "Our agents continuously learn and adapt to your specific needs and preferences.",
    },
    {
      icon: <Code className="w-8 h-8 text-primary-500" />,
      title: "API Integration",
      description: "Easily integrate our agents with your existing tools and workflows through our robust API.",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary-500" />,
      title: "Natural Communication",
      description: "Interact with agents using natural language in multiple supported languages.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-500" />,
      title: "Enterprise Security",
      description: "Bank-grade security and encryption to protect your sensitive data and communications.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary-500" />,
      title: "Analytics & Insights",
      description: "Detailed analytics and reporting to track agent performance and optimize workflows.",
    },
    {
      icon: <Settings className="w-8 h-8 text-primary-500" />,
      title: "Customization",
      description: "Tailor agents to your specific needs with custom training and configuration options.",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-500" />,
      title: "Real-time Processing",
      description: "Get instant responses and real-time processing for time-sensitive tasks.",
    },
  ];

  return (
    <div className="bg-surface-50 dark:bg-surface-900 min-h-screen pt-20">
      {/* Hero section */}
      <div className="bg-surface-900 dark:bg-surface-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Powerful Features for Modern Workflows
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-surface-300 max-w-3xl mx-auto"
            >
              Discover how our AI agents can transform your productivity and streamline your work processes.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-600 dark:bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-primary-100 mb-8">
            Join thousands of users already boosting their productivity with our AI agents.
          </p>
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
            Try for Free
          </button>
        </div>
      </div>
    </div>
  );
}
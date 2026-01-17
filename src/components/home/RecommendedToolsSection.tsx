import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Zap, Brain, MessageSquare } from 'lucide-react';

interface Tool {
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  popular?: boolean;
}

export default function RecommendedToolsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const tools: Tool[] = [
    {
      name: 'ChatGPT',
      description: 'Advanced conversational AI by OpenAI for chat, coding, analysis, and more',
      category: 'Conversational AI',
      url: 'https://chat.openai.com',
      icon: '💬',
      popular: true,
    },
    {
      name: 'Grok',
      description: 'xAI\'s AI assistant with real-time knowledge and witty personality',
      category: 'Conversational AI',
      url: 'https://x.ai',
      icon: '🤖',
      popular: true,
    },
    {
      name: 'Perplexity',
      description: 'AI-powered search engine that provides accurate answers with citations',
      category: 'Research & Search',
      url: 'https://www.perplexity.ai',
      icon: '🔍',
      popular: true,
    },
    {
      name: 'Claude',
      description: 'Anthropic\'s AI assistant focused on helpfulness and safety',
      category: 'Conversational AI',
      url: 'https://claude.ai',
      icon: '🧠',
    },
    {
      name: 'Midjourney',
      description: 'AI image generation tool for creating stunning artwork and visuals',
      category: 'Creative',
      url: 'https://www.midjourney.com',
      icon: '🎨',
    },
    {
      name: 'Stable Diffusion',
      description: 'Open-source AI image generation with extensive customization',
      category: 'Creative',
      url: 'https://stability.ai',
      icon: '🖼️',
    },
    {
      name: 'GitHub Copilot',
      description: 'AI pair programmer that helps you write code faster',
      category: 'Development',
      url: 'https://github.com/features/copilot',
      icon: '💻',
    },
    {
      name: 'Notion AI',
      description: 'AI writing assistant integrated into Notion workspace',
      category: 'Productivity',
      url: 'https://www.notion.so/product/ai',
      icon: '📝',
    },
    {
      name: 'Jasper',
      description: 'AI content creation platform for marketing and copywriting',
      category: 'Marketing',
      url: 'https://www.jasper.ai',
      icon: '✍️',
    },
    {
      name: 'Runway ML',
      description: 'AI video and image editing tools for creative professionals',
      category: 'Creative',
      url: 'https://runwayml.com',
      icon: '🎬',
    },
    {
      name: 'ElevenLabs',
      description: 'AI voice synthesis and text-to-speech with natural voices',
      category: 'Audio',
      url: 'https://elevenlabs.io',
      icon: '🎤',
    },
    {
      name: 'Character.AI',
      description: 'Chat with AI characters, historical figures, and fictional personalities',
      category: 'Entertainment',
      url: 'https://character.ai',
      icon: '👤',
    },
  ];

  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <section className="py-20 bg-gradient-to-b from-white to-surface-50 dark:from-surface-800 dark:to-surface-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-full px-4 py-2"
          >
            <Sparkles className="w-4 h-4 text-primary-500 mr-2" />
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              Recommended Tools
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4"
          >
            Essential AI Tools & Resources
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-3xl mx-auto"
          >
            Discover the best AI tools and platforms to supercharge your workflow. 
            From conversational AI to creative tools, find everything you need in one place.
          </motion.p>
        </div>

        {/* Popular Tools First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-6 flex items-center">
            <Zap className="w-5 h-5 text-primary-500 mr-2" />
            Most Popular
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools
              .filter(tool => tool.popular)
              .map((tool, index) => (
                <motion.a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group bg-white dark:bg-surface-800 rounded-xl p-6 border-2 border-surface-200 dark:border-surface-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all shadow-md hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{tool.icon}</span>
                      <div>
                        <h4 className="text-lg font-semibold text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors">
                          {tool.name}
                        </h4>
                        <span className="text-xs text-primary-500 font-medium">{tool.category}</span>
                      </div>
                    </div>
                    <ExternalLink size={18} className="text-surface-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                  <p className="text-surface-600 dark:text-surface-400 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex items-center text-xs text-primary-500 font-medium">
                    <span>Visit Tool</span>
                    <ExternalLink size={12} className="ml-1" />
                  </div>
                </motion.a>
              ))}
          </div>
        </motion.div>

        {/* All Tools by Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-6 flex items-center">
            <Brain className="w-5 h-5 text-primary-500 mr-2" />
            All Tools by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools
              .filter(tool => !tool.popular)
              .map((tool, index) => (
                <motion.a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                  className="group bg-white dark:bg-surface-800 rounded-lg p-5 border border-surface-200 dark:border-surface-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all shadow-sm hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <ExternalLink size={16} className="text-surface-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                  <h4 className="text-base font-semibold text-surface-900 dark:text-white group-hover:text-primary-500 transition-colors mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mb-2">{tool.category}</p>
                  <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2">
                    {tool.description}
                  </p>
                </motion.a>
              ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
            <MessageSquare className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
              Your One-Stop AI Resource Hub
            </h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6 max-w-2xl mx-auto">
              Explore our curated marketplace of AI agents and discover the best tools to enhance your productivity. 
              Everything AI-related, all in one place.
            </p>
            <a
              href="/marketplace"
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Browse Agents
              <ExternalLink className="ml-2" size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";

// Mock blog post data - in a real app, this would come from an API
const blogPosts = {
  "future-of-ai-agents": {
    title: "The Future of AI Agents in Enterprise Automation",
    content: `
      <p>Artificial Intelligence (AI) agents are revolutionizing how enterprises handle automation. As we look towards the future, these intelligent assistants are becoming increasingly sophisticated, capable of handling complex tasks that once required human intervention.</p>

      <h2>The Current State of AI Agents</h2>
      <p>Today's AI agents are already transforming various aspects of business operations:</p>
      <ul>
        <li>Customer Service: 24/7 support with human-like interactions</li>
        <li>Data Analysis: Real-time processing and insights generation</li>
        <li>Process Automation: Streamlining repetitive tasks</li>
      </ul>

      <h2>Emerging Trends</h2>
      <p>Several key trends are shaping the future of AI agents in enterprise settings:</p>
      <ol>
        <li>Enhanced Natural Language Processing</li>
        <li>Multi-agent Collaboration</li>
        <li>Contextual Learning</li>
        <li>Emotional Intelligence</li>
      </ol>

      <h2>Looking Ahead</h2>
      <p>The future of AI agents looks promising, with advancements in machine learning and natural language processing paving the way for more sophisticated applications. As these technologies continue to evolve, we can expect to see AI agents taking on increasingly complex roles in enterprise automation.</p>
    `,
    author: "Sarah Johnson",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "AI Trends",
    image:
      "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260",
  },
  "5-ways-ai-customer-service": {
    title: "5 Ways AI Agents Are Revolutionizing Customer Service",
    content: `
      <p>Customer service is undergoing a dramatic transformation thanks to AI agents. Here are five key ways these intelligent assistants are changing the game.</p>

      <h2>1. 24/7 Availability</h2>
      <p>AI agents never sleep, ensuring customers can get help whenever they need it.</p>

      <h2>2. Instant Response Times</h2>
      <p>Unlike human agents, AI can respond to multiple queries simultaneously with no wait times.</p>

      <h2>3. Consistent Service Quality</h2>
      <p>AI agents deliver the same high-quality service regardless of time or workload.</p>

      <h2>4. Multilingual Support</h2>
      <p>Language barriers are eliminated with AI agents that can communicate in multiple languages.</p>

      <h2>5. Predictive Assistance</h2>
      <p>AI can anticipate customer needs based on behavior patterns and historical data.</p>
    `,
    author: "Michael Chen",
    date: "March 10, 2025",
    readTime: "6 min read",
    category: "Customer Service",
    image:
      "https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=1260",
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts[slug as keyof typeof blogPosts];

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | FlowStack Blog`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-surface-50 dark:bg-surface-900 pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 pt-20">
      {/* Hero section */}
      <div className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-surface-900/60"></div>
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center text-surface-200 hover:text-white mb-6"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Link>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-surface-200 text-sm">
                <Calendar size={16} className="mr-2" />
                {post.date}
                <Clock size={16} className="ml-4 mr-2" />
                {post.readTime}
                <span className="ml-4 bg-primary-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="bg-white dark:bg-surface-800 rounded-xl p-8 shadow-sm">
          {/* Author info */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-surface-200 dark:border-surface-700">
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center text-primary-500 font-medium">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
              <div>
                <div className="font-medium text-surface-900 dark:text-white">
                  {post.author}
                </div>
                <div className="text-sm text-surface-500 dark:text-surface-400">
                  Author
                </div>
              </div>
            </div>
            <button className="p-2 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300">
              <Share2 size={20} />
            </button>
          </div>

          {/* Article content */}
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </motion.div>
    </div>
  );
}

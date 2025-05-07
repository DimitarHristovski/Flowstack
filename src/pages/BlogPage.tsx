import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPage() {
  useEffect(() => {
    document.title = "Blog | FlowStack";
  }, []);

  const featuredPost = {
    slug: "future-of-ai-agents",
    title: "The Future of AI Agents in Enterprise Automation",
    excerpt:
      "Discover how AI agents are transforming enterprise workflows and what the future holds for business automation.",
    image:
      "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "AI Trends",
  };

  const posts = [
    {
      slug: "5-ways-ai-customer-service",
      title: "5 Ways AI Agents Are Revolutionizing Customer Service",
      excerpt:
        "Learn how businesses are using AI agents to provide 24/7 customer support and improve satisfaction rates.",
      image:
        "https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "March 10, 2025",
      readTime: "6 min read",
      category: "Customer Service",
    },
    {
      slug: "building-custom-ai-agents",
      title: "Building Custom AI Agents: A Complete Guide",
      excerpt:
        "Step-by-step guide to creating and training custom AI agents for your specific business needs.",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "March 5, 2025",
      readTime: "12 min read",
      category: "Development",
    },
    {
      slug: "ai-agent-security",
      title: "AI Agent Security: Best Practices and Guidelines",
      excerpt:
        "Essential security measures and guidelines for implementing AI agents in your organization.",
      image:
        "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "March 1, 2025",
      readTime: "10 min read",
      category: "Security",
    },
    {
      slug: "roi-of-ai-agents",
      title: "The ROI of AI Agents: A Case Study",
      excerpt:
        "Real-world examples of how companies are achieving ROI with AI agent implementation.",
      image:
        "https://images.pexels.com/photos/7567473/pexels-photo-7567473.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "February 25, 2025",
      readTime: "7 min read",
      category: "Business",
    },
    {
      slug: "ai-agents-vs-traditional",
      title: "AI Agents vs Traditional Automation: What's the Difference?",
      excerpt:
        "Understanding the key differences between AI agents and traditional automation solutions.",
      image:
        "https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "February 20, 2025",
      readTime: "5 min read",
      category: "Technology",
    },
    {
      slug: "ethics-of-ai-agents",
      title: "The Ethics of AI Agents in the Workplace",
      excerpt:
        "Exploring the ethical considerations of implementing AI agents in workplace environments.",
      image:
        "https://images.pexels.com/photos/8386464/pexels-photo-8386464.jpeg?auto=compress&cs=tinysrgb&w=600",
      date: "February 15, 2025",
      readTime: "9 min read",
      category: "Ethics",
    },
  ];

  return (
    <div className="bg-surface-50 dark:bg-surface-900 min-h-screen pt-20">
      {/* Featured post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-sm"
        >
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="relative aspect-[16/9] md:aspect-auto">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
                Featured Post
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-surface-600 dark:text-surface-400 mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center text-sm text-surface-500 dark:text-surface-400 mb-6">
                <Calendar size={16} className="mr-2" />
                {featuredPost.date}
                <Clock size={16} className="ml-4 mr-2" />
                {featuredPost.readTime}
              </div>
              <div className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300">
                Read More
                <ChevronRight size={16} className="ml-2" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Blog posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/9]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                    {post.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                      <Calendar size={16} className="mr-2" />
                      {post.date}
                    </div>
                    <div className="flex items-center text-sm text-surface-500 dark:text-surface-400">
                      <Clock size={16} className="mr-2" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

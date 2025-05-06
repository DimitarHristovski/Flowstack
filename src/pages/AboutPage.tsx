import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | AgentHub';
  }, []);

  const stats = [
    { label: 'Active Users', value: '50,000+' },
    { label: 'AI Agents', value: '1,000+' },
    { label: 'Countries', value: '150+' },
    { label: 'Tasks Completed', value: '10M+' },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-founder',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-founder',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of AI Research',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
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
              Our Mission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-surface-300 max-w-3xl mx-auto"
            >
              We're on a mission to democratize AI and empower everyone to achieve more through intelligent automation.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.value}
              </div>
              <div className="text-surface-600 dark:text-surface-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values section */}
      <div className="bg-white dark:bg-surface-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              These core values guide everything we do at AgentHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full p-4 inline-block mb-4">
                <Users className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">User First</h3>
              <p className="text-surface-600 dark:text-surface-400">
                We put our users at the center of everything we build.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full p-4 inline-block mb-4">
                <Target className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">Innovation</h3>
              <p className="text-surface-600 dark:text-surface-400">
                We constantly push the boundaries of what's possible.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full p-4 inline-block mb-4">
                <Award className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">Excellence</h3>
              <p className="text-surface-600 dark:text-surface-400">
                We strive for excellence in everything we do.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full p-4 inline-block mb-4">
                <Globe className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">Global Impact</h3>
              <p className="text-surface-600 dark:text-surface-400">
                We're building solutions for everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">Our Team</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Meet the people behind AgentHub who are working to make AI accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
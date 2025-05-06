import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Users, Briefcase } from 'lucide-react';

export default function CareersPage() {
  useEffect(() => {
    document.title = 'Careers | AgentHub';
  }, []);

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-primary-500" />,
      title: "Competitive Salary",
      description: "We offer top-market compensation packages including equity options.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary-500" />,
      title: "Remote-First Culture",
      description: "Work from anywhere in the world with our distributed team.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-primary-500" />,
      title: "Learning Budget",
      description: "Annual budget for courses, conferences, and professional development.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary-500" />,
      title: "Flexible Hours",
      description: "Work when you're most productive with flexible scheduling.",
    },
  ];

  const openings = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Technical Writer",
      department: "Documentation",
      location: "Remote",
      type: "Contract",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
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
              Join Our Team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-surface-300 max-w-3xl mx-auto"
            >
              Help us shape the future of AI and make a meaningful impact on how people work.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
            Why Join AgentHub?
          </h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            We offer a range of benefits to help you do your best work and live your best life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-surface-800 rounded-xl p-6 text-center"
            >
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full p-4 inline-block mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open positions */}
      <div className="bg-white dark:bg-surface-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Find your next role at AgentHub and help us build the future of work.
            </p>
          </div>

          <div className="grid gap-4">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface-50 dark:bg-surface-900 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              >
                <div>
                  <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-surface-600 dark:text-surface-400">
                    <span className="flex items-center">
                      <Briefcase size={16} className="mr-2" />
                      {job.department}
                    </span>
                    <span className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Users size={16} className="mr-2" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
          Don't see the right role?
        </h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-2xl mx-auto">
          We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
        </p>
        <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg transition-colors">
          Send Resume
        </button>
      </div>
    </div>
  );
}
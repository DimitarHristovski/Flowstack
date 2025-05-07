import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | FlowStack";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      // Show success message
    }, 1500);
  };

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
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-surface-300 max-w-3xl mx-auto"
            >
              Have questions? We're here to help and would love to hear from
              you.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 text-center"
          >
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full p-4 inline-block mb-4">
              <Mail className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
              Email Us
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              contact@FlowStack.ai
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 text-center"
          >
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full p-4 inline-block mb-4">
              <Phone className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
              Call Us
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              +1 (555) 123-4567
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-surface-800 rounded-xl p-6 text-center"
          >
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full p-4 inline-block mb-4">
              <MapPin className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
              Visit Us
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              123 AI Street, Tech City, TC 12345
            </p>
          </motion.div>
        </div>

        {/* Contact form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-surface-800 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-6 h-6 text-primary-500 mr-3" />
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                Send us a Message
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-4 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-4 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-4 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full rounded-md border border-surface-300 dark:border-surface-600 px-4 py-2 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-white dark:bg-surface-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-surface-600 dark:text-surface-400">
              Find quick answers to common questions about our services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-surface-50 dark:bg-surface-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                What types of AI agents do you offer?
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                We offer a wide range of AI agents specialized in different
                tasks, from content creation to data analysis. Visit our
                marketplace to explore the full range of available agents.
              </p>
            </div>

            <div className="bg-surface-50 dark:bg-surface-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                How do I get started with FlowStack?
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                Getting started is easy! Simply sign up for an account, browse
                our marketplace, and choose the agents that best fit your needs.
                We offer a free tier to help you get started.
              </p>
            </div>

            <div className="bg-surface-50 dark:bg-surface-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                What support options are available?
              </h3>
              <p className="text-surface-600 dark:text-surface-400">
                We offer 24/7 customer support through our help center, email
                support, and live chat. Enterprise customers also get access to
                dedicated support representatives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

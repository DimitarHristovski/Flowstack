import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quoteKey: string;
  authorKey: string;
  avatarUrl: string;
}

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quoteKey: 'landing.testimonials.item1.quote',
      authorKey: 'landing.testimonials.item1.author',
      avatarUrl: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: 2,
      quoteKey: 'landing.testimonials.item2.quote',
      authorKey: 'landing.testimonials.item2.author',
      avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: 3,
      quoteKey: 'landing.testimonials.item3.quote',
      authorKey: 'landing.testimonials.item3.author',
      avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-surface-50 dark:from-surface-800 dark:to-surface-900">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 dark:text-white mb-4">
            {t('landing.testimonials.title')}
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            See what our customers are saying about FlowStack
          </p>
        </motion.div>
        
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-surface-900 rounded-2xl shadow-xl dark:shadow-none dark:border dark:border-surface-700 p-6 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute top-6 left-6 text-primary-500 opacity-30">
              <Quote size={48} />
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-72 sm:h-52 flex items-center justify-center">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute transition-all duration-500 w-full ${
                      index === activeIndex
                        ? 'opacity-100 translate-x-0'
                        : index < activeIndex
                        ? 'opacity-0 -translate-x-full'
                        : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <p className="text-lg sm:text-xl text-surface-700 dark:text-surface-300 text-center mb-8 italic">
                      "{t(testimonial.quoteKey)}"
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center">
                      <img
                        src={testimonial.avatarUrl}
                        alt={t(testimonial.authorKey)}
                        className="w-16 h-16 rounded-full object-cover mb-4 sm:mb-0 sm:mr-4"
                      />
                      <p className="text-surface-900 dark:text-white font-medium text-center sm:text-left">
                        {t(testimonial.authorKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === activeIndex
                        ? 'bg-primary-500'
                        : 'bg-surface-300 dark:bg-surface-600 hover:bg-surface-400 dark:hover:bg-surface-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 sm:-ml-6">
            <button
              onClick={prevTestimonial}
              className="bg-white dark:bg-surface-800 shadow-md rounded-full p-2 text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 sm:-mr-6">
            <button
              onClick={nextTestimonial}
              className="bg-white dark:bg-surface-800 shadow-md rounded-full p-2 text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
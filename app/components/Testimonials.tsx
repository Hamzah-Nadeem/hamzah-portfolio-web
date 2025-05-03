'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import hammzaImage from './assets/hamza.jpg';
import zuhran from './assets/zuhran.jpeg';
import zain from './assets/zain.jpeg';
import saad from './assets/saad.jpeg';
import kazim from './assets/kazim.jpeg';

// Updated Testimonial data with LinkedIn links
const testimonials = [
  {
    id: 1,
    name: 'Ahmed Zain Bajwa',
    role: 'Senior Product Designer',
    company: 'Dubizzle Labs',
    avatar: zain,
    content:
      'Working with Hamza has been an absolute game-changer for our design implementations. His ability to transform my complex UI designs into flawless interactive experiences exceeded all expectations. His technical expertise combined with a deep understanding of design principles makes collaboration effortless and results exceptional.',
    rating: 5,
    linkedin: 'https://www.linkedin.com/in/ahmedzain3601/',
  },
  {
    id: 2,
    name: 'Sheikh Muhammad Saad',
    role: 'Senior Product Designer',
    company: 'Dubizzle Labs',
    avatar: saad,
    content:
      "Hamza is an outstanding developer who brings designs to life with remarkable precision and attention to detail. He doesn't just code - he enhances the vision with thoughtful improvements and technical solutions that elevate the final product. His work on our property dashboard interface was simply outstanding.",
    rating: 5,
    linkedin: 'https://www.linkedin.com/in/sheikhsaad02/',
  },
  {
    id: 3,
    name: 'Zuhran Ahmed',
    role: 'Senior UI Developer',
    company: 'Dubizzle',
    avatar: zuhran,
    content:
      "Having worked alongside Hamza for 2 years, I've witnessed firsthand his exceptional problem-solving abilities and commitment to clean, efficient code. His expertise in React and modern frontend frameworks is impressive, but what truly sets him apart is his collaborative spirit and ability to optimize performance while maintaining design integrity.",
    rating: 5,
    linkedin: 'https://www.linkedin.com/in/zuhranahmed/',
  },
];

type Particle = {
  id: number;
  size: number;
  initialX: string;
  initialY: string;
  duration: number;
};

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Fix the type for autoPlayRef to allow NodeJS.Timeout
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Generate particles once on client-side only
  useEffect(() => {
    const generateParticles = (count: number): Particle[] => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.floor(Math.random() * 120) + 40,
        initialX: `${Math.random() * 100}%`,
        initialY: `${Math.random() * 100}%`,
        duration: Math.random() * 60 + 60,
      }));
    };

    setParticles(generateParticles(10));
    setIsMounted(true);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Color animation
  const color = useMotionValue('#8B5CF6'); // Purple
  const altColor = useMotionValue('#6D28D9'); // Darker purple

  useEffect(() => {
    if (isMounted) {
      animate(color, ['#8B5CF6', '#A855F7', '#6D28D9', '#7C3AED'], {
        ease: 'easeInOut',
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse',
      });

      animate(altColor, ['#6D28D9', '#4C1D95', '#7C3AED', '#5B21B6'], {
        ease: 'easeInOut',
        duration: 10,
        repeat: Infinity,
        repeatType: 'reverse',
      });
    }
  }, [isMounted]);

  const backgroundGradient = useMotionTemplate`linear-gradient(170deg, ${altColor} 0%, rgba(0, 0, 0, 0.95) 70%)`;
  const accentGlow = useMotionTemplate`0 0 20px ${color}`;
  const borderColor = useMotionTemplate`1px solid ${color}`;

  // Paralax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  // Auto-play functionality
  useEffect(() => {
    if (isMounted && isAutoPlaying) {
      // Clear any existing interval first
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }

      autoPlayRef.current = setInterval(() => {
        moveToNext();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex, isAutoPlaying, isMounted]);

  const moveToNext = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const moveToPrev = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    // Reset auto-play timer when manually navigating
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (isAutoPlaying) {
        autoPlayRef.current = setInterval(moveToNext, 5000);
      }
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Variants for card animations
  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex space-x-1 mt-2 justify-center">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400' : 'text-gray-400'
            }`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
      </div>
    );
  };

  // Random floating particle effect - SSR safe version
  const FloatingParticles = () => {
    if (!isMounted || particles.length === 0) return null;

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-purple-400 opacity-10"
            style={{
              width: particle.size,
              height: particle.size,
              filter: 'blur(40px)',
              left: particle.initialX,
              top: particle.initialY,
            }}
            animate={{
              x: ['-20%', '20%', '-10%'],
              y: ['-20%', '20%', '-10%'],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>
    );
  };

  // Return a simplified structure during server-side rendering
  if (!isMounted) {
    return (
      <section
        id="testimonials"
        className="py-24 relative overflow-hidden bg-black"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
              What People Are Saying
            </h2>
            <p className="text-lg text-purple-100 max-w-3xl mx-auto opacity-90">
              Hear from the amazing people I've worked with — talented
              professionals building great things in tech.
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="relative h-[450px] sm:h-[400px] overflow-hidden rounded-xl">
              {/* Empty container for SSR */}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="testimonials"
      className="py-24 relative overflow-hidden"
      style={{ backgroundImage: backgroundGradient }}
      ref={containerRef}
    >
      {/* Floating particles */}
      <FloatingParticles />

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: '#A855F7' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: '#8B5CF6' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-white relative inline-block"
          >
            What People Are Saying
            <motion.span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-purple-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '80%' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg font-extrabold max-w-3xl mx-auto text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-100 to-purple-200 drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]"
          >
            Hear from the amazing people I've worked with — talented
            professionals building great things in tech.
          </motion.p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {/* Carousel container */}
          <div className="relative h-[450px] sm:h-[400px] overflow-hidden rounded-xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* Left side - Avatar and info */}
                  <motion.div
                    className="w-full md:w-1/3 p-6 flex flex-col items-center justify-center relative z-10"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <motion.div
                      className="relative mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.div
                        className="w-32 h-32 rounded-full overflow-hidden border-4 relative z-10"
                        style={{
                          borderColor:
                            testimonials[activeIndex].company ===
                            'Dubizzle Labs'
                              ? '#6D28D9'
                              : '#8B5CF6',
                        }}
                      >
                        <Image
                          src={testimonials[activeIndex].avatar}
                          alt={testimonials[activeIndex].name}
                          className="object-cover w-full h-full"
                          width={128}
                          height={128}
                        />
                      </motion.div>
                      <motion.div
                        className="absolute -inset-1 rounded-full blur-md opacity-70 z-0"
                        style={{
                          background:
                            'linear-gradient(45deg, #8B5CF6, #6D28D9)',
                        }}
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.7, 0.9, 0.7],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      />
                    </motion.div>

                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-white mb-1">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-purple-300 font-medium">
                        {testimonials[activeIndex].role}
                      </p>
                      <p className="text-purple-400 text-sm">
                        {testimonials[activeIndex].company}
                      </p>
                      <StarRating rating={testimonials[activeIndex].rating} />
                      <a
                        href={testimonials[activeIndex].linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-blue-300 hover:text-blue-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        LinkedIn
                      </a>
                    </motion.div>
                  </motion.div>

                  {/* Right side - Testimonial content */}
                  <motion.div
                    className="w-full md:w-2/3 p-6 md:p-10 flex items-center bg-white/10 backdrop-blur-sm rounded-xl relative overflow-hidden"
                    style={{ border: borderColor }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {/* Decorative quote mark */}
                    <motion.svg
                      className="absolute top-6 left-6 w-16 h-16 text-purple-300 opacity-20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.2, scale: 1, rotate: -10 }}
                      transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </motion.svg>

                    <motion.div
                      className="relative z-10 " // Here, 'h-64' sets the height, you can change it as needed.
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <motion.blockquote
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="text-[10px] sm:text-sm md:text-lg lg:text-xl text-purple-100 leading-relaxed italic"
                      >
                        "{testimonials[activeIndex].content}"
                      </motion.blockquote>
                    </motion.div>

                    {/* Decorative elements */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-purple-500/10 blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex space-x-3 mb-4 md:mb-0">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, backgroundColor: '#6D28D9' }}
                onClick={moveToPrev}
                className="w-10 h-10 rounded-full bg-purple-800/50 text-white flex items-center justify-center border border-purple-400/30 shadow-lg"
                style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, backgroundColor: '#6D28D9' }}
                onClick={moveToNext}
                className="w-10 h-10 rounded-full bg-purple-800/50 text-white flex items-center justify-center border border-purple-400/30 shadow-lg"
                style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={toggleAutoPlay}
                className={`w-10 h-10 rounded-full text-white flex items-center justify-center border border-purple-400/30 shadow-lg ${
                  isAutoPlaying ? 'bg-purple-700' : 'bg-purple-800/50'
                }`}
                style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }}
              >
                {isAutoPlaying ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </motion.button>
            </div>

            {/* Dots indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex
                      ? 'bg-purple-400 shadow-lg shadow-purple-500/50'
                      : 'bg-purple-800/70'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={
                    index === activeIndex
                      ? {
                          scale: [1, 1.2, 1],
                          transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          },
                        }
                      : {}
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

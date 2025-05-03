"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";

import chart1 from "./assets/github-1.jpg";
import chart2 from "./assets/github-2.jpg";

export const Contact = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  // Contact information
  const contactInfo = {
    email: "hamzanadeem430@gmail.com",
    phone: "+92 3204455315",
    linkedin: "https://linkedin.com/in/yourprofile",
    // Remove direct GitHub link
  };

  // Animation setup - similar to testimonials for style consistency
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Color animation
  const color = useMotionValue("#8B5CF6"); // Purple
  const altColor = useMotionValue("#6D28D9"); // Darker purple

  useEffect(() => {
    if (isMounted) {
      animate(color, ["#8B5CF6", "#A855F7", "#6D28D9", "#7C3AED"], {
        ease: "easeInOut",
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      });

      animate(altColor, ["#6D28D9", "#4C1D95", "#7C3AED", "#5B21B6"], {
        ease: "easeInOut",
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      });
    }
  }, [isMounted]);

  const backgroundGradient = useMotionTemplate`linear-gradient(170deg, rgba(0, 0, 0, 0.95) 30%, ${altColor} 100%)`;
  const accentGlow = useMotionTemplate`0 0 20px ${color}`;
  const borderGlow = useMotionTemplate`0 0 15px ${color}`;
  const borderColor = useMotionTemplate`1px solid ${color}`;

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  // Copy to clipboard functionality
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // GitHub modal management
  const openGithubModal = () => {
    setShowGithubModal(true);
  };

  const closeGithubModal = () => {
    setShowGithubModal(false);
  };

  // Return a simplified structure during server-side rendering
  if (!isMounted) {
    return (
      <section id="contact" className="py-24 relative overflow-hidden bg-black">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white relative inline-block">
              Get In Touch
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ backgroundImage: backgroundGradient }}
      ref={containerRef}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: "#A855F7" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: "#8B5CF6" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
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
            Get In Touch
            <motion.span
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-purple-400 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "80%" }}
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
            Let's collaborate on your next project!
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Contact Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl h-full relative overflow-hidden"
                style={{ border: borderColor }}
                whileHover={{ boxShadow: borderGlow }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: "#A855F7" }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                <div className="mb-8 relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-purple-900/60 flex items-center justify-center mb-4 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    style={{ boxShadow: accentGlow }}
                  >
                    <svg
                      className="w-8 h-8 text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">
                    Email Me
                  </h3>
                  <p className="text-purple-200 text-center mb-6">
                    I'm always open to discussing new projects and opportunities
                  </p>
                </div>

                <motion.div
                  className="bg-white/5 border border-purple-500/20 rounded-lg p-4 flex items-center justify-between relative"
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <span className="text-purple-100 font-medium break-all">
                    {contactInfo.email}
                  </span>
                  <motion.button
                    onClick={() => handleCopy(contactInfo.email, "email")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-2 p-2 rounded-md bg-purple-800/50 text-white"
                  >
                    {copied === "email" ? (
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    )}
                  </motion.button>
                </motion.div>

                <motion.a
                  href={`mailto:${contactInfo.email}`}
                  className="mt-6 inline-block w-full text-center py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Email
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Phone Contact Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl h-full relative overflow-hidden"
                style={{ border: borderColor }}
                whileHover={{ boxShadow: borderGlow }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: "#8B5CF6" }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                <div className="mb-8 relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-purple-900/60 flex items-center justify-center mb-4 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    style={{ boxShadow: accentGlow }}
                  >
                    <svg
                      className="w-8 h-8 text-purple-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">
                    Call Me
                  </h3>
                  <p className="text-purple-200 text-center mb-6">
                    Let's have a quick chat about your project needs
                  </p>
                </div>

                <motion.div
                  className="bg-white/5 border border-purple-500/20 rounded-lg p-4 flex items-center justify-between"
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <span className="text-purple-100 font-medium">
                    {contactInfo.phone}
                  </span>
                  <motion.button
                    onClick={() => handleCopy(contactInfo.phone, "phone")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-2 p-2 rounded-md bg-purple-800/50 text-white"
                  >
                    {copied === "phone" ? (
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    )}
                  </motion.button>
                </motion.div>

                <motion.a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                  className="mt-6 inline-block w-full text-center py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Call Now
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Social links with GitHub showcase button */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* LinkedIn Link */}
            <motion.a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-purple-500/30 text-purple-300 hover:text-white"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(139, 92, 246, 0.3)",
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>

            {/* GitHub Showcase Button */}
            <motion.button
              onClick={openGithubModal}
              className="p-4 bg-white/5 backdrop-blur-sm rounded-full border border-purple-500/30 text-purple-300 hover:text-white"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(139, 92, 246, 0.3)",
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* GitHub Contribution Modal */}
      {showGithubModal && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900/90 backdrop-blur-md border border-purple-500/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 0 25px rgba(139, 92, 246, 0.3)" }}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  My GitHub Contributions
                </h3>
                <motion.button
                  onClick={closeGithubModal}
                  className="p-2 rounded-full bg-white/10 text-purple-200 hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* GitHub Screenshots */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-purple-200 mb-3">
                    Contribution Activity
                  </h4>
                  <div className="relative rounded-lg overflow-hidden border border-purple-500/20 bg-gray-800">
                    <div className="p-4">
                      <svg
                        className="w-12 h-12 mx-auto text-purple-400 mb-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <p className="text-gray-300 mb-4">
                        This is a screenshot for my GitHub activity chart
                      </p>
                      <div className="space-y-4">
                        <div className="max-w-full">
                          <Image
                            src={chart1}
                            alt="github activity chart 1"
                            width={800}
                            height={450}
                            className="drop-shadow-[0_0_25px_rgba(168,85,247,0.4)] max-w-full h-auto rounded"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div className="max-w-full">
                          <Image
                            src={chart2}
                            alt="github activity chart 2"
                            width={800}
                            height={450}
                            className="drop-shadow-[0_0_25px_rgba(168,85,247,0.4)] max-w-full h-auto rounded"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div>
                  <h4 className="text-xl font-semibold text-purple-200 mb-3">
                    Recent Projects
                  </h4>
                  <div className="relative rounded-lg overflow-hidden border border-purple-500/20 bg-gray-800">
                    <div className="p-4">
                      <svg
                        className="w-12 h-12 mx-auto text-purple-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                      </svg>
                      <p className="text-gray-300">
                        Insert your GitHub projects screenshot here
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="mt-8 p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
                <p className="text-purple-200 text-sm">
                  These screenshots showcase my GitHub activity and coding
                  projects. For privacy reasons, I'm displaying these highlights
                  instead of linking directly to my GitHub profile. If you'd
                  like to discuss my development experience in more detail,
                  please reach out!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
};

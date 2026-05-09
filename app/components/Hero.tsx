"use client";

import Image from "next/image";
import profilepic from "./assets/profile-5.png";
import obj1 from "./assets/pic-6.jpeg";
import obj2 from "./assets/pic-8.jpg";
import { useEffect, useState } from "react";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

import {
  useMotionValue,
  animate,
  useMotionTemplate,
  motion,
  AnimatePresence,
} from "framer-motion";

// Enhanced color palette with more vibrant purples
const COLORS = ["#A259FF", "#7C3AED", "#6D28D9", "#8B5CF6", "#9333EA"];

export const Hero = () => {
  const color = useMotionValue(COLORS[0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 15,
      repeat: Infinity,
      repeatType: "mirror",
    });

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, ${color}, #10041F 85%)`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 30px ${color}`;
  const textGlow = useMotionTemplate`0px 0px 15px ${color}`;

  // Mouse follower gradient
  const followerBackground = useMotionTemplate`radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}20, transparent 40%)`;

  return (
    <motion.section
      id="about"
      style={{ backgroundImage }}
      className="relative grid min-h-[100vh] place-content-center overflow-hidden px-4 py-20 text-gray-200"
    >
      {/* Mouse follower effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{ background: followerBackground }}
      />

      {/* Main content container */}
      <div className="z-10 flex flex-col items-center relative">
        {/* Animated status badge */}
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginTop: "20px" }}
          className="mb-4 inline-block rounded-full bg-purple-900/30 px-4 py-2 text-sm border border-purple-400/40 backdrop-blur-md shadow-lg"
        >
          <motion.span
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"
          />
          Open for Work
        </motion.span>

        {/* Animated name intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-purple-300/80 text-2xl sm:text-4xl md:text-5xl font-black mb-2">
            Hello, I am{" "}
          </h2>
          <motion.h1
            style={{ textShadow: textGlow }}
            className="max-w-3xl bg-gradient-to-br from-white to-purple-200 bg-clip-text font-black text-5xl md:text-7xl lg:text-8xl leading-tight text-transparent mb-6"
          >
            Hamza Nadeem
          </motion.h1>
        </motion.div>

        {/* Profile image with enhanced effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            style={{ boxShadow }}
            animate={{
              rotate: [0, 5, -5, 0],
              scale: isHovering ? 1.05 : 1,
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.3 },
            }}
            className="relative rounded-full p-1 backdrop-blur-sm bg-gradient-to-br from-purple-500/30 to-transparent"
          >
            <Image
              src={profilepic}
              alt="profile"
              width={220}
              height={220}
              className="rounded-full drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]"
            />

            {/* Orbiting particles around profile */}
            {isHovering && (
              <AnimatePresence>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      rotate: 360 * (i + 1),
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      rotate: {
                        duration: 8 - i * 2,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      opacity: { duration: 0.5 },
                    }}
                    style={{
                      background: COLORS[i % COLORS.length],
                      boxShadow: `0 0 15px ${COLORS[i % COLORS.length]}`,
                    }}
                    className="absolute w-3 h-3 rounded-full"
                  >
                    <div
                      style={{
                        top: `${110 + i * 25}px`,
                        left: `${110 + i * 25}px`,
                        transformOrigin: `-${i * 25}px -${i * 25}px`,
                      }}
                      className="w-full h-full rounded-full"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </motion.div>

        {/* Profession badge with interactive elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          className="flex mt-8 bg-white/10 backdrop-blur-xl shadow-2xl p-3 gap-2 rounded-2xl justify-center items-center mb-6 border border-purple-400/30"
        >
          <motion.p
            style={{ textShadow: textGlow }}
            className="px-2 py-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-white to-purple-400 font-bold text-lg"
          >
            FRONTEND UI DEVELOPER
          </motion.p>
        </motion.div>

        {/* Description with enhanced typography */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="my-6 max-w-xl text-center font-medium text-white/90 backdrop-blur-sm px-6 py-3 rounded-lg bg-purple-800/10 border border-purple-500/10"
        >
          Front-End UI Developer from Pakistan with 3+ years of experience
          creating
          <span className="font-bold"> stunning modern interfaces</span> and
          <span className="font-bold"> smooth interactive experiences</span>
        </motion.p>

        {/* Call to action buttons */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.a
            href="https://heyzine.com/flip-book/76ba9ed97e.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ border, boxShadow }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-full px-6 py-3 cursor-pointer backdrop-blur-md bg-gradient-to-r from-purple-600/40 to-purple-800/40 text-white font-medium"
          >
            View CV
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'easeInOut',
              }}
            >
              <FiArrowRight className="text-lg" />
            </motion.span>
          </motion.a>
        </motion.div> */}
      </div>

      {/* Enhanced background elements */}
      <div className="bg-circle-container absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main circular gradient */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 0.9, 0.8],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="bg-circle absolute w-[120%] h-[120%] rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(91, 33, 182, 0.1) 30%, rgba(67, 20, 140, 0.05) 60%, transparent 80%)",
            filter: "blur(40px)",
          }}
        />

        {/* Grid pattern overlay for texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #A78BFA 1px, transparent 1px), linear-gradient(to bottom, #A78BFA 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Additional light streaks */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            rotate: { duration: 120, repeat: Infinity, ease: "linear" },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute w-[200%] h-[10px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20"
          style={{
            background:
              "linear-gradient(90deg, transparent, #A259FF, transparent)",
            filter: "blur(8px)",
          }}
        />
      </div>

      {/* Responsive adjustments and keyframes */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .bg-circle-container {
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </motion.section>
  );
};

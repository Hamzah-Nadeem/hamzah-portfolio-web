'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useMotionTemplate,
} from 'framer-motion';
import Image from 'next/image';

import bayutLogo from './assets/logos/bayut-logo.svg';
import dubizzleLogo from './assets/logos/dubizzle-logo.svg';
import profolioLogo from './assets/logos/profolio-logo.svg';
import propForce from './assets/logos/prop-force.svg';
import zameenLogo from './assets/logos/zameen-logo.svg';
import OLX from './assets/logos/olx.svg';

// Define TypeScript interfaces for our data structures
interface Contribution {
  title: string;
  description: string;
  link?: string;
  screenshot?: string | StaticImageData; // Add StaticImageData as a possible type
}

interface Project {
  id: number;
  title: string;
  company: string;
  description: string;
  image: string;
  tags: string[];
  teamSize: string;
  isInternal?: boolean;
  contributions: Contribution[];
  bgColor: string;
  linking: string;
  linking1: string;
}

// Import the necessary image assets for internal project screenshots
import agencyDashboard from './assets/agency-dashboard.png';
import Trubroker from './assets/trubroker.png';
import leadManagment from './assets/lms.png';
import PackageScreen from './assets/package-screen.png';
import ListingScreen from './assets/lisitngs.png';
import LeadManagment from './assets/leads-dashboard.png';

import cheveronView from './assets/carforce-cheveron.png';
import carforceInventory from './assets/carforce-inventory.png';

//propforce

import propforceDashboard from './assets/propforce.png';
import mediaControl from './assets/media-marketing-control.png';
import imageCropper from './assets/image-cropper.png';

//olx

import olxHeader from './assets/olx-mobile-header.png';
import olxAccount from './assets/olx-account.png';
import olxMotorReview from './assets/olx-motors-reviews.png';

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Bayut SA',
    linking: 'https://www.bayut.sa/en/',
    linking1: 'visit website',
    company: 'Property Finder Group',
    description:
      'Bayut is a digital property marketplace that allows users to buy, sell, and rent residential and commercial properties. The platform provides listings for apartments, villas, offices, lands, and other real estate properties throughout Saudi Arabia.',
    image: bayutLogo,
    tags: ['Next.js', 'TypeScript', 'sass'],
    teamSize: '15 developers',
    bgColor: 'from-teal-500 to-teal-800',
    contributions: [
      {
        title: 'Bayut Workshops',
        description:
          'Developed an interactive workshop registration system with automated scheduling, personalized event recommendations, and real-time notifications for real estate professionals. The system increased workshop attendance by 32%.',
        link: 'https://www.bayut.sa/en/bayut-workshops/',
      },
      {
        title: 'Home Loan Finder',
        description:
          'Built a comprehensive mortgage calculator and financial comparison tool featuring instant eligibility assessment, integrated Sharia-compliant financing options, and personalized rate recommendations from multiple Saudi banks.',
        link: 'https://www.bayut.sa/en/home-loan-finder/',
      },
      {
        title: 'Advertise with Bayut',
        description:
          'Created an end-to-end advertising platform with customizable campaign tools, targeted audience selection, and performance analytics dashboard. The solution helped increase agency client acquisition by 40% in the first quarter.',
        link: 'https://www.bayut.sa/en/advertise-with-us/',
      },
    ],
  },
  {
    id: 2,
    title: 'Profolio CRM',
    company: 'Dubizzle Group',
    description:
      'Bayut Profolio is a real estate-focused CRM (Customer Relationship Management) and property management platform offered by Bayut, a leading property portal in the UAE and a part of the Dubizzle Group (formerly EMPG).',
    image: profolioLogo,
    tags: ['React', 'styled-components', 'Ant Design'],
    teamSize: '15 developers',
    isInternal: true,
    bgColor: 'from-teal-500 to-teal-800',
    contributions: [
      {
        title: 'TruBroker',
        description:
          'Built comprehensive performance analytics with custom metrics tracking, dynamic charts, and automated reporting. The module helped identify top performers and areas for training, boosting team productivity by 15%.',
        screenshot: Trubroker,
      },
      {
        title: 'Lead Management Dashboard',
        description:
          'Designed and developed an intuitive lead management dashboard with real-time notifications and priority sorting. The system increased lead conversion rates by 28% within three months of deployment.',
        screenshot: LeadManagment,
      },
      {
        title: 'Listings',
        description:
          'Created a streamlined property listing management system with advanced filtering and bulk editing capabilities. The interface reduced listing creation time by 35% and improved data accuracy across multiple listing platforms.',
        screenshot: ListingScreen,
      },
      {
        title: 'Packages',
        description:
          'Developed a subscription management module for tracking broker package utilization and ROI. The system provided clear visibility into feature usage and helped optimize marketing spend with automated upgrade recommendations.',
        screenshot: PackageScreen,
      },
    ],
  },
  {
    id: 3,
    title: '​Dubizzle Carforce',
    company: '​Dubizzle',
    description:
      'Dubizzle Carforce is an advanced Customer Relationship Management (CRM) platform developed by Dubizzle, a leading online classifieds platform in the UAE. Carforce is designed to streamline and enhance the operations of car dealerships and automotive businesses.',
    image: dubizzleLogo,
    tags: ['React', 'Ant Design', 'sass'],
    teamSize: '13 developers',
    bgColor: 'from-red-500 to-orange-700',
    isInternal: true,

    contributions: [
      {
        title: 'Chevron View',
        description:
          'Chevron View of the Dubizzle Carforce CRM, which is designed to manage the vehicle inspection and check-in workflow for car dealerships.',
        screenshot: cheveronView,
      },
      {
        title: 'Vehicle Profile View',
        description:
          'Vehicle profile view within Dubizzle Carforce CRM, focused on inspection reporting, buyer matching, ad posting, and auction readiness for a specific car.',
        screenshot: carforceInventory,
      },
    ],
  },

  {
    id: 4,
    title: 'Propforce',
    company: 'Dubizzle Group',
    description:
      'Propforce is Zameen.com affiliate platform that allows real estate agents and individuals to earn commissions by referring clients to property projects. It provides access to exclusive listings and tools to track leads, referrals, and earnings. Available via web and mobile app, it helps users grow their real estate business with minimal investment.',
    image: propForce,
    tags: ['React', 'Ant Design', 'less'],
    teamSize: '15 developers',
    isInternal: true,
    bgColor: 'from-green-500 to-green-800',
    contributions: [
      {
        title: 'Dashboard',
        description:
          'Developed an interactive analytics dashboard with real-time KPI tracking, revenue forecasting, and personalized performance metrics. The interface allows agents to monitor lead status, conversion rates, and commission earnings at a glance.',
        screenshot: propforceDashboard,
      },
      {
        title: 'Media Marketing Control',
        description:
          'Built a comprehensive media management system enabling agents to create, schedule, and track marketing campaigns across multiple channels. The module includes audience targeting, budget allocation, and detailed performance analytics for campaign optimization.',
        screenshot: mediaControl,
      },
      {
        title: 'Image Cropper',
        description:
          'Implemented an advanced image processing tool that allows agents to optimize property photos with automated enhancement, custom cropping, and watermarking capabilities. The feature increased listing quality scores by 27% and improved client engagement with property visuals.',
        screenshot: imageCropper,
      },
    ],
  },
  {
    id: 5,
    title: 'Zameen',
    company: 'Dubizzle Group',
    linking: 'https://www.zameen.com/',
    linking1: 'visit website',
    description:
      'Zameen.com is Pakistan’s leading real estate portal, launched in 2006, and part of the Dubizzle Group. It serves as a comprehensive platform that connects buyers, sellers, and renters with thousands of verified property listings across the country. From residential homes and apartments, Zameen.com covers all segments of the property market. ',
    image: zameenLogo,
    tags: ['Next', 'chartjs', 'sass'],
    teamSize: '20 developers',
    bgColor: 'from-green-500 to-green-800',
    contributions: [
      {
        title: 'Agents',
        description:
          'Developed a directory and search interface for real estate agents with filtering by city, agency, and specialization. Enabled users to directly connect with verified agents and view their active property listings.',
        link: 'https://www.zameen.com/agents/',
      },
      {
        title: 'New Projects',
        description:
          'Built a listing platform for new and upcoming real estate projects, featuring project overviews, payment plans, location maps, and developer details. Allowed users to explore investment opportunities in residential and commercial developments.',
        link: 'https://www.zameen.com/new-projects/',
      },
      {
        title: 'Advertise',
        description:
          'Created a self-service advertising portal for property developers and agencies to promote listings, banner ads, and brand campaigns. Included audience targeting, performance tracking, and campaign customization options.',
        link: 'https://www.zameen.com/advertise/',
      },
      {
        title: 'Trends',
        description:
          'Implemented an analytics dashboard displaying real estate market trends, including price changes, demand heatmaps, and area comparisons. Helped users make informed property decisions using interactive visual data.',
        link: 'https://www.zameen.com/trends/',
      },
    ],
  },
  {
    id: 6,
    title: 'OLX',
    company: 'Dubizzle Group',
    linking: 'https://www.olx.com.pk/',
    linking1: 'visit website',

    description:
      'OLX is a global online marketplace where users can buy and sell goods and services locally. Current Status: Platform is getting resdesigned and will be live soon. The live link will be updated once the platform is fully operational, right now sharing the screenshots of new design which is being done on frotnend side',
    image: OLX,
    tags: ['Next', 'Typescript', 'sass'],
    teamSize: '20 developers',
    bgColor: 'from-blue-500 to-blue-800',
    isInternal: false,
    contributions: [
      {
        title: 'OLX Header',
        description:
          'Redesigned and implemented the main website header with improved navigation and user experience',
        screenshot: olxHeader,
      },
      {
        title: 'OLX Motors Review Page',
        description:
          'Built the vehicle review system including rating components and media gallery',
        screenshot: olxMotorReview,
      },
      {
        title: 'OLX Account',
        description: 'Created a responsive login screen to preview the profile',
        screenshot: olxAccount,
      },
    ],
  },
];

export const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(
    null
  );

  // Enhanced animation colors for the background
  const COLORS_BG = ['#4c1d95', '#5b21b6', '#6d28d9', '#7c3aed', '#8b5cf6'];
  const color = useMotionValue(COLORS_BG[0]);

  useEffect(() => {
    animate(color, COLORS_BG, {
      ease: 'easeInOut',
      duration: 12,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(150% 150% at 50% 10%, #000 30%, ${color}, #1e1b4b)`;

  const toggleExpand = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  const openScreenshot = (screenshot: string) => {
    setSelectedScreenshot(screenshot);
  };

  const closeScreenshot = () => {
    setSelectedScreenshot(null);
  };

  return (
    <motion.section
      id="portfolio"
      className=" pb-24 pt-24 md:pb-32 relative overflow-hidden"
      style={{ backgroundImage }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-white/50" />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            My Project Contributions
          </h2>
          <div className="w-32 h-1 bg-purple-400 mx-auto mb-6"></div>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Key features and sections I've personally developed within
            large-scale projects. Click on each project to see my specific
            contributions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="rounded-xl overflow-hidden shadow-lg relative backdrop-blur-sm bg-white/10 border border-white/20"
            >
              {/* Enhanced card header with gradient background */}
              <div
                className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.bgColor}`}
              >
                <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-br-lg z-10">
                  {project.company}
                </div>

                {project.isInternal && (
                  <div className="absolute bottom-0 left-0 right-0 bg-purple-900 bg-opacity-90 text-white text-xs font-semibold px-3 py-1 z-10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Internal CRM System
                  </div>
                )}

                {/* Logo container - smaller and centered */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center p-8"
                  initial={{ scale: 0.8, opacity: 1 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-32 h-32 relative flex items-center justify-center">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="object-contain"
                      width={150}
                      height={100}
                    />
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <svg
                  className="absolute bottom-0 left-0 w-full opacity-20"
                  viewBox="0 0 1440 320"
                >
                  <path
                    fill="currentColor"
                    fillOpacity="1"
                    d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
              </div>

              <div className="p-5">
                <div className="flex items-center mb-2 gap-2">
                  <h3 className="text-xl font-bold text-white ">
                    {project.title}
                  </h3>
                  <a
                    className=" font-semibold text-blue-600 hover:text-blue-800"
                    href={project.linking}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.linking1}
                  </a>
                </div>

                <p className="text-purple-100 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-purple-800/50 text-purple-100 text-xs rounded-full border border-purple-400/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  onClick={() => toggleExpand(index)}
                  className={`w-full py-2 px-3 rounded-lg flex items-center justify-between text-sm font-medium ${
                    expandedProject === index
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/20 text-white hover:bg-purple-500/30'
                  } transition-colors backdrop-blur-sm`}
                >
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      />
                    </svg>
                    My Contributions ({project.contributions.length})
                  </span>
                  <svg
                    className={`h-5 w-5 transition-transform ${
                      expandedProject === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {expandedProject === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-3"
                    >
                      <div className="space-y-3 pt-2">
                        {project.contributions.map((contribution, cIndex) => (
                          <motion.div
                            key={cIndex}
                            className={`block p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-purple-500/30 transition-colors border-l-4 border-purple-400`}
                            whileHover={{ x: 5 }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            {contribution.link ? (
                              // For public projects with links
                              <a
                                href={contribution.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start justify-between"
                              >
                                <div className="pr-2">
                                  <h5 className="font-semibold text-white text-sm">
                                    {contribution.title}
                                  </h5>
                                  <p className="text-xs text-purple-100 mt-1">
                                    {contribution.description}
                                  </p>
                                </div>
                                <svg
                                  className="h-4 w-4 text-purple-300 flex-shrink-0"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            ) : (
                              // For internal projects with screenshots
                              <div>
                                <h5 className="font-semibold text-white text-sm">
                                  {contribution.title}
                                </h5>
                                <p className="text-xs text-purple-100 mt-1 mb-2">
                                  {contribution.description}
                                </p>
                                {contribution.screenshot && (
                                  <button
                                    onClick={() =>
                                      openScreenshot(contribution.screenshot)
                                    }
                                    className="mt-2 flex items-center text-xs bg-purple-600/50 hover:bg-purple-600/80 text-white py-1 px-2 rounded transition-colors"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 mr-1"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    View Screenshot
                                  </button>
                                )}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enhanced hover effect with animated badge */}
              {hoveredCard === index && (
                <motion.div
                  className="absolute top-3 right-3 z-20"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                    </svg>
                  </div>
                </motion.div>
              )}

              {/* Glowing border effect on hover */}
              {hoveredCard === index && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: `0 0 15px 2px rgba(168, 85, 247, 0.4)`,
                    zIndex: 1,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for screenshots */}
      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeScreenshot}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeScreenshot}
                className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Image
                src={selectedScreenshot}
                alt="Project Screenshot"
                className="rounded-lg shadow-2xl"
                width={800}
                height={600}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeScreenshot}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-purple-900/90 backdrop-blur-lg p-2 rounded-lg shadow-2xl max-w-4xl max-h-[90vh] w-full border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeScreenshot}
                className="absolute top-2 right-2 bg-purple-700 text-white rounded-full p-1 hover:bg-purple-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="overflow-auto max-h-[calc(90vh-40px)]">
                <Image
                  src={selectedScreenshot}
                  alt="Feature Screenshot"
                  className="rounded-md"
                  width={1200}
                  height={800}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add subtle floating particles for additional glass effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 bg-purple-400 rounded-full opacity-5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(60px)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

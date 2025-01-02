"use client"

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import BrandLogo from "../../public/images/Sportelo Final.png";
import Form from "@/components/Form";
import AboutModal from "@/components/AboutModal";

// Background Element Component
const BackgroundElement = ({ index }: { index: number }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initialX = `${(index % 4) * 25}%`;
  const initialY = `${Math.floor(index / 4) * 25}%`;

  const getFinalPosition = () => ({
    x: `${Math.random() * 80 + 10}%`,
    y: `${Math.random() * 80 + 10}%`,
    scale: Math.random() * 1.5 + 0.5,
  });

  if (!mounted) {
    return (
      <div
        className="absolute w-10 sm:w-14 md:w-20 h-10 sm:h-14 md:h-20 rounded-full bg-red-600/10"
        style={{ left: initialX, top: initialY }}
      />
    );
  }

  return (
    <motion.div
      className="absolute w-10 sm:w-14 md:w-20 h-10 sm:h-14 md:h-20 rounded-full bg-red-600/10"
      initial={{ left: initialX, top: initialY, scale: 1 }}
      animate={{
        left: [initialX, getFinalPosition().x, initialX],
        top: [initialY, getFinalPosition().y, initialY],
        scale: [1, getFinalPosition().scale, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
    />
  );
};

// Animated Sports Icon Component
const SportIcon = ({ index, icon }: { index: number, icon: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const initialX = `${(index % 4) * 90}%`;
  const initialY = `${Math.floor(index / 4) * 90}%`;

  const getFinalPosition = () => ({
    x: `${Math.random() * 60 + 10}%`,
    y: `${Math.random() * 60 + 10}%`,
  });

  if (!mounted) {
    return (
      <div
        className="absolute text-4xl"
        style={{ left: initialX, top: initialY }}
      />
    )
  }

  return (
    <motion.div
      key={index}
      className="absolute text-4xl"
      initial={{ left: initialX, top: initialY, scale: 1 }}
      animate={{
        left: [initialX, getFinalPosition().x, initialX],
        top: [initialY, getFinalPosition().y, initialY],
        opacity: [0.3, 0.7, 0.3],
        rotate: [0, 360]
      }}
      transition={{
        duration: Math.random() * 20 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
    >
      {icon}
    </motion.div>
  );
}

const MainContent = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-10 w-full max-w-[95%] sm:max-w-[90%] md:max-w-4xl mx-auto"
    >
      <div
      style={{
        background: 'rgba(18, 18, 18, 0.4)',
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
      }}
       className="relative p-3 sm:p-5 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10">
        <div className="flex justify-center">
          <div onClick={() => setIsAboutOpen(true)} className="md:w-[140px] w-[95px] md:h-[140px] h-[95px] relative transform hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer">
            <Image
              src={BrandLogo}
              alt="Banner Image"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
        <div className="text-center mb-6 sm:mb-8 md:mb-11">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold mb-3 sm:mb-4 md:mb-6 font-['Orbitron']"
            style={{
              color: '#fff',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundImage: 'linear-gradient(to right, #ffffff, #dc2626)',
              backgroundClip: 'text',
              display: 'inline-block'
            }}
          >
            Sportelo
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-['Quicksand'] leading-relaxed max-w-2xl mx-auto px-2">
            Get ready for an exciting journey into the world of sports! We are launching soon. Stay tuned!
          </p>
          <motion.button
            onClick={() => setIsAboutOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 mb:px-6 px-5 py-2 md:text-base text-sm bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-['Quicksand'] font-medium hover:shadow-lg transition-shadow"
          >
            About Us
          </motion.button>
        </div>
        <Form />
      </div>
      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </motion.div>
  );
};

export default function Home() {
  const [showNewYear, setShowNewYear] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewYear(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <BackgroundElement key={i} index={i} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showNewYear ? (
          <motion.div
            key="newyear"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="absolute z-20 w-full flex items-center justify-center"
          >
            <div className="text-center">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4"
              >
                Happy New Year
              </motion.h1>
              <motion.span
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-red-600 font-['Orbitron']"
              >
                2025
              </motion.span>
            </div>
          </motion.div>
        ) : (
          <MainContent />
        )}
      </AnimatePresence>

      {/* Animated Sports Icons */}
      {['⚽', '🏀', '🎾', '🏈', '⚾', '🏐', '🏉', '🎱', '🏓'].map((icon, index) => (
        <SportIcon key={index} icon={icon} index={index} />
      ))}
    </div>
  );
}
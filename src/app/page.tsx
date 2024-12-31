"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import BrandLogo from "../../public/images/Sportelo Final.png"

const BackgroundElement = ({ index }: { index: number }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Create more spread out initial positions
  const initialX = `${(index % 4) * 25}%`;
  const initialY = `${Math.floor(index / 4) * 25}%`;

  // Generate random final positions that ensure movement
  const getFinalPosition = () => ({
    x: `${Math.random() * 80 + 10}%`,  
    y: `${Math.random() * 80 + 10}%`,
    scale: Math.random() * 1.5 + 0.5,
  });

  if (!mounted) {
    return (
      <div
        className="absolute w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 rounded-full bg-red-600/10"
        style={{ left: initialX, top: initialY }}
      />
    );
  }

  return (
    <motion.div
      className="absolute w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 rounded-full bg-red-600/10"
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

const DynamicLine = ({ index }: { index: number }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initialRotate = (index * 30) % 180;
  const initialLeft = `${(index * 20) % 100}%`;
  const initialTop = `${(index * 25) % 100}%`;

  if (!mounted) {
    return (
      <div
        className={`absolute h-0.5 sm:h-1 ${index % 2 === 0 ? 'bg-red-600' : 'bg-white'} opacity-20`}
        style={{
          width: '15vw',
          transform: `rotate(${initialRotate}deg)`,
          left: initialLeft,
          top: initialTop,
        }}
      />
    );
  }

  return (
    <motion.div
      className={`absolute h-0.5 sm:h-1 ${index % 2 === 0 ? 'bg-red-600' : 'bg-white'} opacity-20`}
      style={{
        width: '15vw',
        transform: `rotate(${initialRotate}deg)`,
        left: initialLeft,
        top: initialTop,
      }}
      animate={{
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 5 + index,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <BackgroundElement key={i} index={i} />
        ))}
      </div>

      {/* Main Content Container with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-[95%] sm:max-w-[90%] md:max-w-4xl mx-auto"
      >
        <div className="backdrop-blur-xl bg-white/5 p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10">
          <div className="flex justify-center">
            <Image src={BrandLogo} width={140} height={140} alt="BrandLogo" />
          </div>
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-red-600 mb-3 sm:mb-4 md:mb-6 font-['Orbitron']">
              Sportelo
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-['Quicksand'] leading-relaxed max-w-2xl mx-auto px-2">
              Get ready for an exciting journey into the world of sports! We are launching soon. Stay tuned!
            </p>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-[90%] sm:max-w-md mx-auto backdrop-blur-lg bg-white/5 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10"
          >
            <p className="text-gray-300 font-['Quicksand'] text-center mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
              Be the first to experience the future of sports community. Join our waitlist and receive exclusive early access!
            </p>
            <form className="space-y-3 sm:space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 font-['Quicksand'] text-sm sm:text-base"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 font-['Quicksand'] text-sm sm:text-base"
                />
              </div>
              <div>
                <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/50 border border-white/20 text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 font-['Quicksand'] text-sm sm:text-base">
                  <option value="" className="bg-black">Join us as...</option>
                  <option value="athlete" className="bg-black">Professional Athlete</option>
                  <option value="coach" className="bg-black">Sports Coach</option>
                  <option value="enthusiast" className="bg-black">Sports Enthusiast</option>
                  <option value="organization" className="bg-black">Sports Organization</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-700 to-red-500 text-white font-bold text-sm sm:text-base md:text-lg hover:from-red-800 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg font-['Quicksand']"
              >
                Join Waitlist
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {Array.from({ length: 6 }).map((_, index) => (
        <DynamicLine key={index} index={index} />
      ))}
    </div>
  );
}
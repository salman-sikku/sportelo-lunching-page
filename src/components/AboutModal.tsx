import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";



interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl my-8"
            >
              <div className="bg-black/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl relative">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
                <div className="space-y-6">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Orbitron']"
                    style={{
                      color: '#fff',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundImage: 'linear-gradient(to right, #ffffff, #dc2626)',
                      backgroundClip: 'text',
                      display: 'inline-block'
                    }}
                  >
                    About us
                  </h2>

                  <div className="space-y-3 text-gray-300 font-['Quicksand'] text-sm sm:text-base">
                    <p>
                      Welcome to Sportelo, your ultimate hub for premium sports gear and stylish sportswear. Whether you’re a pro, an enthusiast, or a beginner, we’re here to deliver
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Top-quality equipment from trusted brands</li>
                      <li>Competitive prices and regular deals</li>
                      <li>Expert guidance for the right gear</li>
                      <li>Reliable and fast delivery</li>
                      <li>100% authentic products</li>
                    </ul>
                    <p>
                      At Sportelo, your satisfaction is our top priority. Let us help you perform your best and take your game to the next level
                    </p>
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <span className="w-5 h-5 text-red-600">
                            <RiPhoneFill />
                          </span>
                          <a
                            href="tel:7292071092"
                            className="hover:text-white transition-colors hover:underline"
                          >
                            7292-071-092
                          </a>
                        </p>

                        <p className="flex items-center gap-2">
                          <span className="w-5 h-5 text-red-600">
                            <MdOutlineMailOutline />
                          </span>
                          <a
                            href="mailto:Support@sportelo.shop"
                            className="hover:text-white transition-colors hover:underline break-all"
                          >
                            Support@sportelo.shop
                          </a>
                        </p>

                        <div className="flex items-center space-x-4 mt-4">
                          <a
                            href="https://www.instagram.com/invites/contact/?igsh=te5b7tfavcw6&utm_content=wszzuc7"
                            className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram className="text-white w-5 h-5" />
                          </a>
                          <a
                            href="https://www.facebook.com/profile.php?id=61570901674212"
                            className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebook className="text-white w-5 h-5" />
                          </a>
                          <a
                            href="https://www.youtube.com/@Sportelo.youtube"
                            className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaYoutube className="text-white w-5 h-5" />
                          </a>
                          {/* Twitter */}
                          <a
                            href="https://x.com/Sporteloshop"
                            className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full hover:bg-blue-500 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaXTwitter className="text-white w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;

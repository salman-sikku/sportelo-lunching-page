import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";


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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 border border-green-700"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex border border-red-700 items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl my-8"
            >
              <div className="bg-black/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl h-[600px] myScrollBar overflow-y-auto relative">
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-red-600 font-['Orbitron']">
                    About Sportelo
                  </h2>

                  <div className="space-y-3 text-gray-300 font-['Quicksand'] text-sm sm:text-base">
                    <p>
                      Welcome to Sportelo, your ultimate destination for premium sports equipment and stylish sportswear. At Sportelo, we’re passionate about empowering athletes of all levels—whether you’re a seasoned professional, a fitness enthusiast, or just starting your fitness journey. We're revolutionizing the way athletes and sports enthusiasts shop for their equipment needs. Our mission is simple: to provide top-quality gear that helps you perform at your best while looking great doing it.
                    </p>

                    <p>
                      At Sportelo, we strive to offer:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                      <li>Premium quality sports equipment from trusted brands</li>
                      <li>Competitive prices and regular deals</li>
                      <li>Expert guidance on equipment selection</li>
                      <li>Fast and reliable delivery services</li>
                      <li>Authentic products with warranty</li>
                      <li>Your satisfaction is our top priority. We’re here to guide, support, and inspire you every step of the way.</li>
                    </ul>

                    <p>
                      Our commitment is to provide the best sporting equipment that enhances your performance and takes your game to the next level.
                    </p>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Contact Information</h3>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a
                            href="tel:7292071092"
                            className="hover:text-white transition-colors hover:underline"
                          >
                            7292-071-092
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a
                            href="mailto:Support@sportelo.shop"
                            className="hover:text-white transition-colors hover:underline break-all"
                          >
                            Support@sportelo.shop
                          </a>
                        </p>

                        {/* Add Social Media Links */}
                        <p className="flex items-center gap-2">
                          <span className="w-5 h-5 text-red-600">
                            <FaInstagram />
                          </span>
                          <a
                            href="https://www.instagram.com/invites/contact/?igsh=te5b7tfavcw6&utm_content=wszzuc7"
                            className="hover:text-white transition-colors hover:underline"
                          >
                            Instagram
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-5 h-5 text-red-600">
                            <FaFacebook />
                          </span>
                          <a
                            href="https://www.facebook.com/profile.php?id=61570901674212"
                            className="hover:text-white transition-colors hover:underline"
                          >
                            Facebook
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-5 h-5 text-red-600">
                            <FaYoutube />
                          </span>
                          <a
                            href="https://www.youtube.com/@Sportelo.youtube"
                            className="hover:text-white transition-colors hover:underline"
                          >
                            YouTube
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-5 h-5 text-red-600">
                            <FaXTwitter />
                          </span>
                          <a
                            href="https://x.com/Sporteloshop"
                            className="hover:text-white transition-colors hover:underline"
                          >
                            Twitter
                          </a>
                        </p>
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

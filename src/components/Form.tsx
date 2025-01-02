"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

function Form() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [otherInterest, setOtherInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInterestChange = (e: any) => {
    setInterest(e.target.value);
    if (e.target.value !== "other") {
      setOtherInterest(""); // Reset other interest when a specific option is selected
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the data object
    const formData = {
      name,
      phone,
      email,
      interest: interest === "other" ? otherInterest : interest,
    };

    try {
      const response = await fetch("https://sheetdb.io/api/v1/crz0ucxmjlg22", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [formData] }),
      });

      const data = await response.json();
      toast.success("Thank you for your submission! We'll get back to you soon");

      // Optionally reset form fields
      setName("");
      setPhone("");
      setEmail("");
      setInterest("");
      setOtherInterest("");
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="relative max-w-[90%] sm:max-w-md mx-auto p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10"
      style={{
        background: 'rgba(18, 18, 18, 0.4)',
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <p className="text-gray-300 font-['Quicksand'] text-center mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
        Be the first to experience the future of sports community. Join our
        waitlist and receive exclusive early access!
      </p>
      <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Your Name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 font-['Quicksand'] text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="Your Phone Number"
            name="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 font-['Quicksand'] text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 font-['Quicksand'] text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <select
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/50 border border-white/20 text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 font-['Quicksand'] text-sm sm:text-base"
            value={interest}
            name="Interest"
            onChange={handleInterestChange}
            required
          >
            <option value="" className="bg-black">
              Select Your Interest
            </option>
            <option value="cricket" className="bg-black">
              Cricket
            </option>
            <option value="basketball" className="bg-black">
              Football
            </option>
            <option value="badminton" className="bg-black">
              Badminton
            </option>
            <option value="other" className="bg-black">
              Other
            </option>
          </select>
        </div>
        {interest === "other" && (
          <div>
            <input
              type="text"
              placeholder="Please specify your interest"
              value={otherInterest}
              onChange={(e) => setOtherInterest(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 font-['Quicksand'] text-sm sm:text-base"
              required
            />
          </div>
        )}
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-700 to-red-500 text-white font-bold text-sm sm:text-base md:text-lg hover:from-red-800 hover:to-red-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg font-['Quicksand']"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default Form;

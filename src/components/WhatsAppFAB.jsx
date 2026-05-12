/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppFAB = ({ phone = "254700000000", message = "Hello KWES, I'd like to learn more." }) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with KWES on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-2xl shadow-green-900/40"
    >
      <MessageCircle size={26} strokeWidth={2.2} />
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />
    </motion.a>
  );
};

export default WhatsAppFAB;

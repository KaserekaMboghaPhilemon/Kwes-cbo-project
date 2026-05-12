import React from 'react';
import { motion } from 'framer-motion';

const ProgramCard = ({ title, description, icon, image, index = 0 }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-full p-2">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="text-green-600 hover:text-green-700 font-semibold transition">
          Learn More →
        </button>
      </div>
    </motion.div>
  );
};

export default ProgramCard;
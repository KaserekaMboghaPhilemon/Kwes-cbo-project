import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join us in empowering women and transforming communities in Kakuma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              Get Involved
            </Link>
            <Link
              to="/impact"
              className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition duration-300"
            >
              See Our Impact
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
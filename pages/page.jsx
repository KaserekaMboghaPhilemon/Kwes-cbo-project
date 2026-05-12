import React from 'react';
import Hero from '../app/components/Hero';
import ProgramCard from '../src/components/ProgramCard';
import CTA from '../src/components/CTA';
import poultryImg from '../src/Images/improved-kienyeji.jpg';
import eggImg from '../src/Images/women-cleaning.jpg';
import trainingImg from '../src/Images/women-working.jpg';
import businessImg from '../src/Images/compound-view.jpg';
import bakeryImg from '../src/Images/compound-clean.jpg';

const Home = () => {
  const programs = [
    {
      title: 'Poultry Farming',
      description: 'Raising 500 broilers and 500 kienyeji chickens for sustainable food production and income generation.',
      icon: '🐔',
      image: poultryImg
    },
    {
      title: 'Egg Collection & Supply',
      description: 'Efficient egg collection and distribution to local markets, creating a steady revenue stream.',
      icon: '🥚',
      image: eggImg
    },
    {
      title: 'Training & Empowerment',
      description: 'Comprehensive training programs for women and youth in business skills, financial literacy, and leadership.',
      icon: '📚',
      image: trainingImg
    },
    {
      title: 'Small Business Funding',
      description: 'Providing micro-financing and support for women-led small businesses in the community.',
      icon: '💼',
      image: businessImg
    },
    {
      title: 'Future: Bakery Program',
      description: 'Upcoming initiative to establish community bakeries, providing training in baking and food production.',
      icon: '🍞',
      image: bakeryImg
    }
  ];

  const stats = [
    { number: '32', label: 'Women Empowered', icon: '👩‍💼' },
    { number: '1000', label: 'Chickens Raised', icon: '🐔' },
    { number: '500', label: 'Families Supported', icon: '👨‍👩‍👧‍👦' },
    { number: '5', label: 'Founding Members', icon: '🤝' }
  ];

  return (
    <div>
      <Hero />

      {/* Programs Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                index={index}
                title={program.title}
                description={program.description}
                icon={program.icon}
                image={program.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default Home;
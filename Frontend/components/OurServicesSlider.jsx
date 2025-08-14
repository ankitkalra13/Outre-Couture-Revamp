
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sliderData from '@/lib/sliderData';
import Image from 'next/image';

const SLIDE_DURATION = 5000;

export default function OurServicesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
  const timer = setInterval(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % sliderData.titles.length);
  }, SLIDE_DURATION);

  return () => clearInterval(timer);
}, [activeIndex]);

  return (
    <section className='bg-[#F3F7FB] py-20 sm:py-10 sm:pb-0'>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-[60px] sm:mb-10">Our Services</h2>
        <div className='h-[500px] sm:h-[550px] flex sm:flex-col items-center justify-between relative overflow-hidden'>
          <div className="flex flex-col sm:w-full gap-6 z-10">
            {sliderData.titles.map((item, i) => (
              <div key={i} className="flex items-center gap-3"  onClick={() => setActiveIndex(i)}>
              
                <div className="w-1 h-12 sm:h-8 bg-gray relative overflow-hidden rounded">
                  {i === activeIndex && (
                    <motion.div
                      className="absolute left-0 top-0 w-full bg-brand"
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                    />
                  )}
                </div>
                <h2
                  className={`text-xl sm:text-base font-semibold cursor-pointer ${
                    i === activeIndex ? 'text-brand' : 'text-black'
                  }`}
                >
                  {item.title}
                </h2>
              </div>
            ))}
          </div>

          <div className="w-[60%] sm:w-full h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center w-full"
              >
                <div className="text-left w-full">
                  <Image width={400} height={400}
                    src={sliderData.content[activeIndex].image.src}
                    alt={`Slide ${activeIndex + 1}`}
                    className="w-full h-[400px] sm:h-auto object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-2xl font-bold mb-2">
                    {sliderData.content[activeIndex].SubHeading}
                  </h3>
                 
                  <p>
                    
                    {sliderData.content[activeIndex].Para}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

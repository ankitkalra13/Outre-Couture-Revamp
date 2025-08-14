'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import IMAGES from '@/lib/images';

const slides = [
  {
    type: 'video',
    src: '/assets/video/Banner-Video-1.mp4',
    alt: 'Banner Video 1',
  },
  {
    type: 'image',
    src: IMAGES.HomeNew.oneWebp,
    alt: 'Banner Image 1',
  },
  {
    type: 'video',
    src: '/assets/video/Banner-Video-2.mp4',
    alt: 'Banner Video 2',
  },
  {
    type: 'image',
    src: IMAGES.HomeNew.twoWebp,
    alt: 'Banner Image 2',
  },
  {
    type: 'video',
    src: '/assets/video/Banner-Video-3.mp4',
    alt: 'Banner Video 3',
  },
  {
    type: 'image',
    src: IMAGES.HomeNew.customDimensions,
    alt: 'Banner Image 3',
  },
];

export default function HomePageBannerSlider() {
  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Mousewheel]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 8000 }}
        speed={1000}
        pagination={{ clickable: true }}
        loop
        mousewheel={{ forceToAxis: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {slide.type === 'image' ? (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

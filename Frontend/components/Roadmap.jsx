import React from 'react';
import IMAGES from '@/lib/images';


const Roadmap = () => {
  return (
    <div className="overflow-hidden w-full">
      <div className="relative h-[270px] w-[500%]">
        <div className="absolute top-20 left-0 h-[180px] w-full bg-repeat-x z-[2]" style={{ backgroundImage: `url(${IMAGES.HomeNew.road.src})` }}></div>
        <div className="absolute bottom-[100px] left-0 right-0 mx-auto w-[85%] animate-scroll h-[160px] bg-no-repeat z-[3] bg-contain" style={{ backgroundImage: `url(${IMAGES.HomeNew.car.src})` }}></div>
      </div>
    </div>
  );
};

export default Roadmap;

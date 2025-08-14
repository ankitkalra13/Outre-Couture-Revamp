import IMAGES from '@/lib/images';
import Image from "next/image";

const AboutUsSection = () => {
  return (

    <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-between gap-10">
        {/* Text Section */}
        <div className="w-[60%]">
          <h2 className="text-3xl font-medium mb-4 border-b-2 border-black inline-block pb-1">
            About us
          </h2>
          <p className="text-base text-gray mb-3">
            In the fluctuating world of fashion leaving an exclusionary mark, Outre Couture has
            established a democratic model by being a solution-oriented enterprise. As a supporting
            company for the fashion and lifestyle brands, it constantly aspires to offer
            high-quality products with fast-moving services. Outre couture is one stop shop for all
            your business needs like product design & development, manufacturing and production
            control, to hassle free shipping world wide.
          </p>
          <p className="text-base text-gray mb-6">
            Setting its foot in the industry in the year 2015, the 'fashion-inclined- enterprise'
            has been evolving in leaps and bounds. So far, a major portion of its clientele involves
            international fashion/ lifestyle brands and importers across the globe. Its marketing
            office has been established in England, the U.K whereas its headquarter is located in
            Noida, India. At present, the company has been indulged in the formulation of 3000+
            product range and over 100+ factories that belongs to garment segment, bags and home
            décor. Moreover, their vertically associated factories, across Asian supply chains are
            well equipped for end-to-end apparel & accessories production.
          </p>
          <button className="theme-btn">
            KNOW MORE
          </button>

          <Image
              src={IMAGES.HomeNew.aboutCompany4.src}  
              alt="Model 1"
              width={200}
              height={300}
              className="object-cover w-full mt-5"
            />
        </div>

        {/* Image Collage Section */}
        <div className="w-[40%]">
          <div className="">
            <Image
              src={IMAGES.HomeNew.imageBoy.src}  
              alt="Model 1"
              width={200}
              height={300}
              className="object-cover w-full max-w-[500px] ml-auto"
            />
          </div>  
        </div>
    </div>
      
  );
};

export default AboutUsSection;

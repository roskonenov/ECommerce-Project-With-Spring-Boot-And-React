import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { slidesData } from '../../utils/slidesData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

const HeroBaner = () => {
  const colors = ['bg-banner-color1', 'bg-banner-color2', 'bg-banner-color3', 'bg-banner-color4', 'bg-banner-color5', 'bg-banner-color6',]
  return (
    <div className='py-2 rounded-md'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={{ prevEl: '.prev', nextEl: '.next' }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        fadeEffect={{crossFade: true}}
        effect='fade'
        spaceBetween={50}
        slidesPerView={1}
      >
        {slidesData.map((slide, i) => (
          <SwiperSlide>
            <div className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]}`}>
              <div className='h-full flex items-center justify-center'>
                <div className='hidden lg:flex justify-center w-1/2 p-8'>
                  <div className='text-center'>
                    <h3 className='text-3xl text-white font-bold'>
                      {slide.title}
                    </h3>
                    <h1 className='text-5xl text-white font-bold mt-2'>
                      {slide.subtitle}
                    </h1>
                    <p className='text-white font-bold mt-4'>
                      {slide.description}
                    </p>
                    <Link className='mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-700'>
                      Shop Now
                    </Link>
                  </div>
                </div>
                <div className='w-full flex justify-center lg:w-1/2'>
                  <img src={slide.image} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className='prev absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer text-2xl text-black'><FaArrowAltCircleLeft /></div>
        <div className='next absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer text-2xl text-black'><FaArrowAltCircleRight /></div>

      </Swiper>
    </div>
  );
};

export default HeroBaner;
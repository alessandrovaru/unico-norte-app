import React, { useEffect, useRef, useState } from 'react';
import { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.sass';
import { FaYoutube } from 'react-icons/fa';
import Tilt from '../Tilt';
import useWindowSize from '../../hooks/useWindowSize';
import { smoothScrollTo } from '../../utils/smoothScroll';

const MainCarrousel = ({ slider }) => {
  const [activeSlideKeyNumber, setActiveSlideKeyNumber] = useState('0');
  const swiperRef = useRef(null);
  const { width } = useWindowSize();

  useEffect(() => {
    setActiveSlideKeyNumber(width < 960 ? '1' : '0');
  }, [width]);

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    if (!swiperInstance) return;

    const onSlideChange = () => {
      if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
        smoothScrollTo(window.scrollY + 250, 2800);
      }
    };

    swiperInstance.on('slideChange', onSlideChange);
    return () => swiperInstance.off('slideChange', onSlideChange);
  }, []);
  

  const slideContent = slider.map((slider, index) => 
    <SwiperSlide key={index} className="slide" >
      {slider.image && 
        <>
          {!slider.video && 
            <>
              <div className="slider-image">
                <PreviewCompatibleImage imageInfo={slider} />
              </div>
            </>
          }
        </>
      }
      <div className="slider-text">
        <h2 style={{color:"white"}}>{slider.title}</h2>
        <h3 style={{color:"white"}}>{slider.subheading}</h3>
        <a aria-label='youtube-button' href={slider.youtube} target='_blank' rel='noreferrer'>
          <button><FaYoutube/><span>Ver en Youtube</span></button>
        </a>
      </div>
      {slider.video && 
        <>
          <video className='slider-video' controls autoPlay muted loop>
            <source src={slider.video.publicURL} type="video/mp4" />
          </video>
        </>
      }
    </SwiperSlide>
  )
  
  const options = {
    speed: 1000,
    max: 30
  };

  return (
    <Tilt className="box" options={options}>
      <Swiper
        ref={swiperRef}
        direction='vertical'
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        initialSlide={activeSlideKeyNumber}
        modules={[ Mousewheel]} // Add Mousewheel to the modules array
        mousewheel={true} // Enable mousewheel control
        className="mySwiper"
      >
        {slideContent}
      </Swiper>
    </Tilt>
  );
}

export default MainCarrousel;
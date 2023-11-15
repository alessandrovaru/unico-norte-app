import React, { useState, useEffect, useRef } from 'react';
import { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import 'swiper/css';
import 'swiper/css/pagination';
import VanillaTilt from 'vanilla-tilt';
import './styles.sass';
import { FaYoutube } from 'react-icons/fa';

const MainCarrousel = ({ slider }) => {
  const swiperRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 1024);

      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024);
      };

      window.addEventListener('resize', handleResize);

      // Clean up the event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  function Tilt(props) { 
    const { options, ...rest } = props;
    const tilt = useRef(null);

    useEffect(() => {
      if (!navigator.userAgent.match(/iPhone/i)) {
        VanillaTilt.init(tilt.current, options);
      }
    }, [options]);

    return <div ref={tilt} {...rest} />;
  }

  function isIOS() {
    if (typeof window !== 'undefined') {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    return false;
  }
  

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      const onSlideChange = () => {
        if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
          // Desactiva el control del mousewheel en la última diapositiva
          swiperInstance.mousewheel.disable();
        } else {
          // Asegúrate de que el control del mousewheel esté activado en otras diapositivas
          swiperInstance.mousewheel.enable();
        }
      };
  
      swiperInstance.on('slideChange', onSlideChange);
  
      return () => {
        swiperInstance.off('slideChange', onSlideChange);
      };
    }
  }, []);
  


  

  const slideContent = slider.map((slider, index) => 
    <SwiperSlide key={index} className="slide" >
      {slider.image && 
        <>
          {(!slider.video) && 
            <>
              <div className="slider-image">
                <PreviewCompatibleImage imageInfo={slider} />
              </div>
            </>
          }
          {(isIOS()) && 
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
      {slider.video && !isIOS() && 
        <>
          <video className='slider-video' autoPlay muted loop>
            <source src={slider.video.publicURL} type="video/mp4" />
          </video>
        </>
      }
    </SwiperSlide>
  )
  
  const options = {
    speed: 1000,
    max: 5,
  };

  return (
    <Tilt className="box main-carrousel-container" options={options}>
      <Swiper
        ref={swiperRef}
        direction={isDesktop ? 'horizontal' : 'vertical'}
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        
        mousewheel={true} // Enable mousewheel control
        className="mySwiper"
      >
        {slideContent}
      </Swiper>
    </Tilt>
  );
}

export default MainCarrousel;
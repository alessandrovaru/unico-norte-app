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
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 1024);
      window.addEventListener('resize', handleResize);
    }

    const setupSwiperEvents = () => {
      const swiperInstance = swiperRef.current?.swiper;
      if (swiperInstance) {
        const onSlideChange = () => {
          if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
            swiperInstance.mousewheel.disable();
          } else {
            swiperInstance.mousewheel.enable();
          }
        };

        swiperInstance.on('slideChange', onSlideChange);

        return () => {
          swiperInstance.off('slideChange', onSlideChange);
        };
      }
    };

    const swiperCleanup = setupSwiperEvents();

    if (typeof window !== 'undefined') {
      setIsIOS(/iPad|iPhone|iPod/i.test(navigator.userAgent) && !window.MSStream);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      swiperCleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swiperRef.current]);

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
          {isIOS && 
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
      {slider.video && !isIOS && 
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
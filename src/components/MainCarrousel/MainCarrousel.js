import React, { useEffect, useRef } from 'react';
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

  const smoothScrollTo = (endY, duration) => {
    const startY = window.scrollY;
    const diffY = endY - startY;
    let startTime;

    const easeInOutQuad = (time, start, diff, duration) => {
      time /= duration / 2;
      if (time < 1) return (diff / 2) * time * time + start;
      time--;
      return (-diff / 2) * (time * (time - 2) - 1) + start;
    };

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const time = timestamp - startTime;
      const newY = easeInOutQuad(time, startY, diffY, duration);
      window.scrollTo(0, newY);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;
    if (swiperInstance) {
      const onSlideChange = () => {
        // Check if we're on the last slide
        if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
          // Perform the automatic page scroll here
          smoothScrollTo(window.scrollY + 250, 2800);
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
    max: 5,
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
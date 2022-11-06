import React, { useEffect, useRef  } from 'react'
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import 'swiper/css';
import VanillaTilt from 'vanilla-tilt';
import './styles.sass'
import { FaYoutube } from 'react-icons/fa';


function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}




const MainCarrousel = ({slider}) => {
  console.log(slider);
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
        <a href={slider.youtube} target='_blank'>
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
        direction='vertical'
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {slideContent}
      </Swiper>
    </Tilt>
    
  )
}

export default MainCarrousel

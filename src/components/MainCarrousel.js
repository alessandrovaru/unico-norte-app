import React from 'react'


import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
// import Swiper core and required modules

// install Swiper modules



import 'swiper/css';
import { Link } from 'gatsby';
import Tilt from 'react-vanilla-tilt'


const MainCarrousel = ({slider}) => {
  const slideContent = slider.map((slider) => 
    <Tilt>
      <SwiperSlide className="slide" key={slider.title}>
        <div className="slider-image">
          <PreviewCompatibleImage imageInfo={slider} />
        </div>
        <div className="slider-text">
          <h2 style={{color:"white"}}>{slider.title}</h2>
          <h3 style={{color:"white"}}>{slider.subheading}</h3>
          <Link to={slider.youtube} target='_blank'>
            <button>Ver video</button>
          </Link>
          
        </div>
      </SwiperSlide>
    </Tilt>
  )
  return (
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
  )
}

export default MainCarrousel

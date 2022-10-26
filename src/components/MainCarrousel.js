import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import PreviewCompatibleImage from "../components/PreviewCompatibleImage";


import 'swiper/css';


const MainCarrousel = ({slider}) => {
  const slideContent = slider.map((slider) => 
    <>
      <SwiperSlide className="slide" key={slider.title}>
        <div className="slider-image">
          <PreviewCompatibleImage imageInfo={slider} />
        </div>
        <div className="slider-text">
          <h2 style={{color:"white"}}>{slider.title}</h2>
          <h3 style={{color:"white"}}>{slider.subheading}</h3>
        </div>
      </SwiperSlide>
    </>
  )
  return (
    <Swiper
      spaceBetween={50}
      direction="vertical"
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
     {slideContent}
    </Swiper>
  )
}

export default MainCarrousel

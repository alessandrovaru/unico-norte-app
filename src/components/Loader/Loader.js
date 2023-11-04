import React from 'react'

import loaderGif from '../../img/gif/logoLoader.gif'

const Loader = () => {
  return (
    <div 
      id='full-page-loader' 
      style={{
        position : "fixed",
        display : "flex",
        width : "100vw",
        height : "100vh",
        justifyContent : "center",
        alignItems : "center",
        zIndex : 600,
        backgroundColor : "#000"
      }}
    >
        <img src={loaderGif} border='0' alt='Logo único norte animado 2023'/>
    </div>
  )
}

export default Loader
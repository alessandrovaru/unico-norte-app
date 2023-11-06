import React from 'react'

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
        <img src='https://i.postimg.cc/zv34jFST/animacion-logo-full-glitch.gif' border='0' alt='Animación de carga...'/>
    </div>
  )
}

export default Loader
import React from 'react'

const Loader = () => {
  return (
    <div 
      id='full-page-loader' 
      style={{
        position : "fixed",
        display : "flex",
        flexDirection : "column",
        width : "100vw",
        height : "100vh",
        justifyContent : "center",
        alignItems : "center",
        zIndex : 600,
        backgroundColor : "#000"
      }}
    >
        <img src='https://i.postimg.cc/zv34jFST/animacion-logo-full-glitch.gif' border='0' alt='Animación de carga...'/>
        <p style={{color : "#fff", fontSize : "1.5rem"}}>Cargando...</p>
    </div>
  )
}

export default Loader
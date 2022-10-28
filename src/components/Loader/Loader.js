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
        <img src='https://i.postimg.cc/jdCd14p9/Logo-nico-norte-animado-2021-blanco-2.gif' border='0' alt='Logo-nico-norte-animado-2021-blanco-2'/>
    </div>
  )
}

export default Loader
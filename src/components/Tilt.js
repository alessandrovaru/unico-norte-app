// components/Tilt.js
import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

const Tilt = ({ options, children }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    // Capture the current state of tiltRef
    const tiltNode = tiltRef.current;

    if (tiltNode && !navigator.userAgent.match(/iPhone/i)) {
      VanillaTilt.init(tiltNode, options);
    }

    // Use the captured value in the cleanup function
    return () => tiltNode?.vanillaTilt.destroy();
  }, [options]); // Only re-run if options change

  return <div ref={tiltRef}>{children}</div>;
};

export default Tilt;

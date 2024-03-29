import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import { useEffect } from "react";
import MiniFooter from "./MiniFooter/MiniFooter";


import AOS from 'aos';
import 'aos/dist/aos.css';


const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  useEffect(() => {
    try {
      const element = document.getElementById("full-page-loader")
      if (element) element.parentNode.removeChild(element)
    } catch(error) {
      console.log(error)
    }
  })
  if (typeof window !== 'undefined') {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
      
    
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 120, // values from 0 to 3000, with step 50ms
      duration: 2200, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    
    });
  }
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          rel="icon"
          type="image/ico"
          href={`${withPrefix("/")}img/favicon.ico`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/ico"
          href={`${withPrefix("/")}img/favicon.ico`}
          sizes="16x16"
        />

        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image-1.jpg`}
        />
      </Helmet>
      <Navbar />
      <div className="page-children">{children}</div>
      <Footer />
      <MiniFooter />
    </div>
  );
};

export default TemplateWrapper;

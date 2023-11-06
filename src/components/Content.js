import * as React from 'react';
import PropTypes from 'prop-types';

// HTMLContent component with useEffect for iframe styling
export const HTMLContent = ({ content, className }) => {
  React.useEffect(() => {
    // Find any iframes in the content
    const iframes = document.querySelectorAll(`.${className} iframe`);
  
    // Create a wrapper div around each iframe to control aspect ratio
    iframes.forEach(iframe => {
      // Create a wrapper element for the iframe
      const wrapper = document.createElement('div');
      // Set the CSS class for styling
      wrapper.className = 'iframe-wrapper';
      // Use padding-top to create the aspect ratio effect
      wrapper.style.position = 'relative';
      wrapper.style.paddingTop = '56.25%'; // 16:9 aspect ratio
      // Ensure the iframe is absolutely positioned within the wrapper
      iframe.style.position = 'absolute';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.left = '0';
      iframe.style.top = '0';
  
      // Insert the wrapper into the DOM and move the iframe inside it
      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    });
  
    // Cleanup function to remove the wrapper and reset styles on unmount
    return () => {
      iframes.forEach(iframe => {
        // Remove the iframe from the wrapper and remove the wrapper
        const wrapper = iframe.parentNode;
        if(wrapper.className === 'iframe-wrapper') {
          wrapper.parentNode.insertBefore(iframe, wrapper);
          wrapper.parentNode.removeChild(wrapper);
        }
  
        // Reset iframe styles
        iframe.style.position = '';
        iframe.style.width = '';
        iframe.style.height = '';
        iframe.style.left = '';
        iframe.style.top = '';
      });
    };
  }, [content, className]); // Depend on content and className to re-apply styles if they change

  return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
};

HTMLContent.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};

// Content component with useEffect for iframe styling
const Content = ({ content, className }) => {
  React.useEffect(() => {
    // Find any iframes in the content
    const iframes = document.querySelectorAll(`.${className} iframe`);
    iframes.forEach(iframe => {
      // Set the width and height on the iframe
      iframe.style.width = '100%';
      iframe.style.height = '500px';
    });

    // Cleanup function to reset styles on unmount
    return () => {
      iframes.forEach(iframe => {
        iframe.style.width = '';
        iframe.style.height = '';
      });
    };
  }, [content, className]); // Depend on content and className to re-apply styles if they change

  return <div className={className}>{content}</div>;
};

Content.propTypes = {
  content: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Content;

import * as React from 'react';
import PropTypes from 'prop-types';

// HTMLContent component with useEffect for iframe styling
export const HTMLContent = ({ content, className }) => {
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

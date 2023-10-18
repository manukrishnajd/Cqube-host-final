import React, { useState, useEffect, useRef } from 'react';
import './TreeNode.css'; // Import the CSS file for styling

const TreeNode = ({ data, isRoot }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const adjustTextPosition = () => {
      if (cardRef.current) {
        const card = cardRef.current;
        const text = card.querySelector('.node-text');

        // Reset styles
        text.style.top = '50%';
        text.style.transform = 'translateY(-50%)';

        // Check if text overflows horizontally
        if (text.scrollWidth > text.offsetWidth) {
          // Align text vertically
          text.style.top = 'initial';
          text.style.transform = 'none';
        }
      }
    };

    // Adjust text position on initial render and window resize
    adjustTextPosition();
    window.addEventListener('resize', adjustTextPosition);
    return () => {
      window.removeEventListener('resize', adjustTextPosition);
    };
  }, []);

  const cardWidth = isOpen ? '50%' : '50%'; // Adjust the card width based on whether it's open or closed
  const cardHeight = isOpen ? '100px' : '100px'; // Adjust the card height based on whether it's open or closed

  return (
    <div className={`relative ${isOpen ? 'go-forward' : 'tilt-right'}`}>
      <br />
      <br />
      <br />
      <div
        onClick={toggleNode}
        ref={cardRef}
        className={`text-white cursor-pointer mb-10 rounded-lg border border-red p-4 text-center inline-block ${isOpen ? 'bg-red' : 'bg-black'}`}
        style={{ width: cardWidth, height: cardHeight }}
      >
        <div className="node-text">{data.name}</div>
      </div>
      {isOpen && data.children && (
        <div className="text-white flex justify-between mt-10">
          {data.children.map((child, index) => (
            <TreeNode key={index} data={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;

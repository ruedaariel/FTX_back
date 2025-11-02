
import React from 'react';

const HeroImageSection = ({ image, logo }) => {
  return (
    <div
      className="hero-image"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="hero-overlay">
        {logo && <img src={logo} alt="Logo" style={{ width: 140, height: 'auto' }} />}
      </div>
    </div>
  );
};

export default HeroImageSection;

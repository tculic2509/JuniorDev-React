import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ ocjena, postaviOcjenu }) => {
  const maxStars = 5;

  const handleStarClick = (index) => {
    postaviOcjenu(index + 1); 
  };

  return (
    <div>
      {Array.from({ length: maxStars }, (star, index) => (
        <FaStar
          key={index}
          onClick={() => handleStarClick(index)}
          color={index < ocjena ? '#ffc107' : '#e4e5e9'}
          size={24}
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};

export default StarRating;

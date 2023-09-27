import React, { useState } from 'react';
import "../styles/star-rating//star-rating.css";

const StarRating = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

    const handleMouseOver = (index) => {
        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (index) => {
        setRating(index);
    };

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hoverRating || rating) ? "on" : "off"}
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
            {hoverRating > 0 && <span>{labels[hoverRating - 1]}</span>}
        </div>
    );
};

export default StarRating;

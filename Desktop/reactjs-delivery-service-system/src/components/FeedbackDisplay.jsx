
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/feedback-display/feedback.css";

const FeedbackDisplay = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/v1/reviews`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            // Ensure that reviews is always an array
            setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
        })
        .catch(error => {
            console.error("Error fetching reviews:", error);
        });
    }, []);

    return (
        <div className="feedback-display">
            <h2>Client Feedback</h2>
            {reviews && reviews.map((review, index) => (  // Add a conditional check here
                <div key={index} className="review-item">
                    <p><strong>{review.name}</strong></p>
                    <p><strong>Rating:</strong> {[...Array(review.rating)].map((_, i) => '★').join('')}</p>
                    <p>{review.text}</p>
                </div>
            ))}
        </div>
    );
};

export default FeedbackDisplay;

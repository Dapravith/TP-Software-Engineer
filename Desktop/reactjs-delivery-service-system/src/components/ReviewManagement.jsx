import React, { useState } from 'react';
import axios from 'axios';
import "../styles/review-feeback-page/feedback.css";

const ReviewManagement = () => {
    const [name, setName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const handleReviewSubmit = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/v1/reviews`, { name: name, text: reviewText, rating: rating }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setAlertMessage('Review submitted successfully!');
            setTimeout(() => setAlertMessage(''), 3000); // Hide alert after 3 seconds
        })
        .catch(error => {
            console.error("Error submitting review:", error);
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxSize = 300; // Set to desired maximum size
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                setProfileImage(canvas.toDataURL('image/jpeg'));
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    return (
    <div className="review-management">
        <h2>Review Our Service System</h2>

        <div className="profile-section">
            <h3>Your Profile</h3>
            <div className="profile-inputs">
                <div className="name-input">
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                </div>
                <div className="image-input">
                    <label>Upload Profile Image:</label>
                    <input type="file" onChange={handleImageChange} />
                    {profileImage && <img src={profileImage} alt="Profile" className="uploaded-image" />}
                </div>
            </div>
        </div>

        <div className="review-section">
            <h3>Your Review</h3>
            <textarea 
                value={reviewText} 
                onChange={(e) => setReviewText(e.target.value)} 
                placeholder="Share your experience with our system..."
            />
            <div className="rating-section">
                <label>Rating:</label>
                {[...Array(5)].map((_, i) => (
                    <span key={i} 
                        className={`star ${i < rating ? 'filled' : ''}`} 
                        onClick={() => setRating(i + 1)}>
                        ★
                    </span>
                ))}
            </div>
            <div className="button-group">
                <button className="cancel-button" onClick={() => {
                    setName('');
                    setReviewText('');
                    setRating(0);
                    setProfileImage(null);
                }}>Cancel</button>
                <button onClick={handleReviewSubmit}>Send</button>
            </div>
            {alertMessage && (
                <div className="alert-message">
                    {alertMessage}
                </div>
            )}
        </div>
    </div>
);
};

export default ReviewManagement;

import React, { useEffect, useState } from "react";
import "../styles/home/home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import ReviewManagement from './ReviewManagement';
import FeedbackDisplay from './FeedbackDisplay';
import StarRating from './StarRating';
import RightTopAlert from "./RightTopAlert";

const success = "#3a913a";
const danger = "#da5050";
export default function Home() {
    const redirect = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [item, setItem] = useState({});
    const [searching, setSearching] = useState(false);
    const [packageBranches, setPackageBranches] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [branchOwners, setBranchOwners] = useState([]);
    const [feedbackName, setFeedbackName] = useState('');
    const [feedbackReview, setFeedbackReview] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(0);
    const [showFeedbackAlert, setShowFeedbackAlert] = useState(false);
   const [profilePic, setProfilePic] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
   const [showAlert, setShowAlert] = useState(false);




    const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
};

    const [packageNotFound, setPackageNotFound] = useState(false);
    const [hiding, setHiding] = useState(false);
    const findPackageFunction = (code) => {
        if (code.length < 5) {
            return;
        }
        setHiding(true);
        setPackageBranches([]);
        axios.get(`${process.env.REACT_APP_BACKEND}/v1/all/items`).then(data => {
            if (data.data.message === "SUCCESS") {
                setSearching(true);
                const items = data.data.data;
                for (const value of items) {
                    if (value.packageCode === code) {
                        setItem(value);
                        setSearching(true);
                        setPackageNotFound(false);
                    } else {
                        setPackageNotFound(true);
                        setSearching(false);
                    }
                }
            }
        })
    }

    const [stillLoading, setStillLoading] = useState(false);

    const [feedback, setFeedback] = useState('');  // State for feedback input

    const handleFeedbackSubmit = () => {
    const formData = new FormData();
    formData.append('name', feedbackName);
    formData.append('review', feedbackReview);
    formData.append('rating', feedbackRating);
    if (profilePic) {
        formData.append('profilePic', profilePic);
    }

    axios.post(`${process.env.REACT_APP_BACKEND}/v1/feedback`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        setFeedbackName('');  
        setFeedbackReview('');
        setFeedbackRating(0);
        setProfilePic(null);
        handleCloseModal();

        // Show feedback alert
        setShowFeedbackAlert(true);
        setTimeout(() => setShowFeedbackAlert(false), 3000);  // Hide the alert after 3 seconds
    })
    .catch(error => {
        console.error("Error submitting feedback:", error);
    });
};


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/v1/branch-owners`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
        setBranchOwners(response.data.data);
    })
    .catch(error => {
        console.error("Error fetching branch owners:", error);
    });
        if (Object.keys(item).length > 0) {
            setStillLoading(true);
            const startBranch = item.initializeBranchId;
            const middleBranches = JSON.parse(item.middleBranchId);
            const endBranch = item.finalBranchId;
            const packageLocations = [(middleBranches[0] !== startBranch) && startBranch, ...middleBranches, endBranch].filter(id => id !== false);
            console.log(packageLocations)
            axios.get(`${process.env.REACT_APP_BACKEND}/v1/all/branch-owners`).then(data => {
                if (data.data.message === "SUCCESS") {
                    setSearching(true);
                }
                const branches = data.data.data;
                let list = []
                for (const value of packageLocations.slice(0, packageLocations.length - 1)) {
                    const findMatchBranch = branches.filter(data => data._id === value);
                    list.push({id: findMatchBranch[0]._id, city: findMatchBranch[0].city, arrivalStatus: "delivered"});
                }
                if (packageLocations[packageLocations.length - 1] === list[list.length - 1].id) {
                    const findMatchBranch = branches.filter(data => data._id === packageLocations[packageLocations.length - 1]);
                    list.push({id: findMatchBranch[0]._id, city: findMatchBranch[0].city, arrivalStatus: "delivered"});
                } else {
                    const findMatchBranch = branches.filter(data => data._id === packageLocations[packageLocations.length - 1]);
                    list.push({id: findMatchBranch[0]._id, city: findMatchBranch[0].city, arrivalStatus: "pending"})
                }
                if (packageLocations[packageLocations.length - 1] === list[list.length - 1].id && list[list.length - 1].arrivalStatus === "delivered") {
                    setPackageBranches(list.slice(0, list.length - 1));
                } else {
                    setPackageBranches(list);
                }
            })
        }
    }, [item]);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_BACKEND}/redirect-admin`, {token: localStorage.getItem("token")}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            if (data.data.message === "admin") {
                redirect("/admin/dashboard");
                setLoading(false);
            }
        })
        axios.post(`${process.env.REACT_APP_BACKEND}/redirect-branch-owner`, {token: localStorage.getItem("token")}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            console.log(data)
            if (data.data.message === "branch-owner") {
                redirect("/branch-owner/dashboard");
                setLoading(false);
            }
        })
        axios.get(`${process.env.REACT_APP_BACKEND}/v1/branch-owners`) // Adjust the endpoint if needed
        .then(response => {
            setBranchOwners(response.data);
        })
        .catch(error => {
            console.error("Error fetching branch owners:", error);
        });
    }, []);

    return (
        <div className="home">
            {/* <ReviewManagement /> */}
            {/* {JSON.stringify(packageBranches)} */}
            <div className="home-header">
                <h1>CAMBO <span>EXPRESS</span></h1>
                <Link to={"/login"}><button>Login</button></Link>
            </div>
            <div className="home-search">
                <h1>Search Your Package Here</h1>
                <div className="search">
                    <input type="text" onKeyDown={e => {
                        if (e.key === "Enter") {
                            return findPackageFunction(searchValue);
                        }
                    }} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Input your package code..." />
                    <button onClick={() => findPackageFunction(searchValue)}>Find Now</button>
                </div>
            </div>
            {JSON.stringify(searching)}
            {(packageBranches.length === 0 && searching) && <div className="search-loading">
                <div className="loading"></div>
            </div>}
            {!hiding && <div className="results-alert">
                <div className="results-alert-content">
                    <i className="fa fa-cube"></i>
                    <p>Your search results will be shown here.</p>
                </div>
            </div>}
            <div className="feedback-display-section">
    <h3>Customer Feedbacks:</h3>
    {feedbacks.map(feedback => (
        <div key={feedback._id} className="feedback-item">
            <h4>{feedback.name}</h4>
            <p>{feedback.review}</p>
            <div className="rating">
                {[...Array(feedback.rating)].map((_, index) => (
                    <span key={index}>&#9733;</span>  // Display stars based on rating
                ))}
            </div>
        </div>
    ))}
</div>

               <div className="feedback-button-container">
                <button onClick={handleOpenModal}>Submit Feedback</button>
    <RightTopAlert 
    message="Feedback was sent successfully!" 
    onClose={() => setShowAlert(false)}
/>

</div>

            {isModalOpen && (
    <div className="modal">
        <div className="feedback-modal">
    <h2 className="feedback-header">Customer's Feedback Form</h2>
    <label>Name:</label>
     <input type="text" value={feedbackName} onChange={(e) => setFeedbackName(e.target.value)} placeholder="Enter your name" />

    <label>Profile Image:</label>
   <input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />

    <label>Review:</label>
    <textarea value={feedbackReview} onChange={(e) => setFeedbackReview(e.target.value)} placeholder="Leave Your feedback to our service system ..."></textarea>

    <label>Rating:</label>
<StarRating rating={feedbackRating} setRating={setFeedbackRating} />

    {/* <label>Select Branch Owner:</label>
    <select value={selectedBranchOwner} onChange={(e) => setSelectedBranchOwner(e.target.value)}>
    {branchOwners && branchOwners.length > 0 && branchOwners.map(owner => (
    <option key={owner._id} value={owner._id}>{owner.name}</option>
))}
</select> */}

    <div className="modal-buttons">
         <button onClick={handleCloseModal}>Cancel</button>
        <button onClick={handleFeedbackSubmit}>Submit</button>
    </div>
</div>

    </div>
)}
            {<div className="results-alert">
                <div className="results-alert-content">
                    <h3>¯\_(ツ)_/¯</h3>
                    <p>Oops! Your package could not be found,<br/>try entering the correct package code.</p>
                </div>
            </div>}
            {packageBranches.length > 0 && <div className="home-arrival-message">
                <div className="home-arrival-message-content" style={{background: packageBranches.filter(data => data.arrivalStatus === "delivered").length === packageBranches.length ? success : danger}}>
                    <p>{packageBranches.filter(data => data.arrivalStatus === "delivered").length === packageBranches.length ? <span>Your package has arrived to branch <b>{packageBranches[packageBranches.length - 1]?.city}</b>.</span> : <span>Your package hasn't arrived to branch <b>{packageBranches[packageBranches.length - 1]?.city}</b> yet.</span>}</p>
                </div>
            </div>}
            {packageBranches.length > 0 && <div className="home-arrival-status">
                <div className="arrival-status">
                    {
                        packageBranches.map((data, index) => {
                            return <div className="branch-arrival-status" key={index}>
                                <div className="branch-arrival-status-circle" style={{borderColor: data.arrivalStatus === "delivered" ? success : "gray"}}>
                                    <div className="branch-arrival-status-circle-inner" style={{background: data.arrivalStatus === "delivered" ? success : "gray"}}>
                                        <div className="branch-arrival-city" style={{top: index % 2 !== 0 && "-60px", bottom: index % 2 === 0 && "-60px", background: data.arrivalStatus === "delivered" ? success : danger}}>
                                            <div className="cursor" style={{bottom: index % 2 !== 0 && "-6px", top: index % 2 === 0 && "-6px", background: data.arrivalStatus === "delivered" ? 
                                            success : danger}}>

                                            </div>
                                            {
                                                data.city.split("").map((letter, idx) => {
                                                    return <p key={idx}>{letter === " " ? <span id="space"></span> : letter}</p>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                {!(index === packageBranches.length - 1) && <div className="thread" style={{background: packageBranches[index + 1]?.arrivalStatus === "delivered" ? success : ""}}></div>}
                            </div>
                        })
                    }
                </div>
            </div>}
        </div>
    )
}
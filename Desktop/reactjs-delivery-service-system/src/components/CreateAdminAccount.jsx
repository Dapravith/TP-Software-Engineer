import React, { useEffect, useState } from "react";
import RightTopAlert from "./RightTopAlert";
import "../styles/create-admin-account/create-admin-account.css";
import axios from "axios";
export default function CreateAdminAccount(props) {
    const {tab, setTab} = props;
    const genders = ["Male", "Female"];
    const [genderSelect, setGenderSelect] = useState(0);
    const gender = ["M", "F"];

    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    // const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    // const [state, setState] = useState("");
    // const [postalCode, setPostalCode] = useState("");
    // const [locationLat, setLocationLat] = useState("");
    // const [locationLong, setLocationLong] = useState("");
    const [about, setAbout] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [inputFileValue, setInputFileValue] = useState("");
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setInputFileValue(e.target.files[0].name);
    };
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);
    const [created, setCreated] = useState(false);
    const handleCreateAdminAccount = (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setPasswordNotMatch(true);
            return;
        }
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("gender", gender[genderSelect]);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("profile", selectedFile);
            formData.append("phoneNumber", phoneNumber);
            // formData.append("address", address);
            // formData.append("city", city);
            // formData.append("state", state);
            // formData.append("postalCode", postalCode);
            formData.append("about", about);
            // formData.append("locationLat", locationLat);
            // formData.append("locationLong", locationLong);

            if (selectedFile !== null) {
                axios.post(`${process.env.REACT_APP_BACKEND}/admin/register`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(data => {
                    console.log(data);
                    if (data.data.message === "Admin Account Created Successfully!") {
                        setCreated(true);
                        setTab(4);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if (passwordNotMatch) {
            setTimeout(() => {
                setPasswordNotMatch(false);
            }, 3000)
        }
        setTimeout(() => {
            setCreated(false);
        }, 3000)
    }, [passwordNotMatch, created])
    return (
        <div className="create-branch-account">
            {passwordNotMatch && <RightTopAlert content={"Password And Repeat Password Does Not Match!"} type="FAILED" />}
            {created && <RightTopAlert content={"Admin Account Created Successfully!"} type="SUCCESS" />}
            <div className="create-branch-account-title">
                <h1>Create Admin Account</h1>
            </div>
            <form onSubmit={handleCreateAdminAccount}>
                <div>
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div>
                <label>Gender</label>
                    <div className="genders">
                        {
                            genders.map((data, index) => {
                                return <div className="gender" key={data} onClick={() => setGenderSelect(index)}>
                                    <div className="gender-choice">
                                        <div className="gender-choice-inner" style={{background: genderSelect === index ? "black" : ""}}>

                                        </div>
                                    </div>
                                    <p>{data}</p>
                                </div>
                            })
                        }
                    </div>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="text" placeholder="089 673 945" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                </div>
                <div>
                    <label>Email Address</label>
                    <input type="email" placeholder="johndoe@gmail.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Repeat Password</label>
                    <input type="password" placeholder="Repeat Password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} required />
                </div>
                {/* <div>
                    <label>Address</label>
                    <input type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
                </div> */}
                {/* <div>
                    <label>City</label>
                    <input type="text" placeholder="Phnom Penh" value={city} onChange={e => setCity(e.target.value)} required />
                </div> */}
                {/* <div>
                    <label>State</label>
                    <input type="text" placeholder="Toul Kork" value={state} onChange={e => setState(e.target.value)} required />
                </div>
                <div>
                    <label>Postal Code</label>
                    <input type="text" placeholder="12000" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
                </div>
                <div>
                    <label>Location Latitude</label>
                    <input type="number" placeholder="10.2390482" value={locationLat} onChange={e => setLocationLat(e.target.value)} required />
                </div>
                <div>
                    <label>Location Longitude</label>
                    <input type="number" placeholder="12.1239873" value={locationLong} onChange={e => setLocationLong(e.target.value)} required />
                </div> */}
                <div>
                    <label>About</label>
                    <textarea placeholder="Describe about branch owner..." value={about} onChange={e => setAbout(e.target.value)}></textarea>
                </div>
                <div>
                    <label>Profile Image</label>
                    <input id="file-upload" type="file" onChange={handleFileChange} style={{display: "block", opacity: 0, height: 0}} accept="image/*" required />
                    <p>{inputFileValue}</p>
                    <div id="browse" onClick={() => {
                        const inputFile = document.getElementById("file-upload");
                        inputFile.click();
                    }}><svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-name="Layer 3"><path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"></path><path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"></path></svg>Browse</div>
                </div>
                <div>
                    <button type="submit" id="create">Create An Admin Account</button>
                </div>
            </form>
        </div>
    )
}
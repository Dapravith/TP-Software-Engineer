import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/admin-profile/admin-profile.css";
import RightTopAlert from "./RightTopAlert";
export default function AdminProfile(props) {

    const {username, profile, gender, about, phone, email, profileImage, changes, setChanges} = props;

    const [adminUsername, setAdminUsername] = useState(username);
    const [adminEmail, setAdminEmail] = useState(email);
    const [adminAbout, setAdminAbout] = useState(about);
    const [adminPhoneNumber, setAdminPhoneNumber] = useState(phone);
    // const [brPhone, setBrPhone] = useState(phone);
    // const [brAddress, setBrAddress] = useState(address);
    // const [brState, setBrState] = useState(state);
    // const [brPostal, setBrPostal] = useState(postal);
    // const [brDescription, setBrDescription] = useState(description);

    const [updated, setUpdated] = useState(false);
    const updateAdminInformation = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/admin/profile/update`, {
            token: localStorage.getItem("token"),
            username: adminUsername,
            email: adminEmail,
            phoneNumber: adminPhoneNumber,
            about: adminAbout,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            if (data.data.message === "Admin Profile Updated Successfully!") {
                setUpdated(true);
                setEdit(false);
                setChanges(!changes);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const [edit, setEdit] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);

    const [passwordChanged, setPasswordChanged] = useState(false);
    const [notLong, setNotLong] = useState(false);
    const handleChangeAdminPassword = () => {
        if (newPassword === repeatNewPassword && newPassword.length < 6) {
            setNotLong(true);
            setNewPassword("");
            setRepeatNewPassword("");
            return;
        }
        if (newPassword !== repeatNewPassword) {
            setPasswordNotMatch(true);
            setNewPassword("");
            setRepeatNewPassword("");
            return;
        }
        axios.post(`${process.env.REACT_APP_BACKEND}/admin/profile/update/password`, {
            password: newPassword,
            token: localStorage.getItem("token")
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            if (data.data.message === "Admin Password Updated Successfully!") {
                setPasswordChanged(true);
                setChangePassword(false);
                setNewPassword("");
                setRepeatNewPassword("");
            }
        })
    }

    const [uploadProfile, setUploadProfile] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    const [profileUpdated, setProfileUpdated] = useState(false);
    const handleChangeAdminProfileImage = () => {
        const getProfileContent = profileImage.slice(8);
        axios.delete(`${process.env.REACT_APP_BACKEND}/images/${getProfileContent}`);
        const formData = new FormData();
        formData.append("profile", selectedFile);
        axios.put(`${process.env.REACT_APP_BACKEND}/admin/profile/update/${profile}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            if (data.data.message === "Admin Profile Updated Successfully!") {
                setProfileUpdated(true);
                setUploadProfile(false);
                setChanges(!changes);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        if (updated) {
            setTimeout(() => {
                setUpdated(false);
            }, 3000);
        }
        setTimeout(() => {
            setPasswordNotMatch(false);
            setPasswordChanged(false);
            setNotLong(false);
            setProfileUpdated(false);
        }, 3000)
    }, [updated, passwordNotMatch, passwordChanged, notLong, profileUpdated]);
    return (
        <div className="admin-profile-container">
            {uploadProfile && <div className="alert-upload-profile">
                <div className="upload-profile">
                    <h1>Upload Profile Image</h1>
                    <input type="file" onChange={handleFileChange} />
                    <div className="upload-profile-btn">
                        <button onClick={() => setUploadProfile(false)}>Cancel</button>
                        <button onClick={handleChangeAdminProfileImage}>Upload</button>
                    </div>
                </div>
            </div>}
            {updated && <RightTopAlert content={"All Changes Saved!"} type={"SUCCESS"} />}
            {profileUpdated && <RightTopAlert content={"Admin Profile Updated Successfully, Refresh Page!"} type={"SUCCESS"} />}
            {passwordNotMatch && <RightTopAlert content={"New Password And Repeat New Password Does Not Match!"} type={"FAILED"} />}
            {passwordChanged && <RightTopAlert content={"New Password Changed Successfully!"} type={"SUCCESS"} />}
            {notLong && <RightTopAlert content={"New Password Must Be At Least 6 Characters Long!"} type={"FAILED"} />}
            <div className="branch-owner-profile-title">
                <h1>Admin Profile</h1>
            </div>
            <div className="branch-owner-profile-container">
                <div className="br-profile">
                    <div className="branch-owner-profile-image" style={{background: `url(${process.env.REACT_APP_BACKEND}/admin/profile/${profile}) no-repeat`}}>
                        <div className="edit-profile-image">
                            <button onClick={() => setUploadProfile(true)}>Upload New Profile Image</button>
                        </div>
                    </div>
                    {(!edit && !changePassword) && <button onClick={() => setEdit(true)}>Edit Profile</button>}
                </div>
                <div className="branch-owner-profile-container-content">
                    <div className="branch-owner-content">
                        <h3>Name</h3>
                        {!edit && <p>{gender === "M" ? "Mr." : "Mrs."} {adminUsername}</p>}
                        {edit && <input type="text" value={adminUsername} onChange={e => setAdminUsername(e.target.value)} />}
                    </div>
                    <div className="branch-owner-content">
                        <h3>Email</h3>
                        {!edit && <p>{adminEmail}</p>}
                        {edit && <input type="text" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} />}
                    </div>
                    <div className="branch-owner-content">
                        <h3>Phone Number</h3>
                        {!edit && <p>{adminPhoneNumber}</p>}
                        {edit && <input type="text" value={adminPhoneNumber} onChange={e => setAdminPhoneNumber(e.target.value)} />}
                    </div>
                    {/* <div className="branch-owner-content">
                        <h3>Address</h3>
                        {!edit && <p>{brAddress}</p>}
                        {edit && <input type="text" value={brAddress} onChange={e => setBrAddress(e.target.value)} />}
                    </div>
                    <div className="branch-owner-content">
                        <h3>City</h3>
                        {!edit && <p>{brCity}</p>}
                        {edit && <input type="text" value={brCity} onChange={e => setBrCity(e.target.value)} />}
                    </div>
                    <div className="branch-owner-content">
                        <h3>State</h3>
                        {!edit && <p>{brState}</p>}
                        {edit && <input type="text" value={brState} onChange={e => setBrState(e.target.value)} />}
                    </div>
                    <div className="branch-owner-content">
                        <h3>Postal Code</h3>
                        {!edit && <p>{brPostal}</p>}
                        {edit && <input type="text" value={brPostal} onChange={e => setBrPostal(e.target.value)} />}
                    </div> */}
                    <div className="branch-owner-content">
                        <h3>About</h3>
                        {!edit && <p>{adminAbout}</p>}
                        {edit && <textarea type="text" value={adminAbout} onChange={e => setAdminAbout(e.target.value)}></textarea>}
                    </div>
                    {(!changePassword && !edit) && <div className="branch-owner-content">
                        <button onClick={() => setChangePassword(true)}>Change Password</button>
                    </div>}
                    {changePassword && <div className="branch-owner-content">
                        <h3>New Password</h3>
                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
                    </div>}
                    {changePassword && <div className="branch-owner-content">
                        <h3>Repeat New Password</h3>
                        <input type="password" value={repeatNewPassword} onChange={e => setRepeatNewPassword(e.target.value)} placeholder="Repeat New Password" />
                    </div>}
                    {(edit || changePassword) && <div className="save">
                        <button onClick={() => {
                            if (changePassword) {
                                setChangePassword(false);
                                setNewPassword("");
                                setRepeatNewPassword("");
                            } else {
                                setEdit(false)
                            }
                        }}>Cancel</button>
                        <button onClick={changePassword ? () => handleChangeAdminPassword() : () => updateAdminInformation()}>Save Changes</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import BranchOwnerDetails from "./BranchOwnerDetails";
import axios from "axios";
import RightTopAlert from "./RightTopAlert";
export default function BranchOwnerList() {
    const [data, setData] = useState([]);

    const [branchDetails, setBranchDetails] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const getBranchDetails = id => {
        setShowDetails(true);
        return data.map(data => {
            if (data._id === id) {
                setBranchDetails(data);
            }
        })
    }

    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [getIdToDelete, setGetIdToDelete] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [removedBranch, setRemovedBranch] = useState(false);
    const filteredData = data.filter(branch => 
  branch.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
  branch.city.toLowerCase().includes(searchTerm.toLowerCase())
);

    const deleteBranchOwnerAccount = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND}/admin/branch-owner/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            if (data.data.message === "Branch Owner Account Deleted Successfully!") {
                setRemovedBranch(true);
                setShowAlertDelete(false);
            }
        })
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/admin/branch-owner/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setData(data.data);
        }).catch(err => {
            return err;
        })
    }, [removedBranch]);
    useEffect(() => {
        setTimeout(() => {
            setRemovedBranch(false);
        }, 3000)
    }, [removedBranch])
    return (
        <div className="branch-owner-container">
            {showAlertDelete && <div className="alert-delete-branch-container">
                <div className="alert-delete-branch">
                    <h1>Are you sure that you want to delete branch <span style={{fontWeight: "bold"}}>{data.filter(branch => {
                        return branch._id === getIdToDelete
                    })[0].city}</span>?</h1>
                    <div className="alert-delete-branch-btn">
                        <button onClick={() => setShowAlertDelete(false)}>No</button>
                        <button onClick={() => deleteBranchOwnerAccount(getIdToDelete)}>Yes</button>
                    </div>
                </div>
            </div>}
            {removedBranch && <RightTopAlert content={"Branch Owner Account Deleted Successfully!"} type={"SUCCESS"} />}
            {showDetails && <div className="branch-owner-details-path">
                <p><span onClick={() => setShowDetails(false)}>All Branch Owners</span> / Branch Owner Details ({branchDetails.city})</p>
            </div>}
            {showDetails && <BranchOwnerDetails id={branchDetails._id} username={branchDetails.username} email={branchDetails.email} profile={branchDetails.profile} phoneNumber={branchDetails.phoneNumber} address={branchDetails.address} city={branchDetails.city} state={branchDetails.state} postalCode={branchDetails.postalCode} description={branchDetails.description} locationLat={branchDetails.locationLat} locationLong={branchDetails.locationLong} />}
            {!showDetails && <div className="branch-owner-background">

                <h1>All Branch Owner Accounts { data.length}</h1>
            </div>}
  {/*           <div className="search-bar">
    <input type="text" placeholder="Search by name or city..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  </div> */}
            {data.length === 0 && <h3 style={{marginTop: "20px"}}>Loading...</h3>}
            {!showDetails && <div className="all-branch-owners">
                {
                   filteredData.length > 0 && filteredData.map(data => {
                        return <div className="branch-owner-item" key={data._id}>
                            <div className="branch-owner-item-image">
                                <img src="https://www.cpapracticeadvisor.com/wp-content/uploads/sites/2/2022/07/22907/delivery_truck_icon_1_.57c46bcf08bf9.png" alt="Deliver_Image" />
                            </div>
                            <div className="branch-owner-item-city">
                                <h1 title={data.city}>{data.city.length > 15 ? data.city.slice(0, 15) + "..." : data.city}</h1>
                            </div>
                            <div className="branch-owner-item-manager">
                                <div className="branch-owner-item-manager-profile" style={{background: `url(${process.env.REACT_APP_BACKEND}/branch-owner/profile/${data._id}) no-repeat`}}>
                                </div>
                                <p>{data.username}</p>
                            </div>
                            <div className="all-br-btn">
                                <button onClick={() => getBranchDetails(data._id)}>View Details</button>
                                <button onClick={() => {
                                    setShowAlertDelete(true);
                                    setGetIdToDelete(data._id);
                                }}>Delete</button>
                            </div>
                        </div>
                    })
                }
            </div>}
        </div>
    )
}
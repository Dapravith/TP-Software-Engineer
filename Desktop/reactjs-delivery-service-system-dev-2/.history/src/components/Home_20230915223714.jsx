import React, { useEffect, useState } from "react";
import "../styles/home/home.css";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
const success = "#3a913a";
const danger = "#da5050";
export default function Home() {
    const redirect = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [item, setItem] = useState({});
    const [searching, setSearching] = useState(false);
    const [packageBranches, setPackageBranches] = useState([]);

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
    useEffect(() => {
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
    }, []);

    return (
        <div className="home">
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
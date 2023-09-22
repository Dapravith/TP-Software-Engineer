import "chart.js/auto";
import React, {useEffect, useState} from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import BranchOwnerDashboard from "./components/BranchOwnerDashboard";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import "./index.css";
import axios from "axios";
function App() {
    const [load, setLoad] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/loading`).then(data => {
            if (data.data.message === "API loaded!") {
                setLoad(true);
            }
        })
    }, [])
    return (
        <Router>
            {load && <main>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                    <Route path="/branch-owner/dashboard" element={<BranchOwnerDashboard/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </main>}
        </Router>
    )
}

export default App;
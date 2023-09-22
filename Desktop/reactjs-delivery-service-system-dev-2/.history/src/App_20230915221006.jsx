import "chart.js/auto";
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import PageNotFound from "./components/PageNotFound";
import BranchOwnerDashboard from "./components/BranchOwnerDashboard";
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
             <main>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                    <Route path="/branch-owner/dashboard" element={<BranchOwnerDashboard/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </main>
        </Router>
    )
}
export default App;
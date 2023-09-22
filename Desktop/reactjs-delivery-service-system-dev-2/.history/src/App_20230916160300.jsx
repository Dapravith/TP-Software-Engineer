import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import PageNotFound from "./components/PageNotFound";
import BranchOwnerDashboard from "./components/BranchOwnerDashboard";
import "./index.css";
import axios from "axios";
import MoonIcon from "./components/icons/MoonIcon";
import SunIcon from "./components/icons/SunIcon";
import Switch from "./components/Switch";

const style = {
    textAlign: "center",
    padding: "10rem 0",  // adjusted padding
    backgroundColor: "#f5f5f5",
};

function App() {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/loading`).then(data => {
            if (data.data.message === "API loaded!") {
                setLoad(true);
            }
        });
    }, []);

    return (
        <div style={style}>
            <div>
                <SunIcon />
                <Switch />
                <MoonIcon />
            </div>

            <Router>
                <main>
                    <Routes>
                        {/* Uncomment the line below if you have the Home component */}
                        {/* <Route path="/" element={<Home />}/> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/branch-owner/dashboard" element={<BranchOwnerDashboard />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;

import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import PageNotFound from "./components/PageNotFound";
import BranchOwnerDashboard from "./components/BranchOwnerDashboard";
import GuestHomePage from "./components/GuestHomePage";
import "./index.css";
function App() {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/guesthomepage" element={<GuestHomePage />}/>
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
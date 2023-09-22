import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import PageNotFound from "./components/PageNotFound";
import BranchOwnerDashboard from "./components/BranchOwnerDashboard";
import "./index.css";
import axios from "axios";

const darkTheme = {
  body: "#1c1c1c",
  title: "#fff",
  subtitle: "#b6b6b6",
  icon: "#b6b6b6",
};
const lightTheme = {
  body: "#fff",
  title: "#1c1c1c",
  icon: "#1c1c1c",
  subtitle: "#333",
};

function App() {
    const [load, setLoad] = useState(false);
  };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/loading`).then(data => {
            if (data.data.message === "API loaded!") {
                setLoad(true);
            }
        });
    }, []);

    return (

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

import axios from "axios";
import 'chart.js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/admin-dashboard/admin-dashboard.css";
import "../styles/dashboardCharts/dashboard-charts.css";
import AdminList from "./AdminList";
import AdminProfile from "./AdminProfile";
import BranchOwnerList from "./BranchOwnerList";
import CreateAdminAccount from "./CreateAdminAccount";
import CreateBranchAccount from "./CreateBranchAccount";
import DashboardCharts from "./DashboardCharts";
import Switch from "./Switch";

const style = "#ff6c37";

export default function AdminDashboard() {
  const [profile, setProfile] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [getError, setGetError] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [changes, setChanges] = useState("");

  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
   };

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

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/admin/profile`, {
        token: localStorage.getItem("token"),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        if (data.data.message === "Invalid Request!") setGetError(true);
        setProfile(data.data._id);
        setUsername(data.data.username);
        setGender(data.data.gender);
        setAbout(data.data.about);
        setPhone(data.data.phoneNumber);
        setEmail(data.data.email);
        setProfileImage(data.data.profile);
      });
  }, [changes]);

  const [edit, setEdit] = useState(false);
  const [setting, setSetting] = useState(false);
  const redirect = useNavigate();

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    if (!TOKEN || TOKEN === "undefined" || getError === true) {
      redirect("/");
    }
  }, [getError]);

  const [showMenu, setShowMenu] = useState(false);

  const handleAdminLogout = () => {
    window.localStorage.removeItem("token");
    redirect("/");
  };

  const [buttons, setButtons] = useState([
    "Dashboard",
    "All Branch Owner Account",
    "Create Branch Account",
    "Create Admin Account",
    "All Admin Accounts",
  ]);

  const [tab, setTab] = useState(0);
  
  
  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-menu" style={{ transform: showMenu && "translateX(0%)", transition: !showMenu && "0.1s" }}>
        <div className="admin-dashboard-menu-close" onClick={() => setShowMenu(false)}>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="admin-dashboard-menu-top">
          <div className="admin-dashboard-menu-logo">
            <h1 style={{ fontWeight: "400" }}>CAMBO <span style={{ color: style, fontWeight: "bold" }}>EXPRESS</span></h1>
          </div>
          <div className="admin-dashboard-menu-list">
            {buttons.map((data, index) => (
              <li style={{ background: tab === index ? style : "", color: tab === index ? "#fff" : "" }} key={data} onClick={() => {
                setTab(index);
                setSetting(false);
                setShowMenu(false);
              }}>
                {data}
              </li>
            ))}
          </div>
        </div>
        <div className="admin-dashboard-menu-bottom">
          <div className="admin-logout">
            <button onClick={handleAdminLogout}>Log Out</button>
          </div>
        </div>
      </div>
      {showMenu && <div className="dark-panel" style={{ zIndex: 800 }} onClick={() => setShowMenu(false)}></div>}
      <div className="admin-dashboard-header">
        
        <div className="admin-dashboard-header-hamburger" onClick={() => setShowMenu(true)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        
        <div className="admin-dashboard-header-profile">
          <div className="switch-wrapper">
            <Switch toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
          </div>
          <div className="admin-infos" onClick={() => setEdit(!edit)}>
            <div className="admin-profile" style={{
              width: "40px",
              height: "40px",
              minWidth: "40px",
              minHeight: "40px",
              background: `url(${process.env.REACT_APP_BACKEND}/admin/profile/${profile}) no-repeat`,
              borderRadius: "50%",
            }}></div>
            <div className="admin-name">
              <p>{username}</p>
            </div>
            <svg style={{ transform: edit ? "rotate(180deg)" : "" }} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 292.362 292.362">
              <path d="M286.935 69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952 0-9.233 1.807-12.85 5.424C1.807 72.998 0 77.279 0 82.228c0 4.948 1.807 9.229 5.424 12.847l127.907 127.907c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428L286.935 95.074c3.613-3.617 5.427-7.898 5.427-12.847 0-4.948-1.814-9.229-5.427-12.85z"></path>
            </svg>
          </div>
          {edit && <div className="settings">
            <button onClick={() => {
              setSetting(true);
              setEdit(false);
              setTab(-1);
            }}>View Profile</button>
          </div>}
        </div>
      </div>
      {setting && <div className="admin-dashboard-container">
        <AdminProfile username={username} profile={profile} gender={gender} about={about} phone={phone} email={email} profileImage={profileImage} changes={changes} setChanges={setChanges} />
      </div>}
      {!setting && <div className="admin-dashboard-container">
        {tab === 0 && (
          <div className="chart-container">
            <DashboardCharts username={username} />
          </div>
        )}
        {tab === 1 && <BranchOwnerList />}
        {tab === 2 && <CreateBranchAccount tab={tab} setTab={setTab} />}
        {tab === 3 && <CreateAdminAccount tab={tab} setTab={setTab} />}
        {tab === 4 && <AdminList />}
      </div>}
    </div>
  );
}

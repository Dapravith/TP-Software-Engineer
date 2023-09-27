import React, { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const {useState} = React;
const style = "#ff6c37";
function Login() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [getToken, setGetToken] = useState("" || localStorage.getItem("token"));
    const [errorLogin, setErrorLogin] = useState(false);
    const redirect = useNavigate();
    const handleAdminLogin = (e) => {
        e.preventDefault();
       
        axios.post(`${process.env.REACT_APP_BACKEND}/admin/login`, {
            email: adminEmail,
            password: adminPassword,
        }).then(data => {
           
            console.log(data);
            if (data.data.message === "Email Does Not Exist!" || data.data.message === "Password Does Not Match!") {
                setErrorLogin(true);
                setAdminPassword("");
            }
            const token = data.data.token;
            localStorage.setItem("token", token);
            setGetToken(token);
            if (data.data.message === "Admin Login Successfully!") {
                redirect("/admin/dashboard");
            }
        }).catch(err => {
            return err;
        })
    }

    const [branchOwnerEmail, setBranchOwnerEmail] = useState("");
    const [branchOwnerPassword, setBranchOwnerPassword] = useState("");
    const handleBranchOwnerLogin = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND}/branch-owner/login`, {
            email: branchOwnerEmail,
            password: branchOwnerPassword,
        }).then(data => {
            if (data.data.message === "Email Does Not Exist!" || data.data.message === "Password Does Not Match!") {
                setErrorLogin(true);
                setBranchOwnerPassword("");
            }
            const token = data.data.token;
            localStorage.setItem("token", token);
            if (data.data.message === "Branch Owner Login Successfully!") {
                redirect("/branch-owner/dashboard");
            }
        }).catch(err => {
            console.log(err);
        })
    }
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
        <div className="login" id={loginStatus ? "login-branch-owner" : "login-admin"}>
            <div className="login-container">
                <div className="login-container-switch">
                    <button onClick={() => setLoginStatus(false)} style={{background: !loginStatus ? style : "", color: !loginStatus ? "white" : "black"}}>Log In As Admin</button>
                    <button onClick={() => setLoginStatus(true)} style={{background: loginStatus ? style : "", color: loginStatus ? "white" : "black"}}>Log In As Branch Owner</button>
                </div>
                <div className="login-container-admin">
                    <h1>{loginStatus ? "Log In As Branch Owner" : "Log In As Admin"}</h1>
                    {errorLogin && <p style={{color: "red", marginTop: "10px"}}>Incorrect Email Or Password!</p>}
                    {!loginStatus && <form onSubmit={handleAdminLogin}>
                        <input value={adminEmail} onChange={e => setAdminEmail(e.target.value)} type="email" placeholder="Email..." required />
                        <input value={adminPassword} onChange={e => setAdminPassword(e.target.value)}  type="password" placeholder="Password..." required />
                        <button type="submit">Log In As Admin Now</button>
                    </form>}
                    {loginStatus && <form onSubmit={handleBranchOwnerLogin}>
                        <input value={branchOwnerEmail} onChange={e => setBranchOwnerEmail(e.target.value)} type="email" placeholder="Email..." required />
                        <input value={branchOwnerPassword} onChange={e => setBranchOwnerPassword(e.target.value)} type="password" placeholder="Password..." required />
                        <button type="submit">Log In As Branch Owner Now</button>
                    </form>}
                </div>
            </div>
        </div>
    )
}
export default Login;
import React from "react";
import "../styles/admin-list/admin-list.css";
import axios from "axios";
import RightTopAlert from "./RightTopAlert";
const {useState, useEffect} = React;
export default function AdminList() {
    const [accounts, setAccounts] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const handleDeleteAdminAccount = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND}/admin/accounts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            if (data.data.message === "Admin Account Deleted Successfully!") {
                setDeleted(true);
            }
        }).catch(err => err);
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/admin/accounts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setAccounts(data.data);
        }).catch(err => err);
    }, [deleted])
    useEffect(() => {
        setTimeout(() => {
            setDeleted(false);
        }, 3000)
    }, [deleted]);

    const [adminEmail, setAdminEmail] = useState("");

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND}/admin/profile`, {token: localStorage.getItem("token")}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setAdminEmail(data.data.email);
        }).catch(err => err);
    }, [accounts])
    return (
        <div className="admin-list">
            {deleted && <RightTopAlert content={"An Admin Account Deleted Successfully!"} type={"SUCCESS"} />}
            <h1>All Admin Accounts</h1>
            {accounts.length === 0 && <i>Loading...</i>}
            {accounts.length > 0 && <div className="admin-list-container">
                {
                    accounts.map(data => {
                        return (
                            <li key={data._id} style={{background: adminEmail === data.email && "#3a913a", color: adminEmail === data.email ? "#ffffff" : "#000000"}}><div><div className="admin-pro" style={{background: `url(${process.env.REACT_APP_BACKEND}/admin/profile/${data._id}) no-repeat`}}></div>{data.email}{adminEmail === data.email && <div className="is-me">You</div>}</div>{adminEmail !== data.email && <button disabled={adminEmail === data.email} title="Double Click To Delete An Admin Account" onDoubleClick={() => handleDeleteAdminAccount(data._id)}><i className="fa fa-trash"></i></button>}</li>
                        )
                    })
                }
            </div>}
        </div>
    )
}
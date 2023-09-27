import React from "react";
import "../styles/right-top-alert/right-top-alert.css";
export default function RightTopAlert({content, type}) {
    return (
        <div className={type === "SUCCESS" ? "right-top-alert-success" : "right-top-alert-failed"}>
            <p>{content}</p>
        </div>
    )
}
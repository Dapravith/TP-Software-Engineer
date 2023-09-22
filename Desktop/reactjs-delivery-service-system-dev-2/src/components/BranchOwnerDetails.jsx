import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
function BranchOwnerDetails({id, username, email, profile, phoneNumber, address, city, state, postalCode, description, locationLat, locationLong, google}) {
    const location = {
        address: address,
        lat: Number(locationLat),
        lng: Number(locationLong),
    }
    function displayMarkers() {
        return (
            <Marker
                position={{
                    lat: location.lat,
                    lng: location.lng
                }}
            />
        );
      }
    return (
        <div className="branch-owner-details">
            <div className="google-map">
                <Map
                    google={google}
                    zoom={10}
                    style={{width: "500px", height: "500px"}}
                    initialCenter={{ lat: location.lat, lng: location.lng }}
                >
                    {displayMarkers()}
                </Map>
            </div>
            <div className="branch-owner-information">
                <div className="branch-owner-information-profile" style={{background: `url(${process.env.REACT_APP_BACKEND}/branch-owner/profile/${id}) no-repeat`}}>
                </div>
                <div></div>
                <div>
                    <h1>Name</h1>
                    <p>{username}</p>
                </div>
                <div>
                    <h1>Email</h1>
                    <p>{email}</p>
                </div>
                <div>
                    <h1>Phone Number</h1>
                    <p>{phoneNumber}</p>
                </div>
                <div>
                    <h1>City</h1>
                    <p>{city}</p>
                </div>
                <div>
                    <h1>State</h1>
                    <p>{state}</p>
                </div>
                <div>
                    <h1>Postal Code</h1>
                    <p>{postalCode}</p>
                </div>
                <div>
                    <h1>Description</h1>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: ""
  })(BranchOwnerDetails);
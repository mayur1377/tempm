import React, { useState, useEffect } from "react";

function LocationDisplay() {
  const [location, setLocation] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h3>Your current location:</h3>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
}

export default LocationDisplay;

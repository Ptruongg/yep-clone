import React from "react";
import {
    GoogleMap,
    LoadScript,
    useJsApiLoader,
    Marker,
    Circle,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";

const MapContainer = () => {
    // const APIKey = useSelector(state => state.map.APIKey)
    // console.log(APIKey, "API")

    const mapStyles = {
      height: "50vh",
      width: "100%",
    };

    // const defaultCenter = {
    //   lat: +lat,
    //   lng: +lng,
    // };

    return (
      <LoadScript googleMapsApiKey="AIzaSyCKDNtKPyDvxL789j3to2zmARx4gNuvsjE">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={{lat: 37, lng: -122}}
          // center={defaultCenter}
        />
      </LoadScript>
    );
  };

  export default MapContainer;

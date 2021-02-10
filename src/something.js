import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function App() {
  const [res, setRes] = useState("");
  const [long, setLong] = useState("");
  const [lat, setlat] = useState("");
  const getPosts = async () => {
    let data = {
      query: `
      query{
        getPosts {
          id
          channel
          status
          lat
          long
          poster
          dte
        }      
      }`,
    };
    axios
      .post("http://localhost:4000/graphql", data, {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsSWQiOiI2MDBmMzA2YjVmM2EzYjYxZWFiMzlkMWMiLCJpYXQiOjE2MTE2MDkwOTUsImV4cCI6MTYxMTY5NTQ5NX0.FhB3qQ2pTx7FJ-IeiaRhX-j6eKY4mdukxZCUdh1r-qI",
        },
      })
      .then((r) => {
        setRes(r.data.data.getPosts);
        setLong(r.data.data.getPosts[1].long);
        setlat(r.data.data.getPosts[1].lat);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    console.log(res);
  }, [res]);
  return (
    <>
      {long !== "" && lat !== "" && (
        <MapContainer
          center={[lat, long]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "50vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, long]}></Marker>
        </MapContainer>
      )}
    </>
  );
}

export default App;

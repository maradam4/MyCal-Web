import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "./graphql/queries";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const RenderMap = ({ long, lat }) => {
  return (
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
  );
};

const renderData = (item, setSM, setLong, setLat, showMap) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 70,
        }}
      >
        <div
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
              16
            )}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 20 }}>{item.poster}</p>
        </div>
        <div style={{ width: 50 }}>
          <p>{item.status}</p>
        </div>
        <div>
          <p>{new Date(parseInt(item.dte)).toString().substr(0, 34)}</p>
        </div>
        <button
          disabled={item.status !== "notOk"}
          onClick={() => {
            setLat(item.lat);
            setLong(item.long);
            setSM(!showMap);
          }}
        >
          View More
        </button>
      </div>
    </>
  );
};

const Channel = ({ setLoggedIn }) => {
  const { loading, error, data } = useQuery(GET_POSTS, {});
  const [showMap, setSM] = useState(false);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    if (error?.message === "INVALID TOKEN") localStorage.removeItem("@token");
  }, [error]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h1>Welcome</h1>
        <button
          onClick={() => {
            localStorage.removeItem("@token");
            setLoggedIn(false);
          }}
        >
          Logout
        </button>
      </div>
      {data &&
        data.getPosts.map((item) =>
          renderData(item, setSM, setLong, setLat, showMap)
        )}
      {showMap && <RenderMap long={long} lat={lat} />}
    </>
  );
};

export default Channel;

import { useEffect, useState } from "react";
import "./Location.css";
import Weather from "./Weather";

export default function Location({
  name,
  state,
  country,
  latitude,
  longitude,
}) {
  return (
    <div>
      <button className="searchOptions">
        <h3>{name}</h3>
        <h4>
          {state}, {country}
        </h4>
      </button>

      <Weather latitude={latitude} longitude={longitude} />
    </div>
  );
}

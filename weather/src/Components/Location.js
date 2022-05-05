import React from "react";
import "./Location.css";

export default function Location({ name, state, country }) {
  return (
    <div>
      <button className="searchOptions">
        <h3>{name}</h3>
        <h4>
          {state}, {country}
        </h4>
      </button>
    </div>
  );
}

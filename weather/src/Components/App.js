import { useState, useEffect } from "react";
import Location from "./Location";
import Weather from "./Weather";

function App() {
  const [input, setInput] = useState(false);
  const [search, setSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState(false);
  const [latitude, setLatitude] = useState(false);
  const [longitude, setLongitude] = useState(false);

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    setSearch(input);
  }

  // Get Latitude and Longitude based on search
  useEffect(() => {
    async function getWeather() {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=5ab7c4f0a481e074b3efa77550ec2eea`
      );
      const data = await response.json();
      console.log(data);
      setLocations(data);
    }
    getWeather();
  }, [search]);

  // Get weather based on latitude and longitutde
  useEffect(() => {
    async function getWeather() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=5ab7c4f0a481e074b3efa77550ec2eea`
      );
      const data = await response.json();
      console.log(data);
    }
    getWeather();
  }, [latitude, longitude]);

  return (
    <div className="App">
      <input
        placeholder="Search for weather"
        type="text"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Search</button>

      {search ? (
        locations.map((item, index) => {
          return (
            <Location
              name={item.name}
              state={item.state}
              country={item.country}
              latitude={item.lat}
              longitude={item.lon}
              key={index}
            />
          );
        })
      ) : (
        <p>Could not find what you're looking for</p>
      )}
    </div>
  );
}

export default App;

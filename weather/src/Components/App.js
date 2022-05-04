import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");
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
      setLatitude(data[0].lat);
      setLongitude(data[0].lon);
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
    </div>
  );
}

export default App;

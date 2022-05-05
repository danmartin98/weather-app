import { useState, useEffect } from "react";

export default function Weather({ latitude, longitude }) {
  // State
  const [weather, setWeather] = useState([]);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get weather based on latitude and longitutde
  useEffect(() => {
    async function getWeather() {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=5ab7c4f0a481e074b3efa77550ec2eea`
      );
      const data = await response.json();

      setWeather([data]);
    }
    getWeather();
  }, [latitude, longitude]);

  console.log(weather);

  // Functions
  //   function toCelcius() {
  //     const kelvin = weatherData.main.temp;
  //     const celcius = kelvin - 273.15;
  //     const cel = parseFloat(celcius).toFixed(2);
  //     return cel;
  //   }

  return (
    <div>
      {weather.map((item, index) => {
        return (
          <div className="temperature">
            <p>{Math.round(item.current.temp - 273.15)}° </p>{" "}
            <img
              src={`http://openweathermap.org/img/wn/${item.current.weather[0].icon}@2x.png`}
            ></img>
            <div className="hidden">
              {item.daily.map((item, index) => {
                return (
                  <>
                    <p>{days[new Date(item.dt * 1000).getDay()]}</p>
                    <p>
                      Min {Math.round(item.temp.min - 273.15)}° Max{" "}
                      {Math.round(item.temp.max - 273.15)}°
                    </p>
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    ></img>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

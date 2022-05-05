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
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=75f135af2f925df1d6f03ec5eda12c75`
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
          <div>
            <div>
              <p className="temperature">
                {Math.round(item.current.temp - 273.15)}°{" "}
              </p>{" "}
              <img
                className="temperature"
                src={`http://openweathermap.org/img/wn/${item.current.weather[0].icon}@2x.png`}
              ></img>
            </div>
            {item.daily.map((item, index) => {
              return (
                <div className="hidden">
                  <p className="days">
                    {days[new Date(item.dt * 1000).getDay()]}
                  </p>
                  <p className="temperature">
                    Min {Math.round(item.temp.min - 273.15)}° Max{" "}
                    {Math.round(item.temp.max - 273.15)}°
                  </p>
                  <div className="image">
                    <img
                      className="weater"
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    ></img>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

import { useState, useEffect } from "react";

export default function Weather({ latitude, longitude }) {
  // State
  const [weather, setWeather] = useState([]);

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
        <div>
        <p>{Math.round(item.current.temp - 273.15)}</p>
        <div className="hidden">{item.daily.map((item, index) => {
          return <p>{item.dt}</p>
        })}</div>
        </div>
        )
      })}
    </div>
  );
}

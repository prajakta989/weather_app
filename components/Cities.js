import React, { useState } from "react";
import axios from "axios";

const Cities = () => {
  const [search, setSearch] = useState("");
  const [errors, setError] = useState(false);
  
  const [weather, setWeather] = useState({});
  console.log(search);
  const searchData = (evt) => {
    // console.log(evt);
    if (evt.key === "Enter") {
      console.log("enter pressed");
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: `${search}` },
        headers: {
          "X-RapidAPI-Key":
            "000d8dcac3msh0d7616e1e01d200p145157jsn5bee344c57a0",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response);
          const { data } = response;
          // console.log("data:",data);

          // const region = data.location.region;
          // const temprature = data.current.temp_c;
          // const condition = data.current.condition.text;
          // const image = data.current.condition.icon;
          setWeather(data);
          setSearch("");
          setError(false);

          
        })
        .catch(function (error) {
          console.error(error);
          setError(true);
          setWeather("")
        });
    }
  };

  console.log("weather", weather);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div>
      <div className="app">
        <div className="main">
          <div className="search-box">
            <input
              type="text"
              className="searchbar"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              onKeyDown={(e) => searchData(e)}
            />
            {errors && (
            <div className="error">
              <span><p>Could not fetch the results</p></span>
            </div>
          )}
          </div>
          
          {typeof weather.location != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.location.name}, {weather.location.region}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.current.temp_c)}&#x2103;
                </div>
                <div>
                  <img src={weather.current.condition.icon} />
                </div>
                <div className="weather">{weather.current.condition.text}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Cities;